import { isIterable } from "./isIterable.ts";

function* _flat<T, U = T>(
  iter: Iterable<T> | Iterable<Iterable<T>>,
  depth: number
): Iterable<U> {
  for (const item of iter) {
    if (isIterable(item) && depth > 0) {
      yield* _flat(item, depth - 1);
    } else {
      yield item as U;
    }
  }
}

export const flat =
  (depth: number) =>
  <T, U = T>(iter: Iterable<T>) =>
    _flat(iter, depth) as U;

flat._ = _flat;
