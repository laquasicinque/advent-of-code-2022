import * as path from "https://deno.land/std@0.167.0/path/mod.ts";

/**
 * Neveruse this in prod
 */
export function getEntryFile() {
  try {
    throw new Error();
  } catch(e) {
    const file = (e as Error).stack?.split("\n").at(-1) as string;
    return path.fromFileUrl(
      file.replace(/\s*at /, "").replace(/:\d+:\d+$/, "")
    );
  }
}
