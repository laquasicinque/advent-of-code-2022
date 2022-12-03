function* _map<T, U>(
  iter: Iterable<T>,
  fn: (item: T, index: number, iter: Iterable<T>) => U
) {
  let i = 0;
  for (const item of iter) {
    yield fn(item, i++, iter);
  }
}

export const map =
  <T, U>(fn: (item: T, index: number, iter: Iterable<T>) => U) =>
  (iter: Iterable<T>) =>
    _map(iter, fn);

map._ = _map
