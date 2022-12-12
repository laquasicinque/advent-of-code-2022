export function* range(start: number, stop?: number, step?: number) {
  const begin = stop ? start : 0;
  const end = stop ? stop : start;
  const itStep = (step ?? Math.sign(end - begin)) || 1 ;

  for (let i = begin; i <= end; i += itStep) {
    yield i;
  }
}
