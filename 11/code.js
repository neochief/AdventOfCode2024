import {realInput} from "./input.js";

if (typeof process !== "undefined" && process.argv[2] === "run") {
    console.log(part2(realInput));
}

export function parseInput(input) {
    return input.split(' ').map(Number);
}

export function part1(input, n) {
    const stoneValues = parseInput(input);

    const stones = stoneValues.map((value) => {
        return {value: value}
    });

    function blink(stones) {
        for (let stone of stones) {
            if (stone.children === undefined) {
                if (stone.value === 0) {
                    stone.value = 1;
                } else {
                    const str = stone.value.toString();
                    if (str.length % 2 === 0) {
                        const left = str.slice(0, str.length / 2);
                        const right = str.slice(str.length / 2);
                        stone.children = [];
                        stone.children.push({value: Number(left)});
                        stone.children.push({value: Number(right)});
                    } else {
                        stone.value *= 2024;
                    }
                }
            } else {
                blink(stone.children);
            }
        }
    }

    function count(stones) {
        let sum = 0;
        for (let stone of stones) {
            if (stone.children === undefined) {
                // this is node
                sum += 1;
            } else {
                sum += count(stone.children);
            }
        }
        return sum;
    }

    for (let i = 0; i < n; i++) {
        blink(stones);
    }

    return count(stones);
}

export function part2(input, n) {
    const stoneValues = parseInput(input);

    const cache = {};

    const stones = stoneValues.map((value) => {
        return {value: value, starting: true};
    });

    function addChild(stone, child, iteration) {
        if (cache[child.value]) {
            child.cached = iteration;
        } else {
            cache[child.value] = child;
        }
        stone.children = stone.children || [];
        stone.children.push(child);
    }

    function blink(stones, iteration) {
        for (let stone of stones) {
            if (stone.cached !== undefined) {
                continue;
            }

            if (!stone.children) {
                if (stone.value === 0) {
                    addChild(stone, {value: 1}, iteration);
                } else {
                    const str = stone.value.toString();
                    if (str.length % 2 === 0) {
                        const left = str.slice(0, str.length / 2);
                        const right = str.slice(str.length / 2);
                        addChild(stone, {value: Number(left)}, iteration);
                        addChild(stone, {value: Number(right)}, iteration);
                    } else {
                        addChild(stone, {value: stone.value * 2024}, iteration)
                    }
                }
            } else {
                blink(stone.children, iteration);
            }
        }
    }

    function count(stones, iteration) {
        let sum = 0;
        for (let stone of stones) {
            stone.count = stone.count || [];

            let count;
            if (stone.cached !== undefined) {
                count = cache[stone.value].count[iteration - stone.cached];
            } else if (stone.children) {
                count = count(stone.children, iteration)
            } else {
                count = 1;
            }
            stone.count.push(count);
            sum += count;
        }
        return sum;
    }

    for (let i = 0; i < n; i++) {
        blink(stones, i);
        count(stones, i);
    }

    return stones.reduce((acc, stone) => {
        return acc + stone.count[n - 1];
    }, 0);
}
