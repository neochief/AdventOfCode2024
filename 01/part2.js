import { parseInput } from "./input.js";

console.log(run());

export function run() {
    let {a, b} = parseInput();

    let result = 0;
    a.forEach((avalue, aindex) => {
        let counter = 0;
        b.forEach((bvalue, bindex) => {
            if (avalue === bvalue) {
                counter++;
            }
        });

        result += avalue * counter;
    });

    return result;
}
