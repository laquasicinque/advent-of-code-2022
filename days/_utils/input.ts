import * as path from "https://deno.land/std@0.167.0/path/mod.ts";
import { apply } from "./apply.ts";
import { getEntryFile } from "./getEntryFile.ts";
import { lines } from "./lines.ts";
import { map } from "./map.ts";

export function getInput() {
  const entry = getEntryFile();
  const dirname = path.dirname(entry);
  return Deno.readTextFileSync(path.resolve(dirname, "./data.txt")).trim();
}

export function getInputLines() {
  return lines(getInput())
}
export function getInputLinesArray() {
  return [...getInputLines()]
}

export function getInputGrid() {
  return apply(getInputLines(), map(([...x]) => x))
}
