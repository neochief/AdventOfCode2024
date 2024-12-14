import { parseInput } from "./input.js";

console.log(run());

export function run() {
    const input = parseInput();

    let price = 0;
    input.forEach(element => {
        price += calculate(element.ax, element.ay, element.bx, element.by, element.x, element.y);
    });

    return price;
}

function calculate(ax, ay, bx, by, x, y) {
    const aprice = 3;
    const bprice = 1;
    let a = 0;
    let b = 0;

    b = (ay * x - ax * y) / (ay * bx - ax * by);
    a = (y - by * b) / ay;

    let price;
    if (Math.floor(a) !== a || Math.floor(b) !== b) {
        price = 0;
    }
    else {
        price =  a * aprice + b * bprice;
    }

    return price;
}

