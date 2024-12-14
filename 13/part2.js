import { parseInput } from "./input.js";

console.log(run());

export function run() {
    const input = parseInput();

    let price = BigInt(0);
    input.forEach(element => {
        price += calculate(element.ax, element.ay, element.bx, element.by, element.x, element.y);
    });

    return price.toString();
}

function calculate(ax, ay, bx, by, _x, _y) {
    const x = BigInt(_x + 10000000000000);
    const y = BigInt(_y + 10000000000000);

    const aprice = BigInt(3);
    const bprice = BigInt(1);

    const b = BigInt((BigInt(ay) * BigInt(x) - BigInt(ax) * BigInt(y)) / (BigInt(ay) * BigInt(bx) - BigInt(ax) * BigInt(by)));
    const a = BigInt((BigInt(y) - BigInt(by) * BigInt(b)) / BigInt(ay));

    let price;
    if (a * BigInt(ax) + b * BigInt(bx) !== x || a * BigInt(ay) + b * BigInt(by) !== y) {
        price = 0n;
    } else {
        price = a * aprice + b * bprice
    }

    return price;
}