import {realInput} from "./input.js";

if (typeof process !== "undefined" && process.argv[2] === "run") {
    console.log(part2(realInput));
}

export function parseInput(input) {
    return input.split('').map(Number);
}

export function part1(input) {
    const array = parseInput(input);

    const map = [];
    let fileId = 0;
    for (let i = 0; i < array.length; i++) {
        const length = array[i];
        if (length === 0) {
            continue;
        }

        if (i % 2 === 0) {
            for (let j = 0; j < length; j++) {
                map.push(fileId);
            }
            fileId++
        } else {
            for (let j = 0; j < length; j++) {
                map.push(-1);
            }
        }
    }

    let left = 0;
    let right = map.length - 1;
    for (let i = right; i > left; i--) {
        if (map[i] !== -1) {
            for (let j = left; j < i; j++) {
                if (map[j] === -1) {
                    const temp = map[j];
                    map[j] = map[i];
                    map[i] = temp;
                    left = j;
                    break;
                }
            }
        }
    }

    return map.reduce((acc, cur, index) => {
        return acc + (index * (cur === -1 ? 0 : cur));
    }, 0);
}

export function part2(input) {

    const array = parseInput(input);

    const map = [];
    let fileId = 0;
    for (let i = 0; i < array.length; i++) {
        const length = array[i];
        if (length === 0) {
            continue;
        }

        if (i % 2 === 0) {
            for (let j = 0; j < length; j++) {
                map.push(fileId);
            }
            fileId++
        } else {
            for (let j = 0; j < length; j++) {
                map.push(-1);
            }
        }
    }

    let left = 0;
    let right = map.length - 1;
    loop: for (let i = right; i >= 0; i--) {
        if (map[i] !== -1) {
            let length = 1;
            for (let ii = i - 1; i >= 0; ii--) {
                if (map[ii] === -1 || map[ii] !== map[i]) {
                    break;
                }
                length++;
            }

            for (let j = 0; j < i; j++) {
                if (map[j] === -1) {
                    let freeLength = 1;
                    for (let jj = j + 1; jj < i; jj++) {
                        if (map[jj] !== -1) {
                            break;
                        }
                        freeLength++;
                    }

                    if (freeLength >= length) {
                        for (let k = 0; k < length; k++) {
                            const temp = map[j + k];
                            map[j + k] = map[i - k];
                            map[i - k] = temp;
                        }
                        left = j + length;
                        i -= length - 1;
                        continue loop;
                    } else {
                        j += freeLength;
                    }
                }
            }
            i -= length - 1;
        }
    }

    return map.reduce((acc, cur, index) => {
        return acc + (index * (cur === -1 ? 0 : cur));
    }, 0);
}
