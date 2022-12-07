function* _filter<T, U extends T  = T>(
  iter: Iterable<T>,
  fn: (item: T, index: number, iter: Iterable<T>) => unknown
): Iterable<U> {
  let i = 0;
  for (const item of iter) {
    if(fn(item, i++, iter)) yield item as U;
  }
}

export const filter =
  <T, U extends T = T>(fn: (item: T, index: number, iter: Iterable<T>) => unknown) =>
  (iter: Iterable<T>):Iterable<U> =>
    _filter(iter, fn);

filter._ = _filter
