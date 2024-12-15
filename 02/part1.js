import {parseInput} from "./input.js";

console.log(run());

export function run() {
    const records = parseInput();

    const safety = records.map(record => {
        if (record.length < 2) {
            return 0;
        }

        let isDecreasing, isIncreasing;
        for (let i = 0; i < record.length - 1; i++) {
            const diff = Math.abs(record[i] - record[i + 1]);
            if (diff < 1 || diff > 3) {
                return 0;
            }

            if (isDecreasing === undefined) {
                if (record[i] < record[i + 1]) {
                    isIncreasing = true;
                    isDecreasing = false;
                } else if (record[i] > record[i + 1]) {
                    isIncreasing = false;
                    isDecreasing = true;
                }
            }

            if (isDecreasing && record[i] < record[i + 1]) {
                return 0;
            }

            if (isIncreasing && record[i] > record[i + 1]) {
                return 0;
            }
        }

        return 1;
    });

    const result = safety.reduce((acc, val) => acc + val, 0);

    return result;
}
