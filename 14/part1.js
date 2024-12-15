import { parseInput, w, h } from "./input.js";

console.log(run());

export function run() {
    const robots = parseInput();

    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < robots.length; j++) {
            updateRobot(robots[j]);
        }
    }

    const quads = new Array(5).fill(0);
    for (let j = 0; j < robots.length; j++) {
        quads[robotQuadrant(robots[j])]++;
    }

    let result = 1;
    for (let i = 1; i <= 4; i++) {
        result *= quads[i];
    }

    return result;
}

function updateRobot(r) {
    if (r.x + r.vx >= w) {
        r.x = r.x + r.vx - w;
    } else if (r.x + r.vx < 0) {
        r.x = w + r.vx + r.x;
    } else {
        r.x += r.vx;
    }

    if (r.y + r.vy >= h) {
        r.y = r.y + r.vy - h;
    } else if (r.y + r.vy < 0) {
        r.y = h + r.vy + r.y;
    } else {
        r.y += r.vy;
    }
}

function robotQuadrant(r) {
    if (r.x < Math.floor(w / 2)) {
        if (r.y < Math.floor(h / 2)) {
            return 1;
        } else if (r.y >= Math.ceil(h / 2)) {
            return 3;
        }
    } else if (r.x >= Math.ceil(w / 2)) {
        if (r.y < Math.floor(h / 2)) {
            return 2;
        } else if (r.y >= Math.ceil(h / 2)) {
            return 4;
        }
    }
    return 0;
}

