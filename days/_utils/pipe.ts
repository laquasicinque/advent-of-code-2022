import { apply, InOut, InOutWindow } from "./apply.ts";

export function pipe<T0, T1>(...fns: InOutWindow<[T0, T1]>): InOut<T0, T1>;
export function pipe<T0, T1, T2>(
  ...fns: InOutWindow<[T0, T1, T2]>
): InOut<T0, T2>;
export function pipe<T0, T1, T2, T3>(
  ...fns: InOutWindow<[T0, T1, T2, T3]>
): InOut<T0, T3>;
export function pipe<T0, T1, T2, T3, T4>(
  ...fns: InOutWindow<[T0, T1, T2, T3, T4]>
): InOut<T0, T4>;
export function pipe<T0, T1, T2, T3, T4, T5>(
  ...fns: InOutWindow<[T0, T1, T2, T3, T4, T5]>
): InOut<T0, T5>;
export function pipe<T0, T1, T2, T3, T4, T5, T6>(
  ...fns: InOutWindow<[T0, T1, T2, T3, T4, T5, T6]>
): InOut<T0, T6>;
export function pipe<T0, T1, T2, T3, T4, T5, T6, T7>(
  ...fns: InOutWindow<[T0, T1, T2, T3, T4, T5, T6, T7]>
): InOut<T0, T7>;
export function pipe<T0, T1, T2, T3, T4, T5, T6, T7, T8>(
  ...fns: InOutWindow<[T0, T1, T2, T3, T4, T5, T6, T7, T8]>
): InOut<T0, T8>;
export function pipe<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9>(
  ...fns: InOutWindow<[T0, T1, T2?, T3?, T4?, T5?, T6?, T7?, T8?, T9?]>
): InOut<T0, T9> {
  // deno-lint-ignore no-explicit-any
  return (input: T0) => apply(input, ...fns) as any;
}
