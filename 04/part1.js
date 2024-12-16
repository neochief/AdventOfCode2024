import {parseInput} from "./input.js";

console.log(run());

export function run() {
    const grid = parseInput();
    const chars = ['X', 'M', 'A', 'S'];

    let result = 0;

    function traverse(grid, x, y, search, direction) {
        if (x < 0 || x >= grid.length || y < 0 || y >= grid[0].length) {
            return;
        }

        if (grid[x][y] !== chars[search]) {
            return;
        }

        if (search === chars.length - 1) {
            result++;
            return;
        }

        if (!direction) {
            traverse(grid, x - 1, y - 1, search + 1, {x: -1, y: -1});
            traverse(grid, x, y - 1, search + 1, {x: 0, y: -1});
            traverse(grid, x + 1, y - 1, search + 1, {x: 1, y: -1});
            traverse(grid, x - 1, y, search + 1, {x: -1, y: 0});
            traverse(grid, x + 1, y, search + 1, {x: 1, y: 0});
            traverse(grid, x - 1, y + 1, search + 1, {x: -1, y: 1});
            traverse(grid, x, y + 1, search + 1, {x: 0, y: 1});
            traverse(grid, x + 1, y + 1, search + 1, {x: 1, y: 1});
        } else {
            traverse(grid, x + direction.x, y + direction.y, search + 1, direction);
        }
    }

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            traverse(grid, x, y, 0);
        }
    }

    return result;
}

