import { isIterable } from "./isIterable.ts";

function* _flat<T>(
  iter: Iterable<T> | Iterable<Iterable<T>>,
  depth: number
): Iterable<T> {
  for (const item of iter) {
    if (isIterable(item) && depth > 0) {
      yield* _flat(item, depth - 1);
    } else {
      yield item as T;
    }
  }
}

export const flat =
  (depth: number) =>
  <T>(iter: Iterable<T>) =>
    _flat(iter, depth);

flat._ = _flat;
