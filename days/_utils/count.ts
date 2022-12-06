export function count (iter:Iterable<unknown>) {
  let i = 0;
  for (const _ of iter) i++
  return i
}
