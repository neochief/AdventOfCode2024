import {parseInput} from "./input.js";

console.log(run());

export function run() {
    const grid = parseInput();

    let result = 0;

    for (let y = 0; y < grid.length - 2; y++) {
        for (let x = 0; x < grid[y].length - 2; x++) {
            if (grid[x][y] === 'M' && grid[x + 2][y] === 'M' && grid[x + 1][y + 1] === 'A' && grid[x][y + 2] === 'S' && grid[x + 2][y + 2] === 'S') {
                result++;
            } else if (grid[x][y] === 'S' && grid[x + 2][y] === 'M' && grid[x + 1][y + 1] === 'A' && grid[x][y + 2] === 'S' && grid[x + 2][y + 2] === 'M') {
                result++;
            } else if (grid[x][y] === 'S' && grid[x + 2][y] === 'S' && grid[x + 1][y + 1] === 'A' && grid[x][y + 2] === 'M' && grid[x + 2][y + 2] === 'M') {
                result++;
            } else if (grid[x][y] === 'M' && grid[x + 2][y] === 'S' && grid[x + 1][y + 1] === 'A' && grid[x][y + 2] === 'M' && grid[x + 2][y + 2] === 'S') {
                result++;
            }
        }
    }

    return result;
}

