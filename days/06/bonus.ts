import { count } from "../_utils/count.ts";
import { getInput } from "../_utils/getInput.ts";
import { windows } from "../_utils/windows.ts";
import { pipe } from "../_utils/pipe.ts";
import { takeWhile } from "../_utils/takeWhile.ts";

const input = getInput();
const add = (a:number) => (b:number) => a + b

const findSignalMarkerFactory = (markerSize:number) =>  pipe(
  windows(markerSize),
  takeWhile((x) => new Set(x).size < markerSize),
  count,
  add(markerSize)
)

const p1 = findSignalMarkerFactory(4)
const p2 = findSignalMarkerFactory(14)

console.log("4 Letter message marker", p1(input));
console.log("14 letter message marker", p2(input));
