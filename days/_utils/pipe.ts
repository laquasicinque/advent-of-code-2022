import { apply, FunctionChain } from "./apply.ts";

export function pipe<Input, Output>(fns: FunctionChain<Input, Output>) {
  return (input: Input): Output => apply(input, fns);
}
