export function isIterable(
  // unknown doesn't work here, any is fine as this is a type guard
  // deno-lint-ignore no-explicit-any
  item: any,
  includeStrings = false): item is Iterable<unknown> {
  return (
    Symbol.iterator in item &&
    typeof item[Symbol.iterator] === "function" &&
    !(includeStrings && typeof item === "string")
  );
}
