export function* range(start: number, stop?: number, step?: number) {
  const begin = stop ? start : 0;
  const end = stop ? stop : start;
  const itStep = (step ?? Math.sign(end - begin)) || 1 ;
  const cond = itStep > 0 ? (i:number) => i <= end : (i:number) => i >= end
  for (let i = begin; cond(i); i += itStep) {
    yield i;
  }
}
