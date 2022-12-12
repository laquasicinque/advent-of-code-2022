function *_skip<T>(
  iter: Iterable<T>,
  num: number
) {
  let i = 0;
  for (const item of iter) {
    if(i++ >= num) yield item
  }
}

export const skip =
  <T>(num: number) =>
  (iter: Iterable<T>) =>
    _skip(iter, num);

skip._ = _skip
