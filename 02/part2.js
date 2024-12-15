import {parseInput} from "./input.js";

console.log(run());

export function run() {
    const records = parseInput();

    const safety = records.map(record => checkRecords(record, false));

    const result = safety.reduce((acc, val) => acc + val, 0);

    return result;
}

function checkRecords(record, rechecking) {
    if (record.length < 2) {
        return 0;
    }

    let result = 1;
    let isDecreasing, isIncreasing;
    for (let i = 0; i < record.length - 1; i++) {
        const diff = Math.abs(record[i] - record[i + 1]);
        if (diff < 1 || diff > 3) {
            result = 0;
            break;
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
            result = 0;
            break;
        }

        if (isIncreasing && record[i] > record[i + 1]) {
            result = 0;
            break;
        }
    }

    if (!result && !rechecking) {
        for (let i = 0; i < record.length; i++) {
            const newRecord = record.slice(0, i).concat(record.slice(i + 1));
            result = checkRecords(newRecord, true);
            if (result) {
                return result;
            }
        }
        return 0;
    } else {
        return result;
    }
}