const __EMPTY__ = Symbol("Empty");
export function* repeatLast<T>(iter: Iterable<T>) {
  let last: T | typeof __EMPTY__ = __EMPTY__;
  for (last of iter) {
    yield last;
  }
  if (last !== __EMPTY__) while (true) yield last;
}
