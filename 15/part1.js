import {parseInput} from "./input.js";

console.log(run());

export function run() {
    let {grid, moves} = parseInput();

    let position;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === '@') {
                position = {x: j, y: i};
                break;
            }
        }
    }

    moves.forEach(move => {
        let moveResult = doMove(grid, position, move);
        grid = moveResult.grid;
        position = moveResult.position;
    });

    let result = 0;
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === 'O') {
                result += y * 100 + x;
            }
        }
    }

    let str = '';
    grid.forEach((row) => {
        str += row.join('') + "\n";
    });

    return result + '\n\n' + str;
}

function doMove(grid, position, direction) {
    let newPosition = {
        x: position.x + direction.x,
        y: position.y + direction.y,
        type: grid[position.y][position.x]
    };

    if (newPosition.x < 0 || newPosition.x >= grid[0].length || newPosition.y < 0 || newPosition.y >= grid.length) {
        return {grid, position, hasMoved: false};
    }

    if (grid[newPosition.y][newPosition.x] === '#') {
        return {grid, position, hasMoved: false};
    }

    if (grid[newPosition.y][newPosition.x] === '.') {
        grid[position.y][position.x] = '.';
        grid[newPosition.y][newPosition.x] = newPosition.type;
        return {grid, position: newPosition, hasMoved: true};
    }

    if (grid[newPosition.y][newPosition.x] === 'O') {
        let result = doMove(grid, newPosition, direction);
        if (result.hasMoved) {
            grid = result.grid;
            grid[position.y][position.x] = '.';
            grid[newPosition.y][newPosition.x] = newPosition.type;
            return {grid, position: newPosition, hasMoved: true};
        }
    }

    return {grid, position, hasMoved: false};
}
