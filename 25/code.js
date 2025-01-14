import {example, realInput} from "./input.js";

if (typeof process !== "undefined" && process.argv[2] === "run") {
    console.log(part2(realInput));
}

export function part1(input) {
    const { locks, keys } = parseInput(input);

    let matches = 0;
    locks.forEach(lock => {
        keys.forEach(key => {
            if (key.every((k, i) => {
                return (key[i] + lock[i]) <= 5
            })) {
                matches++;
            }
        });
    });

    return matches;
}

export function part2(input) {

}

export function parseInput(input) {
    const locks = [];
    const keys = [];
    input.split('\n\n').forEach(block => {
        const numbers = [];
        block = block.split('\n');
        for (let x = 0; x < block[0].length; x++) {
            let height = 0;
            for (let y = 0; y < block.length; y++) {
                if (block[y][x] === '#') {
                    height++;
                }
            }
            numbers.push(height - 1);
        }

        if (block[0] === '#####') {
            locks.push(numbers);
        } else {
            keys.push(numbers);
        }
    });

    return {locks, keys};
}