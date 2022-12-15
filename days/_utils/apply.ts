// We genuinely don't care about the middle input type here
export type InOut<In, Out> = (inp: In) => Out;
export type InOutWindow<
  T extends ReadonlyArray<unknown>,
  Stack extends ReadonlyArray<unknown> = []
> = T extends [infer A, infer B, ...infer Rest]
  ? InOutWindow<[B, ...Rest], [...Stack, InOut<A, B>]>
  : Stack;

export function apply<T0, T1>(input: T0, ...fns: InOutWindow<[T0, T1]>): T1;
export function apply<T0, T1, T2>(
  input: T0,
  ...fns: InOutWindow<[T0, T1, T2]>
): T2;
export function apply<T0, T1, T2, T3>(
  input: T0,
  ...fns: InOutWindow<[T0, T1, T2, T3]>
): T3;
export function apply<T0, T1, T2, T3, T4>(
  input: T0,
  ...fns: InOutWindow<[T0, T1, T2, T3, T4]>
): T4;
export function apply<T0, T1, T2, T3, T4, T5>(
  input: T0,
  ...fns: InOutWindow<[T0, T1, T2, T3, T4, T5]>
): T5;
export function apply<T0, T1, T2, T3, T4, T5, T6>(
  input: T0,
  ...fns: InOutWindow<[T0, T1, T2, T3, T4, T5, T6]>
): T6;
export function apply<T0, T1, T2, T3, T4, T5, T6, T7>(
  input: T0,
  ...fns: InOutWindow<[T0, T1, T2, T3, T4, T5, T6, T7]>
): T7;
export function apply<T0, T1, T2, T3, T4, T5, T6, T7, T8>(
  input: T0,
  ...fns: InOutWindow<[T0, T1, T2, T3, T4, T5, T6, T7, T8]>
): T8;
export function apply<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9>(
  input: T0,
  ...fns: InOutWindow<[T0, T1, T2?, T3?, T4?, T5?, T6?, T7?, T8?, T9?]>
): T9
export function apply<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9,T10>(
  input: T0,
  ...fns: InOutWindow<[T0, T1, T2?, T3?, T4?, T5?, T6?, T7?, T8?, T9?, T10?]>
): T10 {
  // deno-lint-ignore no-explicit-any
  return fns.reduce((acc, fn) => fn(acc as any) as any, input) as unknown as T10;
}
