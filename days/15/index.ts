import { apply } from "../_utils/apply.ts";
import { collect } from "../_utils/collect.ts";
import { getInputLines } from "../_utils/input.ts";
import { map } from "../_utils/map.ts";
import { filter } from "../_utils/filter.ts";
import { flatMap } from "../_utils/flatMap.ts";
import Tuple, { TupleOf } from "../_utils/Tuple.ts";
import { sum } from "../_utils/sum.ts";
import { range } from "../_utils/range.ts";
import { flat } from "../_utils/flat.ts";

type MatchedOutput = { sx: number; sy: number; bx: number; by: number };
type NumTuple = [number, number];
const reggie =
  /Sensor at x=(?<sx>-?\d+), y=(?<sy>-?\d+): closest beacon is at x=(?<bx>-?\d+), y=(?<by>-?\d+)/;
const input = apply(
  getInputLines(),
  map((x) => x.match(reggie)?.groups!),
  map(
    (x) =>
      Object.fromEntries(
        Object.entries(x).map(([k, v]) => [k, Number(v)])
      ) as MatchedOutput
  ),
  collect
);
const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));
const tuningFrequency = ([x, y]: NumTuple) => x * 4000000 + y;

const isBetween = (a: number, b: number, c: number, inclusive = true) => {
  return inclusive ? a >= b && a <= c : a > b && a < c;
};
const sensors = new Map(
  input.map((x) => [
    Tuple(x.sx, x.sy),
    {
      freq: tuningFrequency([x.bx, x.by]),
      beacon: Tuple(x.bx, x.by),
      dist: Math.abs(x.sx - x.bx) + Math.abs(x.by - x.sy),
    },
  ])
);

const beacons = new Map(
  map._(sensors, ([sensor, { beacon, ...data }]) => [
    beacon,
    { ...data, sensor },
  ])
);

const mergeRanges = (ranges: Iterable<NumTuple>) => {
  return (
    [...ranges]
      // sadly most of the time is spent in this sort algorithm :(
      .sort(([a], [b]) => a - b)
      .reduce((ranges, currRange) => {
        const lastRange = ranges.at(-1);
        // +1 as 1-4 and 5-10 are contiguous even if they don't overlap
        if (!lastRange || lastRange[1] + 1 < currRange[0]) {
          ranges.push([...currRange]);
        } else {
          lastRange[1] = Math.max(lastRange[1], currRange[1]);
        }
        return ranges;
      }, [] as NumTuple[])
  );
};

const p1 = (line: number) =>
  apply(
    sensors,
    filter(([[, y], { dist }]) => Math.abs(line - y) < dist),
    map(([[x, y], { dist }]) => {
      const remainingDist = dist - Math.abs(line - y);
      return [x - remainingDist, x + remainingDist] as NumTuple;
    }),
    // merge the ranges for easier working with
    mergeRanges,
    // Beacons can exist where they already exist, this might be within our range
    // so fragment ranges if a beacon exists in the range
    breakRangesByBeacons(filter._(beacons.keys(), ([, y]) => y === line)),
    map(([a, b]) => b - a + 1), // +1 for inclusive of itself
    sum
  );

const p2 = ([minX, maxX]: NumTuple) =>
  apply(
    range(minX, maxX),
    map((line) =>
      apply(
        sensors,
        filter(([[, y], { dist }]) => Math.abs(line - y) < dist),
        map(([[x, y], { dist }]) => {
          const remainingDist = dist - Math.abs(line - y);
          return [x - remainingDist, x + remainingDist] as NumTuple;
        }),
        filter((coords) => !coords.every((x) => x < minX && x > maxX)),
        map((x) => x.map((x) => clamp(x, minX, maxX)) as NumTuple),
        // merge the ranges for easier working with
        mergeRanges,
        excludedRangesInRange(minX, maxX),
        // Beacons can exist where they already exist, this might be within our range
        // so fragment ranges if a beacon exists in the range
        breakRangesByBeacons(beacons.keys()),
        map(([x]) => [x, line])
      )
    ),
    flat(Infinity),
    tuningFrequency
  );

console.time("P1");
console.log(`Number of spots that could not contain the beacon`, p1(2_000_000));
console.timeEnd("P1");
console.time("P2");
console.log(`Tuning frequency of beacon`, p2([0, 4_000_000]));
console.timeEnd("P2");

function breakRangesByBeacons([...beaconCoords]: Iterable<
  TupleOf<number, number>
>) {
  return flatMap(([x1, x2]: NumTuple): NumTuple[] => {
    for (const [bx] of beaconCoords) {
      if (x1 <= bx && x2 >= bx) {
        return [
          [x1, bx - 1],
          [bx + 1, x2],
        ];
      }
    }
    return [[x1, x2]];
  });
}

// assumes ranges are sorted
function excludedRangesInRange(start: number, stop: number) {
  return (ranges: Iterable<NumTuple>): NumTuple[] => {
    const output: NumTuple[] = [[start, stop]];
    let last = output.at(-1) ?? [-Infinity, Infinity];
    for (const item of ranges) {
      if (item[0] === last?.[0] && item[1] >= last?.[1]) {
        output.pop();
        return output;
      }
      if (item[0] > (last?.[1] ?? -Infinity)) {
        return output;
      }

      // item[0] is <= last[0]
      if (isBetween(item[1], last[0], last[1])) {
        output.splice(
          -1,
          1,
          ...([
            [last[0], item[0] - 1],
            [item[1] + 1, last[1]],
          ].filter(([a, b]) => b >= a) as NumTuple[])
        );
        last = output.at(-1) ?? [-Infinity, -Infinity];
      }
    }
    return output;
  };
}
