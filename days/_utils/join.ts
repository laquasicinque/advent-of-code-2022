const _join = <T>([...iter]: Iterable<T>, delimiter: string = '') => iter.join(delimiter);
export const join = (delimiter: string = '') => <T>(iter: Iterable<T>) => _join(iter, delimiter);
