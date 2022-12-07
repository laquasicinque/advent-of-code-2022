function* _groups<T>(
  iter: Iterable<T>,
  fn: (item: T, num: number, iter: Iterable<T>) => unknown
) {
  let currGroup: T[] = [];
  let i = 0;
  for (const item of iter) {
    if (fn(item, i++, iter)) {
      if (currGroup.length) {
        yield currGroup;
        currGroup = [];
      }
    }
    currGroup.push(item);
  }
  if (currGroup.length) yield currGroup;
}

export function groups<T>(
  fn: (item: T, num: number, iter: Iterable<T>) => unknown
) {
  return (iter: Iterable<T>) => _groups(iter, fn);
}

groups._ = _groups;
