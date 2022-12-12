function _some<T>(
  iter: Iterable<T>,
  fn: (item: T, index: number, iter: Iterable<T>) => unknown
) {
  let i = 0;
  for (const item of iter) {
    if (fn(item, i++, iter)) {
      return true;
    }
  }
  return false;
}

export const some =
  <T>(fn :  (item: T, index: number, iter: Iterable<T>) => unknown) =>
  (iter: Iterable<T>) =>
    _some(iter, fn);

some._ = _some
