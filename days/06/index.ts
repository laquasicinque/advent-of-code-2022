import { getInput } from "../_utils/getInput.ts";

const input = getInput();

const findSignalMarker = (input: string, markerLength: number) => {
  const group: string[] = [];
  let i = 1;
  for (const char of input) {
    const index = group.indexOf(char);
    if (index > -1) group.splice(0, index + 1);
    group.push(char);
    if (group.length >= markerLength) return i;
    i++;
  }
};

const p1 = (input: string) => findSignalMarker(input, 4);
const p2 = (input: string) => findSignalMarker(input, 14);

console.log("4 Letter message marker", p1(input));
console.log("14 letter message marker", p2(input));
