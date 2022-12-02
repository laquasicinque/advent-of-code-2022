import { getInput } from "../_utils/getInput.ts";
import { sum } from "../_utils/sum.ts";

const input = getInput();
const RPS_A = ["A", "B", "C"] as const;
const RPS_X = ["X", "Y", "Z"] as const;
const WINNING_HANDS = new Set(["AY", "BZ", "CX"]);
const WIN_SCORE = 6;
const DRAW_SCORE = 3;
const LOSE_SCORE = 0;

type ItemValue<T extends ReadonlyArray<unknown>> = T[number];
type PlayerHand = ItemValue<typeof RPS_X>;
type CPUHand = ItemValue<typeof RPS_A>;

const values = (input: string) =>
  input
    .trim()
    .split("\n")
    .map((x) => x.split(" ") as [CPUHand, PlayerHand]);

const gameScore = (a: CPUHand, b: PlayerHand) => {
  if (RPS_A.indexOf(a) === RPS_X.indexOf(b)) return DRAW_SCORE;
  return WINNING_HANDS.has(`${a}${b}`) ? WIN_SCORE : LOSE_SCORE;
};

const gameResult = (a: CPUHand, b: PlayerHand) => {
  switch (b) {
    case "X":
      return ((2 + RPS_A.indexOf(a)) % 3) + 1 + LOSE_SCORE;
    case "Z":
      return ((4 + RPS_A.indexOf(a)) % 3) + 1 + WIN_SCORE;
    case "Y":
    default:
      return RPS_A.indexOf(a) + 1 + DRAW_SCORE;
  }
};

function scoreP1(input: string) {
  return sum(
    values(input).map(([a, b]) => gameScore(a, b) + RPS_X.indexOf(b) + 1)
  );
}

function scoreP2(input: string) {
  return sum(values(input).map(([a, b]) => gameResult(a, b)));
}

console.log("XYZ is RPS, max points: ", scoreP1(input));
console.log("XYZ is LDS, max points: ", scoreP2(input));
