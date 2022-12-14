function * _take<T>(iter:Iterable<T>, num: number) {
  let i = 0;
  for (const item of iter) {
    if (i++ > num) break
    yield item
  }
}

export const take = (num: number) => <T>(iter:Iterable<T>) => _take(iter,num)
