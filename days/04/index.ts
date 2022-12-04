import { apply } from "../_utils/apply.ts";
import { getInput } from "../_utils/getInput.ts";
import { lines } from "../_utils/lines.ts";
import { map } from "../_utils/map.ts";
import { pipe } from "../_utils/pipe.ts";
import { sum } from "../_utils/sum.ts";

type Range = [number, number];
type RangePair = [Range, Range];

const getRanges = (str: string) =>
  str.split(",").map((x) => x.split("-").map((x) => Number(x))) as RangePair;

const input = [...apply(getInput(), [lines, map(getRanges)])];

const rangeContainsRange = (r1: Range, r2: Range) =>
  r1[0] <= r2[0] && r1[1] >= r2[1];

const pointInRange = (point: number, range: Range) =>
  point >= range[0] && point <= range[1];

const rangesOverlap = (r1: Range, r2: Range) =>
  r1.some((p) => pointInRange(p, r2)) || r2.some((p) => pointInRange(p, r1));

const p1 = pipe([
  map(
    ([r1, r2]: RangePair) =>
      rangeContainsRange(r1, r2) || rangeContainsRange(r2, r1)
  ),
  // Technically shouldn't be allowed to sum here as they're all booleans but coercion
  // works in my favour here, otherwise the line above just needs to be a ternary operator
  sum,
]);

const p2 = pipe([
  map(([r1, r2]: [Range, Range]) => rangesOverlap(r1, r2)),
  sum,
]);

console.log("Pairs where one contains the other: ", p1(input));
console.log("Pairs where jobs overlap:", p2(input));
