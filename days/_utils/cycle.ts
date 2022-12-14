export function * cycle<T>(iter:Iterable<T>): Iterable<T> {
  const cache = []
  for(const item of iter) {
    cache.push(item)
    yield item
  }

  while(true) yield* cache
}
