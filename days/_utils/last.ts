export function last<T>(iter:Iterable<T>):T | undefined {
  let last
  for (const item of iter) last = item

  return last
}
