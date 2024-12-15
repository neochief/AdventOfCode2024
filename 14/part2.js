import {parseInput, w, h} from "./input.js";

console.log(run());

export function run() {
    let {results} = iterate(10000);

    let maxValue = 0, result = -1;
    for (let i = 0; i < results.length; i++) {
        if (results[i][0] > maxValue) {
            maxValue = results[i][0];
            result = results[i][1];
        }
    }

    let {grid} = iterate(result);
    let str = '';
    grid.forEach((row) => {
        str += row.join('').replace(/0/g, '.') + "\n";
    });

    return result + '\n\n' + str;
}

function iterate(n) {
    const robots = parseInput();
    let results = [];
    let grid;
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < robots.length; j++) {
            updateRobot(robots[j]);
        }

        grid = new Array(w).fill(0).map(() => new Array(h).fill(0));
        for (let j = 0; j < robots.length; j++) {
            grid[robots[j].x][robots[j].y]++;
        }

        let withNeighbors = 0;
        for (let m = 1; m < w - 1; m++) {
            for (let n = 1; n < h - 1; n++) {
                if (grid[m][n] > 0) {
                    if (grid[m - 1][n] > 0 || grid[m + 1][n] > 0 || grid[m][n - 1] > 0 || grid[m][n + 1] > 0) {
                        withNeighbors++;
                    }
                }
            }
        }

        results.push([withNeighbors, i]);
    }
    return {results, grid};
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

