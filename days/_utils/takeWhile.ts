function* _takeWhile<T>(
  iter: Iterable<T>,
  fn: (item: T, index: number, iter: Iterable<T>) => unknown
): Iterable<T> {
  let i = 0;
  for (const item of iter) {
    if (!fn(item, i++, iter)) {
      return;
    }
    yield item;
  }
}

export const takeWhile =
  <T>(fn: (item: T, index: number, iter: Iterable<T>) => unknown) =>
  (iter: Iterable<T>) =>
    _takeWhile(iter, fn);
