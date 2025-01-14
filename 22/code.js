import {example, realInput} from "./input.js";

if (typeof process !== "undefined" && process.argv[2] === "run") {
    console.log(part2(realInput));
}

export function parseInput(input) {
    return input.split('\n').map(BigInt);
}

export function part1(input) {
    const secrets = parseInput(input);

    for (let i = 0; i < 2000; i++) {
        for (let s = 0; s < secrets.length; s++) {
            let secret = secrets[s];
            secret = ((secret << 6n) ^ secret) % 16777216n; // 2^24
            secret = ((secret >> 5n) ^ secret) % 16777216n;
            secret = ((secret << 11n) ^ secret) % 16777216n;
            secrets[s] = secret;
        }
    }

    return secrets.reduce((acc, secret) => acc + secret, 0n);
}

export function part2(input) {
    const secrets = parseInput(input);

    const prices = [];
    const diff = [];

    for (let i = 0; i < 2000; i++) {
        for (let s = 0; s < secrets.length; s++) {
            let secret = secrets[s];
            secret = ((secret << 6n) ^ secret) % 16777216n;
            secret = ((secret >> 5n) ^ secret) % 16777216n;
            secret = ((secret << 11n) ^ secret) % 16777216n;

            const newPrice = Number((secret % 10n) | 0n);
            if (prices[s] === undefined) {
                prices.push([]);
            }
            prices[s].push(newPrice);

            const oldPrice = prices[s].length > 1 ? prices[s][prices[s].length - 2] : Number((secrets[s] % 10n) | 0n);
            if (diff[s] === undefined) {
                diff.push([]);
            }
            diff[s].push(newPrice - oldPrice);
            secrets[s] = secret;
        }
    }

    const totals = [];
    const lastPositions = [];
    const bufferLength = 4;

    for (let x = 0; x < diff.length; x++) {
        for (let y = 0; y < diff[x].length - bufferLength; y++) {
            const buffer = diff[x].slice(y, y + bufferLength);
            const index = getIndex(buffer[0], buffer[1], buffer[2], buffer[3]);
            if (lastPositions[index] === undefined || lastPositions[index] < x) {
                totals[index] = totals[index] || 0;
                totals[index] += prices[x][y + bufferLength - 1];
                lastPositions[index] = x;
            }
        }
    }

    function getIndex(a, b, c, d) {
        const MAX_DIFF = 19;
        const MAX_ONE_DIFF = 9;
        return (MAX_DIFF * MAX_DIFF * MAX_DIFF * (a + MAX_ONE_DIFF))
            + (MAX_DIFF * MAX_DIFF * (b + MAX_ONE_DIFF))
            + (MAX_DIFF * (c + MAX_ONE_DIFF))
            + (d + MAX_ONE_DIFF);
    }

    return Object.keys(totals).reduce((acc, key) => {
        if (totals[key] > acc) {
            acc = totals[key];
        }
        return acc;
    }, 0);
}
