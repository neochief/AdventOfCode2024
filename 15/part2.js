import {parseInput} from "./input.js";

console.log(run());

export function run() {
    let {grid, moves} = parseInput();

    let wideGrid = [];
    for (let y = 0; y < grid.length; y++) {
        wideGrid.push([]);
        for (let x = 0; x < grid[y].length; x++) {
            switch (grid[y][x]) {
                case '.':
                    wideGrid[y].push('.', '.');
                    break;
                case '#':
                    wideGrid[y].push('#', '#');
                    break;
                case 'O':
                    wideGrid[y].push('[', ']');
                    break;
                case '@':
                    wideGrid[y].push('@', '.');
                    break;
            }
        }
    }
    grid = wideGrid;

    let position;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === '@') {
                position = {x: j, y: i};
                break;
            }
        }
    }

    let counter = 0;
    moves.forEach(move => {
        let moveResult = doMove(grid, [position], move);
        grid = moveResult.grid;
        position = moveResult.positions[0];
        counter++;
    });

    let result = 0;
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === '[') {
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

function doMove(grid, positions, direction) {
    let newPositions = positions.map(position => {
        return {
            x: position.x + direction.x,
            y: position.y + direction.y,
            type: grid[position.y][position.x],
        };
    });

    for (let i = 0; i < newPositions.length; i++) {
        let newPosition = newPositions[i];
        if (newPosition.x < 0 || newPosition.x >= grid[0].length || newPosition.y < 0 || newPosition.y >= grid.length) {
            return {grid, positions, hasMoved: false};
        }
    }

    for (let i = 0; i < newPositions.length; i++) {
        let newPosition = newPositions[i];
        if (grid[newPosition.y][newPosition.x] === '#') {
            return {grid, positions, hasMoved: false};
        }
    }

    let canMove = [];
    for (let i = 0; i < newPositions.length; i++) {
        let newPosition = newPositions[i];
        canMove[i] = grid[newPosition.y][newPosition.x] === '.';
        canMove[i] = canMove[i] || positions.some(position => position.x === newPosition.x && position.y === newPosition.y);
    }
    if (canMove.every(canMove => canMove)) {
        positions.forEach((position, i) => {
            grid[position.y][position.x] = '.';
        });
        newPositions.forEach((newPosition, i) => {
            grid[newPosition.y][newPosition.x] = newPosition.type;
        });
        return {grid, positions: newPositions, hasMoved: true};
    }

    canMove = [];
    const gridBackup = JSON.parse(JSON.stringify(grid));
    for (let i = 0; i < newPositions.length; i++) {
        let newPosition = newPositions[i];
        let result;
        if (!direction.x) {
            let boxPositions;
            if (grid[newPosition.y][newPosition.x] === '[') {
                boxPositions = [newPosition, {x: newPosition.x + 1, y: newPosition.y}];
            } else if (grid[newPosition.y][newPosition.x] === ']') {
                boxPositions = [{x: newPosition.x - 1, y: newPosition.y}, newPosition];
            }
            if (boxPositions) {
                result = doMove(grid, boxPositions, direction);
            }
        } else if (!direction.y) {
            result = doMove(grid, newPositions, direction);
        }
        canMove[i] = (result && result.hasMoved) || grid[newPosition.y][newPosition.x] === '.';
    }
    if (canMove.every(canMove => canMove)) {
        positions.forEach((position, i) => {
            grid[position.y][position.x] = '.';
        });
        newPositions.forEach((newPosition, i) => {
            grid[newPosition.y][newPosition.x] = newPosition.type;
        });
        return {grid, positions: newPositions, hasMoved: true};
    } else {
        grid = gridBackup;
    }

    return {grid, positions, hasMoved: false};
}
