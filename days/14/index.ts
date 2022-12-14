import { apply } from "../_utils/apply.ts";
import { collect } from "../_utils/collect.ts";
import { getInputLines } from "../_utils/input.ts";
import { map } from "../_utils/map.ts";
import { range } from "../_utils/range.ts";
import { flatMap } from "../_utils/flatMap.ts";
import { take } from "../_utils/take.ts";
import { takeWhile } from "../_utils/takeWhile.ts";
// import { join } from "../_utils/join.ts";
import { windows } from "../_utils/windows.ts";
import { zip } from "../_utils/zip.ts";
import Tuple, { TupleOf } from "../_utils/Tuple.ts";
import { cycle } from "../_utils/cycle.ts";
import { pipe } from "../_utils/pipe.ts";
import { last } from "../_utils/last.ts";
type Coord = TupleOf<number, number>;

const wallCoords: Coord[][] = apply(
  getInputLines(),
  map((x) =>
    x
      .split(" -> ")
      .map((x) => Tuple(...(x.split(",").map(Number) as [number, number])))
  ),
  collect
);
const points = pipe(
  flatMap(windows(2))<Coord>,
  flatMap(([[startX, startY], [stopX, stopY]]) =>
    apply(
      zip([loopedRange(startX, stopX), loopedRange(startY, stopY)]),
      take(Math.max(Math.abs(startX - stopX), Math.abs(startY - stopY))),
      map((x) => Tuple(...x))
    )
  )
);
const loopedRange = (a: number, b: number) => cycle(range(a, b));

// const printGrid = (obj: Map<Coord, string>) => {
//   const xs: number[] = [];
//   const ys: number[] = [];
//   for (const key of obj.keys()) {
//     const [x, y] = key
//     xs.push(x);
//     ys.push(y);
//   }
//   for (const y of range(Math.min(...ys, 0), Math.max(...ys))) {
//     console.log(
//       apply(
//         range(Math.min(...xs), Math.max(...xs)),
//         map((x) => obj.get(Tuple(x,y)) ?? "."),
//         join("")
//       )
//     );
//   }
// };

const createWallsObj = (wallCoords: Coord[][]) => {
  let maxY = -Infinity;
  const objMap = new Map<Coord, string>();
  for (const tuple of points(wallCoords)) {
    maxY = Math.max(tuple[1], maxY);
    objMap.set(tuple, "#");
  }
  return { objMap, maxY };
};

const p1 = (wallCoords: Coord[][]) => {
  const { objMap, maxY } = createWallsObj(wallCoords);
  const start = objMap.size;
  while (true) {
    const tuple = apply(
      dropSand(objMap),
      takeWhile(([_, y]) => y <= maxY ),
      last
    )!;
    if(tuple[1] > maxY-1) break
    objMap.set(tuple, "o");
  }
  return objMap.size - start;
};

const p2 = (wallCoords: Coord[][]) => {
  const { objMap, maxY } = createWallsObj(wallCoords);
  const start = objMap.size;
  while (objMap.get(Tuple(500, 0)) !== "o") {
    const tuple = apply(
      dropSand(objMap),
      takeWhile(([_, y]) => y <= maxY + 1),
      last
    )!;
    objMap.set(tuple, "o");
  }
  return objMap.size - start;
};
console.log(p1(wallCoords));
console.log(p2(wallCoords));

function* dropSand(objMap: Map<Coord, string>) {
  let x = 500;
  let y = 0;
  while (true) {
    if (!objMap.get(Tuple(x, y + 1))) y++;
    else if (!objMap.get(Tuple(x - 1, y + 1))) x--;
    else if (!objMap.get(Tuple(x + 1, y + 1))) x++;
    else {
      yield Tuple(x, y);
      return;
    }
    yield Tuple(x, y);
  }
}
