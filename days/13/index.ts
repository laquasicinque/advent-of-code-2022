import { getInput } from "../_utils/input.ts";
import { map } from "../_utils/map.ts";
import { filter } from "../_utils/filter.ts";
import { pipe } from "../_utils/pipe.ts";
import { zip } from "../_utils/zip.ts";
import { sum } from "../_utils/sum.ts";

const input = getInput();
type MaybeNested<T> = (T | MaybeNested<T>)[];
type NestedNumberTuple = [MaybeNested<number>, MaybeNested<number>];
const items = input
  .split("\n\n")
  .map((x) => x.split("\n").map((x) => JSON.parse(x))) as NestedNumberTuple[];
function castArray<T>(items: T | T[]): T[] {
  if (Array.isArray(items)) {
    return items;
  }
  return items === undefined ? [] : [items];
}

const p1 = pipe(
  map(([a, b]: NestedNumberTuple, i) =>
    getOrder(a, b) === 1 ? i + 1 : undefined
  ),
  filter(Boolean),
  sum
);

const p2 = (items: MaybeNested<number>[][]) => {
  const pk1 = [[2]];
  const pk2 = [[6]];
  const vals = [...items.flat(1), pk1, pk2].sort((a, b) => getOrder(b, a));
  return (1 + vals.indexOf(pk1)) * (1 + vals.indexOf(pk2));
};

const getOrder = (
  list1: MaybeNested<number>,
  list2: MaybeNested<number>
): number => {
  for (const [a, b] of zip([list1, list2], true)) {
    if (typeof a === "number" && typeof b === "number") {
      if (a > b) return -1;
      else if (b > a) return 1;
    } else if (a == null) {
      return 1;
    } else if (b == null) {
      return -1;
    } else {
      const nestedOrder = getOrder(castArray(a), castArray(b));
      if (nestedOrder) return nestedOrder;
    }
  }
  return 0;
};

console.log(p1(items));
console.log(p2(items));
