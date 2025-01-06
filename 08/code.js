import {realInput} from "./input.js";

if (typeof process !== "undefined" && process.argv[2] === "run") {
    console.log(part2(realInput));
}

export function parseInput(input) {
    const map = input.split('\n').map(x => x.split(''));
    const antennas = {};
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] !== '.') {
                antennas[map[i][j]] = antennas[map[i][j]] || [];
                antennas[map[i][j]].push({x: j, y: i});
            }
        }
    }
    return {map, antennas};
}

export function part1(input) {
    const {map, antennas} = parseInput(input);

    const antennaTypes = Object.keys(antennas);
    antennaTypes.forEach((antennaType, index) => {
        for (let i = 0; i < antennas[antennaType].length; i++) {
            for (let j = i + 1; j < antennas[antennaType].length; j++) {
                const antenna1 = antennas[antennaType][i];
                const antenna2 = antennas[antennaType][j];

                const dx = antenna1.x - antenna2.x;
                const dy = antenna1.y - antenna2.y;

                const mirror1 = {x: antenna1.x + dx, y: antenna1.y + dy};
                if (mirror1.y >= 0 && mirror1.y < map.length && mirror1.x >= 0 && mirror1.x < map[0].length) {
                    map[mirror1.y][mirror1.x] = '#';
                }

                const mirror2 = {x: antenna2.x + -1 * dx, y: antenna2.y + -1 * dy};
                if (mirror2.y >= 0 && mirror2.y < map.length && mirror2.x >= 0 && mirror2.x < map[0].length) {
                    map[mirror2.y][mirror2.x] = '#';
                }
            }
        }
    });

    let result = 0;
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === '#') {
                result++;
            }
        }
    }

    return result;
}

export function part2(input) {
    const {map, antennas} = parseInput(input);

    const antennaTypes = Object.keys(antennas);
    antennaTypes.forEach((antennaType, index) => {
        for (let i = 0; i < antennas[antennaType].length; i++) {
            for (let j = i + 1; j < antennas[antennaType].length; j++) {
                const antenna1 = antennas[antennaType][i];
                const antenna2 = antennas[antennaType][j];

                const dx = antenna1.x - antenna2.x;
                const dy = antenna1.y - antenna2.y;

                let mx1 = antenna1.x;
                let my1 = antenna1.y;
                while (mx1 >= 0 && mx1 < map[0].length && my1 >= 0 && my1 < map.length) {
                    map[my1][mx1] = '#';
                    mx1 += dx;
                    my1 += dy;
                }
                map[antenna1.y][antenna1.x] = '#';

                let mx2 = antenna2.x;
                let my2 = antenna2.y;
                while (mx2 >= 0 && mx2 < map[0].length && my2 >= 0 && my2 < map.length) {
                    map[my2][mx2] = '#';
                    mx2 += -1 * dx;
                    my2 += -1 * dy;
                }
                map[antenna2.y][antenna2.x] = '#'
            }
        }
    });

    let result = 0;
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === '#') {
                result++;
            }
        }
    }

    return result;
}
