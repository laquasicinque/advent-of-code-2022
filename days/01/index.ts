import { getInput } from "../_utils/getInput.ts";
import { sum } from "../_utils/sum.ts";

const input = getInput();

function highestCalories(str: string, count = 1): number {
  const totalCals = str
    .split("\n\n")
    .map((x) => sum(x.split("\n")))
    .sort((a, b) => b - a);
  return sum(totalCals.slice(0, count));
}

console.log("Highest Calorie from individual: ", highestCalories(input));
console.log(
  "Sum of Top 3 Highest Calorie Carrying Individuals: ",
  highestCalories(input, 3)
);
