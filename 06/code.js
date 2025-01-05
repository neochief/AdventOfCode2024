import {realInput} from "./input.js";

if (typeof process !== "undefined" && process.argv[2] === "run") {
    console.log(part2(realInput));
}

export function parseInput(input) {
    const map = input.split('\n').map(x => x.split(''));
    let x, y, direction;
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (['>', '<', '^', 'v'].includes(map[i][j])) {
                x = j;
                y = i;
                direction = map[i][j];
                map[i][j] = '.';
            }
        }
    }
    return {map, x, y, direction};
}

export function part1(input) {
    let {map, x, y, direction} = parseInput(input);

    loop: while (true) {
        let newDirection;
        let dx = 0, dy = 0;
        switch (direction) {
            case '>':
                dx = 1;
                newDirection = 'v';
                break;
            case '<':
                dx = -1;
                newDirection = '^';
                break;
            case '^':
                dy = -1;
                newDirection = '>';
                break;
            case 'v':
                dy = 1;
                newDirection = '<';
                break;
        }
        while (true) {
            map[y][x] = 'X';

            if (x + dx < 0 || x + dx >= map[0].length || y + dy < 0 || y + dy >= map.length) {
                break loop;
            }

            if (map[y + dy][x + dx] === '#') {
                break;
            }

            x += dx;
            y += dy;
        }
        direction = newDirection;
    }

    let sum = 0;
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === 'X') {
                sum++;
            }
        }
    }

    const renderedCopy = JSON.parse(JSON.stringify(map));
    renderedCopy[y][x] = direction;
    const rendered = renderedCopy.map(x => x.join('')).join('\n');

    return [sum, rendered];
}

export function part2(input) {
    let {map, x, y, direction} = parseInput(input);

    let route = part1(input)[1].split('\n').map(x => x.split(''));
    let trajectory = [];
    for (let i = 0; i < route.length; i++) {
        for (let j = 0; j < route[i].length; j++) {
            if (['>', '<', '^', 'v', 'X'].includes(route[i][j]) && (i !== y || j !== x)) {
                trajectory.push([i, j]);
            }
        }
    }

    let sum = 0;

    let mapCopy = JSON.parse(JSON.stringify(map));
    let xCopy = x;
    let yCopy = y;
    let directionCopy = direction;

    let loops = [];

    trajectory.forEach(([ty, tx]) => {

        map = JSON.parse(JSON.stringify(mapCopy));
        map[ty][tx] = 'O';
        x = xCopy;
        y = yCopy;
        direction = directionCopy;

        let hasLoop = false;
        const visited = {};

        loop: while (true) {
            let newDirection;
            let dx = 0, dy = 0;
            switch (direction) {
                case '>':
                    dx = 1;
                    newDirection = 'v';
                    break;
                case '<':
                    dx = -1;
                    newDirection = '^';
                    break;
                case '^':
                    dy = -1;
                    newDirection = '>';
                    break;
                case 'v':
                    dy = 1;
                    newDirection = '<';
                    break;
            }
            while (true) {
                map[y][x] = 'X';

                if (x + dx < 0 || x + dx >= map[0].length || y + dy < 0 || y + dy >= map.length) {
                    break loop;
                }

                if (visited[direction + '/' + (x + dx) + '/' + (y + dy)] !== undefined) {
                    hasLoop = true;
                    sum++;

                    const renderedCopy = JSON.parse(JSON.stringify(map));
                    const rendered = renderedCopy.map(x => x.join('')).join('\n');
                    loops.push(rendered);

                    break loop;
                }

                visited[direction + '/' + x + '/' + y] = true;

                if (map[y + dy][x + dx] === '#' || map[y + dy][x + dx] === 'O') {
                    break;
                }

                x += dx;
                y += dy;
            }
            direction = newDirection;
        }
    });

    return sum;
}
