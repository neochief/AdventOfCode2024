import {realInput} from "./input.js";

if (typeof process !== "undefined" && process.argv[2] === "run") {
    console.log(part2(realInput));
}

export function parseInput(input) {
    const map = input.split('\n').map(x => x.split(''));
    const starts = [];
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === '0') {
                starts.push({x: j, y: i});
            }
        }
    }
    return {map, starts};
}

export function part1(input) {
    const {map, starts} = parseInput(input);

    function walk(x, y, path, visited) {
        if (path.includes(x + '/' + y)) {
            return 0;
        }

        if (map[y][x] !== path.length.toString()) {
            return 0;
        }

        path.push(x + '/' + y);

        if (path.length === 10) {
            if (!visited.includes(x + '/' + y)) {
                visited.push(x + '/' + y);
                return 1;
            } else {
                return 0;
            }
        } else {
            const next = [
                {x: x + 1, y},
                {x: x - 1, y},
                {x, y: y + 1},
                {x, y: y - 1}
            ].filter(n => n.x >= 0 && n.x < map[0].length && n.y >= 0 && n.y < map.length);

            return next.reduce((acc, n) => acc + walk(n.x, n.y, [...path], visited), 0);
        }
    }

    return starts.reduce((acc, start) => {
        return acc + walk(start.x, start.y, [], []);
    }, 0);
}

export function part2(input) {
    const {map, starts} = parseInput(input);

    function walk(x, y, path) {
        if (path.includes(x + '/' + y)) {
            return 0;
        }

        if (map[y][x] !== path.length.toString()) {
            return 0;
        }

        path.push(x + '/' + y);

        if (path.length === 10) {
            // Simply removed the visited filter from part1.
            return 1;
        } else {
            const next = [
                {x: x + 1, y},
                {x: x - 1, y},
                {x, y: y + 1},
                {x, y: y - 1}
            ].filter(n => n.x >= 0 && n.x < map[0].length && n.y >= 0 && n.y < map.length);

            return next.reduce((acc, n) => acc + walk(n.x, n.y, [...path]), 0);
        }
    }

    return starts.reduce((acc, start) => {
        return acc + walk(start.x, start.y, []);
    }, 0);
}
