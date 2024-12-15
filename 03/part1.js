import {parseInput} from "./input.js";

console.log(run());

export function run() {
    const str = parseInput();

    let result = 0;
    const matches = [...str.matchAll(/mul\(([0-9]+),([0-9]+)\)/g)];

    matches.forEach(match => {
        result += match[1] * match[2];
    });

    return result;
}
