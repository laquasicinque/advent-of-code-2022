function * _chunk <T>(iter: Iterable<T>, size: number) {
  let currChunk = []
  for (const item of iter) {
    currChunk.push(item)
    if (currChunk.length >= size) {
      yield currChunk
      currChunk = []
    }
  }
  if(currChunk.length)
    yield currChunk
}

export function chunk (size:number) {
  return <T>(iter:Iterable<T>) => _chunk(iter,size)
}

chunk._ = _chunk
