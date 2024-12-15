import {parseInput} from "./input.js";

console.log(run());

export function run() {
    const str = parseInput();

    let result = 0;
    const matches = [...str.matchAll(/(?:(?<mul>mul\(([0-9]+),([0-9]+)\))|(?<do>do\(\))|(?<dont>don't\(\)))/g)];

    let doMultiply = true;
    matches.forEach(match => {
        if (match.groups.do) {
            doMultiply = true;
        } else if (match.groups.dont) {
            doMultiply = false;
        } else if (match.groups.mul && doMultiply) {
            result += match[2] * match[3];
        }
    });

    return result;
}