import { getInput } from "../_utils/getInput.ts";
import { lines } from "../_utils/lines.ts";
import { map } from "../_utils/map.ts";
import { filter } from "../_utils/filter.ts";
import { pipe } from "../_utils/pipe.ts";
import { sum } from "../_utils/sum.ts";
import { apply } from "../_utils/apply.ts";
import { groups } from "../_utils/groups.ts";
import { min } from "../_utils/min.ts";

type File = {
  type: "FILE";
  name: string;
  size: number;
  parent: Directory;
};
type Directory = {
  type: "DIR";
  name: string;
  parent: Directory | null;
  children: Map<string, File | Directory>;
  size: number;
};

const input = getInput();
const cmdGroups = pipe(
  lines,
  groups((x: string) => x.startsWith("$"))
);
const root = createTree(createDir("/"), input);

const p1 = pipe(
  dirFlatten,
  filter((item) => item.type === "DIR" && item.size <= 1e5),
  map((dir) => dir.size),
  sum
);

const p2 = (dir: Directory) => {
  const freeSpace = 7e7 - dir.size;
  const requiredSpace = 3e7 - freeSpace;
  return apply(
    dir,
    dirFlatten,
    filter((item) => item.type === "DIR" && item.size >= requiredSpace),
    map((dir) => dir.size),
    min
  );
};

console.log("Sum of all folders with size greater than 100,000: ", p1(root));
console.log("Size of Smallest folder to delete for update:", p2(root));

function createTree(root: Directory, input: string) {
  let cwd = root;
  for (const [cmdLine, ...output] of cmdGroups(input)) {
    const [, cmd, ...args] = cmdLine.split(" ");
    if (cmd === "cd") {
      const path = args[0];
      cwd =
        path === "/"
          ? root
          : path === ".."
          ? (cwd.parent as Directory)
          : (cwd.children.get(path) as Directory);
    } else if (cmd === "ls") {
      for (const lsLine of output) {
        const [sizeStr, name] = lsLine.split(" ");
        if (!cwd.children.has(name))
          cwd.children.set(
            name,
            sizeStr === "dir"
              ? createDir(name, cwd)
              : createFile(name, Number(sizeStr), cwd)
          );
      }
    }
  }
  return root;
}

function* dirFlatten(dir: Directory): Iterable<Directory | File> {
  yield dir;
  for (const item of dir.children.values()) {
    if (item.type === "DIR") yield* dirFlatten(item);
    else yield item;
  }
}

function createDir(name: string, parent: Directory | null = null): Directory {
  return {
    type: "DIR",
    name,
    parent,
    children: new Map(),
    size: 0,
  };
}

function createFile(name: string, size: number, parent: Directory): File {
  let p: Directory | null = parent;
  while (p) {
    p.size += size;
    p = p.parent;
  }
  return {
    type: "FILE",
    name,
    parent,
    size,
  };
}
