export function max(iter:Iterable<number>) {
  let i = -Infinity
  for (const item of iter) {
    if(item > i) i = item
  }
  return i
}
