import { apply } from "./apply.ts";
import { flat } from "./flat.ts";
import { map } from "./map.ts";

export const _flatMap = <T, U>(
  iter: Iterable<T>,
  fn: (item: T, index: number, iter: Iterable<T>) => U | Iterable<U>
): Iterable<U> => {
  return apply(iter, map(fn), flat(1)) as Iterable<U>;
};

export const flatMap =
  <T, U>(fn: (item: T, index: number, iter: Iterable<T>) => U | Iterable<U>) =>
  (iter: Iterable<T>) =>
    _flatMap(iter, fn);

flatMap._ = _flatMap
