import { apply } from "../_utils/apply.ts";
import { collect } from "../_utils/collect.ts";
import { getInput } from "../_utils/getInput.ts";
import { lines } from "../_utils/lines.ts";
import { map } from "../_utils/map.ts";
import { filter } from "../_utils/filter.ts";
import { pipe } from "../_utils/pipe.ts";

const REPLACEMENT_MAP = { S: "a", E: "z" };
const input = getInput();

const mapCoords = map((x: string) => x.split(",").map(Number));
const grid = pipe(lines, map(collect), collect)(input);
const getValidSteps = (
  grid: string[][],
  x: number,
  y: number,
  isTraversable: (a: string, b: string) => boolean
) => {
  return apply(
    getCardinals(x, y),
    filter(([x, y]) => grid[y]?.[x] != null),
    filter(([u, v]) => isTraversable(grid[y][x], grid[v][u])),
    collect
  );
};

const p1 = (grid: string[][]) => shortestPath(grid, "S", "E", isTraversable);
const p2 = (grid: string[][]) =>
  shortestPath(grid, "E", "a", (a, b) => isTraversable(b, a));

console.log("Shortest path from S to E", p1(grid));
console.log("Shortest path from any a to E", p2(grid));

function shortestPath(
  grid: string[][],
  start: string,
  dest: string,
  traverseLogic: (a: string, b: string) => boolean
) {
  const coordMap = new Map<string, number>([
    [getCoord(grid, start).join(","), 0],
  ]);
  for (const coordStr of mapCoords(coordMap.keys())) {
    const [x,y] =coordStr
    const stepNum = coordMap.get(coordStr.join(','))!;
    if (grid[y][x] === dest) {
      return stepNum;
    }
    for (const step of getValidSteps(grid, x, y, traverseLogic)) {
      const key = step.join(",");
      if (!coordMap.has(key)) coordMap.set(key, stepNum + 1);
    }
  }
}

function getCardinals(x: number, y: number): [number, number][] {
  return [
    [x, y - 1], // up
    [x + 1, y], // right
    [x, y + 1], // down
    [x - 1, y], //left
  ];
}

function isTraversable(start: string, end: string) {
  const s = REPLACEMENT_MAP[start as keyof typeof REPLACEMENT_MAP] ?? start;
  const e = REPLACEMENT_MAP[end as keyof typeof REPLACEMENT_MAP] ?? end;
  return e.codePointAt(0)! - s.codePointAt(0)! <= 1;
}

function getCoord(grid: string[][], start: string): [number, number] {
  const y = grid.findIndex((x) => x.includes(start));
  const x = grid[y].indexOf(start);
  return [x, y];
}
