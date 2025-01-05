import {realInput} from "./input.js";

if (typeof process !== "undefined" && process.argv[2] === "run") {
    console.log(part2(realInput));
}

export function parseInput(input) {
    return input.split('\n').map(x => x.replace(/(: | )/g, '|').split('|').map(Number));
}

export function part1(input) {
    const equations = parseInput(input);

    let result = 0;
    equations.forEach(equation => {
        function dive(index, acc) {
            if (acc > equation[0]) {
                return false;
            }

            if (index === equation.length) {
                return acc === equation[0];
            }

            return dive(index + 1, acc + equation[index]) || dive(index + 1, acc * equation[index]);
        }

        const isPossible = dive(2, equation[1]);

        if (isPossible) {
            result += equation[0];
        }
    });

    return result;
}

export function part2(input) {
    const equations = parseInput(input);

    let result = 0;
    equations.forEach(equation => {
        function dive(index, acc) {
            if (acc > equation[0]) {
                return false;
            }

            if (index === equation.length) {
                return acc === equation[0];
            }

            return dive(index + 1, acc + equation[index]) || dive(index + 1, acc * equation[index]) || dive(index + 1, Number(acc.toString() +  equation[index].toString()));
        }

        const isPossible = dive(2, equation[1]);

        if (isPossible) {
            result += equation[0];
        }
    });

    return result;
}
