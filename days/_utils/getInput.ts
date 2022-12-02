import * as path from "https://deno.land/std@0.167.0/path/mod.ts";
import { getEntryFile } from "./getEntryFile.ts";

export function getInput() {
  const entry = getEntryFile();
  const dirname = path.dirname(entry);
  return Deno.readTextFileSync(path.resolve(dirname, "./data.txt"));
}
