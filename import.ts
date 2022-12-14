// import * as path from "https://deno.land/std@0.167.0/path/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import {
  DOMParser,
  Element,
} from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
const day = String(Deno.args[0] ?? new Date().getDate());

const env = config();
console.log(`Importing day ${day}.`);
const [instructions, input] = await Promise.all([
  getInstructions(),
  getInput(),
]);

try {
  await Deno.mkdir(`days/${day.padStart(2, "0")}/`, { recursive: true });
} catch (e) {
  console.log(e);
}

const encoder = new TextEncoder();

await Deno.writeFile(
  `days/${day.padStart(2, "0")}/data.txt`,
  encoder.encode(input)
);
await Deno.writeFile(
  `days/${day.padStart(2, "0")}/README.md`,
  encoder.encode(instructions)
);
try {
  const file = await Deno.open(`days/${day.padStart(2, "0")}/index.ts`);
  file.write(
    encoder.encode(`import { getInput } from '../_utils/getInput.ts';
  const input = getInput()
  `)
  );
  file.close();
} catch {}

console.log(`Files written`);

async function getInput() {
  const page = await fetch(`https://adventofcode.com/2022/day/${day}/input`, {
    headers: {
      COOKIE: "session=" + env.AOC_SESSION,
    },
  });

  return page.text();
}

async function getInstructions() {
  const page = await fetch(`https://adventofcode.com/2022/day/${day}`, {
    headers: {
      COOKIE: "session=" + env.AOC_SESSION,
    },
  });

  const data = await page.text();
  const doc = new DOMParser().parseFromString(data, "text/html");
  const nodes = [];
  for (const node of doc?.querySelectorAll("article > *") || []) {
    switch ((node as Element).tagName) {
      case "H2":
        nodes.push(`# ${node.textContent}`);
        break;
      case "PRE":
        nodes.push(`\`\`\`\n${node.textContent}\n\`\`\``);
        break;
      case "UL":
        nodes.push(
          [...(node as Element).children]
            .map((x) => `- ${x.textContent}`)
            .join("\n")
        );
        break;
      case "P":
        {
          const cp = node.cloneNode(true) as Element;
          cp.querySelectorAll("*").forEach((item) => {
            const el = item as Element;
            return el.replaceWith(
              el.tagName === "CODE"
                ? `\`${el.textContent}\``
                : el.tagName === "EM"
                ? `*${item.textContent}*`
                : el
            );
          });
          nodes.push(cp.textContent);
        }
        break;
      default:
        console.log((node as Element).tagName, "Not supported");
    }
  }
  return nodes.join("\n\n");
}
