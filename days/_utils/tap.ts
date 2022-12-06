function* _tap<T>(
  iter: Iterable<T>,
  fn: (item: T, index: number, iter: Iterable<T>) => unknown
) {
  let i = 0;
  for (const item of iter) {
     fn(item, i++, iter);
     yield item
  }
}

export const tap =
  <T>(fn: (item: T, index: number, iter: Iterable<T>) => unknown) =>
  (iter: Iterable<T>) =>
    _tap(iter, fn);

tap._ = _tap
