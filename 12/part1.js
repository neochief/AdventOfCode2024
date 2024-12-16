import {parseInput} from "./input.js";

console.log(run());

export function run() {
    const grid = parseInput();

    const visited = new Array(grid.length).fill(0).map(() => new Array(grid[0].length).fill(false));
    const regions = [];

    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[0].length; y++) {
            if (visited[x][y]) {
                continue;
            }
            const region = {
                id: regions.length,
                type: grid[x][y],
                area: 0,
                perimeter: 0,
            }
            regions.push(region);
            traverse(grid, x, y, region, visited);
        }
    }

    const result = regions.reduce((acc, region) => {
        return acc + region.area * region.perimeter;
    }, 0);

    return result;
}

function traverse(grid, x, y, region, visited) {
    if (x < 0 || x >= grid.length || y < 0 || y >= grid[0].length) {
        region.perimeter++;
        return;
    }

    if (grid[x][y] !== region.type) {
        region.perimeter++;
        return;
    }

    if (visited[x][y]) {
        return;
    }

    visited[x][y] = region;
    region.area++;

    traverse(grid, x - 1, y, region, visited);
    traverse(grid, x + 1, y, region, visited);
    traverse(grid, x, y - 1, region, visited);
    traverse(grid, x, y + 1, region, visited);
}
