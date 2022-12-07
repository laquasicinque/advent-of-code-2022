import { apply } from "../_utils/apply.ts";
import { flatMap } from "../_utils/flatMap.ts";
import { getInput } from "../_utils/getInput.ts";
import { join } from "../_utils/join.ts";
import { lines } from "../_utils/lines.ts";
import { map } from "../_utils/map.ts";
import { pipe } from "../_utils/pipe.ts";

const input = getInput();
const [startingPos, steps] = input.split("\n\n");
const stackReggie = /(?:\[(?<val>\w)\])(?: |$)/g;
const stepsReggie = /move (\d+) from (\d+) to (\d+)$/gm;
const last = <T>(x: T[]): T | undefined => x.at(-1);

const p1 = pipe(
  getStartingStacks,
  (stacks: string[][]) => shuffleStacks(stacks, steps),
  map(last),
  join(""),
);
const p2 = pipe(
  getStartingStacks,
  (stacks: string[][]) => shuffleStacks(stacks, steps, true),
  map(last),
  join(""),
);

console.log("Moving Box by Box: ", p1(startingPos));
console.log("Moving in Bulk", p2(startingPos));

function shuffleStacks(stacks: string[][], steps: string, moveInBulk = false) {
  for (const match of steps.matchAll(stepsReggie)) {
    const [, count, src, dest] = match.map(Number);
    const moveBlocks = stacks[src - 1].splice(-count);
    if (!moveInBulk) {
      moveBlocks.reverse();
    }
    stacks[dest - 1].push(...moveBlocks);
  }
  return stacks;
}

function getStartingStacks(rawStartStr: string) {
  const stacks: string[][] = Array.from(
    { length: Math.ceil(rawStartStr.indexOf("\n") / 4) },
    () => []
  );
  for (const {
    index,
    groups: { val },
  } of apply(rawStartStr,
    lines,
    flatMap((x: string) => x.matchAll(stackReggie)),
  )) {
    stacks[(index ?? 0) / 4].push(val);
  }
  // We're moving items frequently from the top of the stack so we should
  // reverse so that its the end of the array
  stacks.forEach((stack) => stack.reverse());

  return stacks;
}
