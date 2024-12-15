import { parseInput } from "./input.js";

console.log(run());

export function run() {
    let {a, b} = parseInput();

    a = a.sort((a, b) => a - b);

    b = b.sort((a, b) => a - b);

    let result = 0;
    for (let i = 0; i < a.length; i++) {
        result += Math.abs(a[i] - b[i]);
    }

    return result;
}
