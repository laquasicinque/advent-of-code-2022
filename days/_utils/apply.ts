// We genuinely don't care about the middle input type here
export type FunctionChain<Input, Output> = [
  // deno-lint-ignore no-explicit-any
  (input: Input) => any,
  // deno-lint-ignore no-explicit-any
  ...((val: any) => any)[],
  // deno-lint-ignore no-explicit-any
  (val: any) => Output
];

export function apply<Input, Output>(
  input: Input,
  fns: FunctionChain<Input, Output>
): Output {
  return fns.reduce((acc, fn) => fn(acc), input) as unknown as Output;
}
