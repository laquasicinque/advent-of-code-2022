import { chunk } from "../_utils/chunk.ts";
import { getInput } from "../_utils/getInput.ts";
import { lines } from "../_utils/lines.ts";
import { map } from "../_utils/map.ts";
import { pipe } from "../_utils/pipe.ts";
import { sum } from "../_utils/sum.ts";

const input = getInput();

/* Honestly this is just me trying to be clever, a lookup string would be the easiest way */
function getPriority(char: string) {
  const charCode = char.charCodeAt(0);
  const lower = (charCode >> 5) & 1;
  const digit = charCode & 0x1f;

  return digit + (1 - lower) * 26;
}

const intersection = <T>(a: Iterable<T>, b: Iterable<T>) => {
  const bSet = new Set(b);
  return new Set([...a].filter((item) => bSet.has(item)));
};


const p1 = pipe(
  lines,
  map((x) => [x.slice(0, x.length / 2), x.slice(x.length / 2)]),
  map(([a, b]) => intersection(a, b)),
  map(([x]) => getPriority(x)),
  sum,
);

const p2 = pipe(
  lines,
  chunk(3),
  map(([a, b, c]) => intersection(a, intersection(b, c))),
  map(([x]) => getPriority(x)),
  sum,
);

console.log("Sum of Priorities in Bags:", p1(input));
console.log("Sum of priorities of badges:", p2(input))
