export function * zip<T,U>(iters:[Iterable<T>, Iterable<U>], exhaust = false): Iterable<[T,U]> {
  const its = iters.map(x=>x[Symbol.iterator]())
  const method = exhaust ? 'some' : 'every'
  let vals = its.map(x=>x.next())
  while(vals[method](x=>!x.done)) {
    yield vals.map(x=>x.value) as [T,U]
    vals = its.map(x=>x.next())
  }
}
