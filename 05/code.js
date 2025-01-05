import {realInput} from "./input.js";

if (typeof process !== "undefined" && process.argv[2] === "run") {
    console.log(part2(realInput));
}

export function parseInput(input) {
    const [rawOrdering, rawUpdates] = input.split("\n\n");

    const ordering = rawOrdering.split("\n").map(line => {
        return line.split("|").map(Number);
    });

    const updates = rawUpdates.split("\n").map(line => {
        return line.split(",").map(Number);
    });

    return {ordering, updates};
}

export function part1(input) {
    const {ordering, updates} = parseInput(input);

    const orderingGraph = {};
    ordering.forEach(pair => {
        if (!orderingGraph[pair[0]]) {
            orderingGraph[pair[0]] = {};
        }
        if (!orderingGraph[pair[1]]) {
            orderingGraph[pair[1]] = {};
        }
        orderingGraph[pair[0]][pair[1]] = 0;
        orderingGraph[pair[1]][pair[0]] = 1;
    });

    let sum = 0;
    up: for (let i = 0; i < updates.length; i++) {
        const update = updates[i];
        for (let j = 0; j < update.length - 1; j++) {
            const num = update[j];

            for (let k = j + 1; k < update.length; k++) {
                const nextNum = update[k];
                if (orderingGraph[num][nextNum] === 1) {
                    continue up;
                }
            }
        }

        sum += update[update.length / 2 | 0];
    }

    return sum;
}

export function part2(input) {
    const {ordering, updates} = parseInput(input);

    const orderingGraph = {};
    ordering.forEach(pair => {
        if (!orderingGraph[pair[0]]) {
            orderingGraph[pair[0]] = {};
        }
        if (!orderingGraph[pair[1]]) {
            orderingGraph[pair[1]] = {};
        }
        orderingGraph[pair[0]][pair[1]] = 0;
        orderingGraph[pair[1]][pair[0]] = 1;
    });

    let sum = 0;
    const incorrect = [];
    up: for (let i = 0; i < updates.length; i++) {
        const update = updates[i];
        for (let j = 0; j < update.length - 1; j++) {
            const num = update[j];

            for (let k = j + 1; k < update.length; k++) {
                const nextNum = update[k];
                if (orderingGraph[num][nextNum] === 1) {
                    incorrect.push(update);
                    continue up;
                }
            }
        }
    }

    for (let i = 0; i < incorrect.length; i++) {
        const update = incorrect[i];

        let isCorrect;
        restart: while (!isCorrect ) {
            isCorrect = true;
            for (let j = 0; j < update.length; j++) {
                const num = update[j];
                for (let k = j + 1; k < update.length; k++) {
                    const nextNum = update[k];
                    if (orderingGraph[num][nextNum] === 1) {
                        isCorrect = false;
                        const buffer = update[j];
                        update[j] = update[k];
                        update[k] = buffer;
                        continue restart;
                    }
                }
            }
        }

        sum += update[update.length / 2 | 0];
    }

    return sum;
}
