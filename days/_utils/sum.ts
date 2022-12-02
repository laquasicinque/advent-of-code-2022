export const sum = (numbers: Iterable<number | string>): number => {
  let total = 0
  for (const val of numbers) {
    total += Number(val) || 0
  }
  return total
}
