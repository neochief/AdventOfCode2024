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
                sides: 0,
                fences: [],
            }
            regions.push(region);
            traverseRegion(grid, x, y, region, visited);
        }
    }

    const result = regions.reduce((acc, region) => {
        for (let i = 0; i < region.fences.length; i++) {
            const fence = region.fences[i];

            const isHorizontal = fence[0].x === fence[1].x;
            const isVertical = fence[0].y === fence[1].y;

            for (let j = 0; j < region.fences.length; j++) {
                if (i === j) {
                    continue;
                }
                const fence2 = region.fences[j];
                if (isHorizontal && fence[0].x + 1 === fence2[0].x && fence[1].x + 1 === fence2[1].x && fence[0].y === fence2[0].y && fence[1].y === fence2[1].y) {
                    fence2.combined = true;
                    break;
                } else if (isVertical && fence[0].y + 1 === fence2[0].y && fence[1].y + 1 === fence2[1].y && fence[0].x === fence2[0].x && fence[1].x === fence2[1].x) {
                    fence2.combined = true;
                    break;
                }
            }
        }

        region.sides = region.fences.filter(fence => !fence.combined).length;

        return acc + region.area * region.sides;
    }, 0);

    return result;
}

function traverseRegion(grid, x, y, region, visited, oX, oY) {
    if (x < 0 && y < 0 || x < 0 && y >= grid[0].length || x >= grid.length && y < 0 || x >= grid.length && y >= grid[0].length) {
        return;
    }

    if (x < 0 || x >= grid.length || y < 0 || y >= grid[0].length) {
        region.perimeter++;
        const pair = [{x, y}, {x: oX, y: oY}];
        region.fences.push(pair);
        return;
    }

    if (grid[x][y] !== region.type) {
        region.perimeter++;
        const pair = [{x, y}, {x: oX, y: oY}];
        region.fences.push(pair);
        return;
    }

    if (visited[x][y]) {
        return;
    }

    visited[x][y] = region;
    region.area++;

    traverseRegion(grid, x - 1, y, region, visited, x, y);
    traverseRegion(grid, x + 1, y, region, visited, x, y);
    traverseRegion(grid, x, y - 1, region, visited, x, y);
    traverseRegion(grid, x, y + 1, region, visited, x, y);
}
