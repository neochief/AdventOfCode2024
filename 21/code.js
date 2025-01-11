import {realInput} from "./input.js";

if (typeof process !== "undefined" && process.argv[2] === "run") {
    console.log(part2(realInput));
}

const Direction = Object.freeze({
    EAST: 'EAST',
    WEST: 'WEST',
    SOUTH: 'SOUTH',
    NORTH: 'NORTH'
});

const CellType = Object.freeze({
    WALL: '#',
    EMPTY: '.',
    START: 'S',
    END: 'E',
});

const kNumeric = `789
456
123
 0A`;
const keypadNumeric = kNumeric.split('\n');
const gridNumeric = kNumeric
    .replace(/[^ \n]/g, '.')
    .replace(/ /g, '#')
    .split('\n')
    .map(row => row.split(''));

const kArrows = ` ^A
<v>`;
const keypadArrows = kArrows.split('\n');
const gridArrows = kArrows
    .replace(/[^ \n]/g, '.')
    .replace(/ /g, '#')
    .split('\n')
    .map(row => row.split(''));


export function part1(input) {
    return run(input, 2);
}

export function part2(input) {
    return run(input, 25);
}

export function run(input, n) {
    const codes = parseInput(input);

    initCache();

    const winners = codes.map(code => {
        const allTrajectoryParts = findSeriesOfTrajectories(keypadNumeric, gridNumeric, code);
        const bestTrajectoryParts = allTrajectoryParts.map(trajectories => bestTrajectoryFromCache(trajectories));

        let result = 0;
        bestTrajectoryParts.forEach(trajectory => {
            for (let i = 0; i < trajectory.length; i++) {
                const startChar = i === 0 ? 'A' : trajectory[i - 1];
                const endChar = trajectory[i];
                result += getLength(cache[startChar + endChar], n - 1);
            }
        });

        return result;
    });

    return winners.reduce((acc, winner, i) => {
        const codeNumber = parseInt(codes[i], 10);
        return acc + (codeNumber * winner);
    }, 0);
}

export function parseInput(input) {
    return input.split('\n');
}

const cache = {};

function initCache() {
    const arrows = ['A', '<', '>', '^', 'v'];

    arrows.forEach(a => {
        arrows.forEach(b => {
            if (a !== b) {
                const {grid, start, end} = makeGrid(keypadArrows, gridArrows, a, b);
                const trajectories = findTrajectories(grid, start, end);
                let best = bestTrajectory(trajectories);
                cache[a + b] = {
                    value: a + b,
                    possible: trajectories,
                    best,
                };
            } else {
                const best = 'A';
                cache[a + b] = {
                    value: a + b,
                    possible: ['A'],
                    best,
                };
            }
        });
    });

    Object.keys(cache).forEach((key) => {
        const item = cache[key];
        item.links = makeLinks(item.best);
    });

    function bestTrajectory(trajectories) {
        function cost(trajectory) {
            let cost = 0;
            for (let i = 0; i < trajectory.length; i++) {
                if (i > 0 && trajectory[i] === trajectory[i - 1]) {
                    // Prioritize going straight.
                    cost += 1;
                } else {
                    // With the rest, prioritize the direction.
                    cost += (i + 1) * ['A', '>', '^', 'v', '<'].indexOf(trajectory[i]);
                }
            }
            return cost;
        }

        trajectories.sort((a, b) => a.length === b.length ? cost(a) - cost(b) : a.length - b.length);
        return trajectories[0];
    }

    function makeLinks(item) {
        let links = [];
        for (let i = 0; i < item.length; i++) {
            const start = i === 0 ? 'A' : item[i - 1];
            const end = item[i];
            links.push(cache[start + end]);
        }
        return links;
    }

    return cache;
}

const cacheLengths = {}

function getLength(item, n) {
    if (cacheLengths[item.value + '/' + n] !== undefined) {
        return cacheLengths[item.value + '/' + n];
    }

    let result = 0;

    if (n === 0) {
        return item.best.length;
    }

    item.links.forEach(link => {
        result += getLength(link, n - 1);
    });

    cacheLengths[item.value + '/' + n] = result;

    return result;
}

function makeGrid(keypad, gridTemplate, startChar, endChar) {
    const grid = JSON.parse(JSON.stringify(gridTemplate));
    let start;
    let end;
    for (let y = 0; y < keypad.length; y++) {
        for (let x = 0; x < keypad[y].length; x++) {
            if (keypad[y][x] === startChar) {
                start = {y, x, c: startChar};
                grid[y][x] = CellType.START;
            }
            if (keypad[y][x] === endChar) {
                end = {y, x, c: endChar};
                grid[y][x] = CellType.END;
            }
        }
    }
    return {grid, start, end};
}

export function findSeriesOfTrajectories(keypad, gridTemplate, code) {
    const results = [];
    for (let i = 0; i < code.length; i++) {
        const startChar = i === 0 ? 'A' : code[i - 1];
        const endChar = code[i];

        const {grid, start, end} = makeGrid(keypad, gridTemplate, startChar, endChar);

        const trajectories = findTrajectories(grid, start, end);

        results.push(trajectories);
    }

    return results;
}

export function findTrajectories(grid, start, end) {
    const tracks = findPaths(grid, start, end);

    function drawPath(track) {
        let char;
        switch (track.d) {
            case Direction.NORTH:
                char = '^';
                break;
            case Direction.SOUTH:
                char = 'v';
                break;
            case Direction.WEST:
                char = '<';
                break;
            case Direction.EAST:
                char = '>';
                break;
            default:
                char = '';
        }
        if (grid[track.y][track.x] === CellType.WALL) {
            throw new Error('Invalid path');
        }

        grid[track.y][track.x] = char;

        const result = [];

        if (!track.prev && !track.alternate) {
            result.push(char);
        } else {

            if (track.prev) {
                const prev = drawPath(track.prev);
                prev.forEach(p => result.push(p + char));
            }

            if (track.alternate) {
                track.alternate.forEach(alt => {
                    const prev = drawPath(alt);
                    prev.forEach(p => result.push(p + char));
                });
            }
        }

        return result;
    }

    let result = [];
    tracks.forEach(track => {
        const results = drawPath(track);
        result = result.concat(results.map(r => r + 'A'));
    });

    return result;
}

export function findPaths(grid, start, end) {
    const visited = new Array(grid.length).fill(0).map(() => new Array(grid[0].length).fill(0));
    for (let y = 0; y < visited.length; y++) {
        for (let x = 0; x < visited[y].length; x++) {
            visited[y][x] = [];
        }
    }

    let winners = [];
    let tracks = [];
    tracks.push({
        y: start.y,
        x: start.x,
        d: undefined,
        price: 0,
        prev: undefined,
    });

    let c = 0;
    while (tracks.length) {
        let allNewTracks = [];
        for (let i = 0; i < tracks.length; i++) {
            const newTracks = traverse(grid, visited, tracks[i], end, winners, c);
            allNewTracks = allNewTracks.concat(newTracks);
        }
        allNewTracks = allNewTracks.filter((track, index, self) => {
            if (track.duplicate) {
                return false;
            }

            const duplicates = self.filter((t) => {
                return t.x === track.x && t.y === track.y && t.d === track.d && t.price === track.price && t !== track
            });

            duplicates.forEach(d => {
                track.alternate = track.alternate || [];
                if (d.prev) {
                    track.alternate.push(d.prev);
                }
                d.duplicate = true;
            });

            return true;
        });
        tracks = allNewTracks;

        c++;
    }

    if (!winners.length) {
        throw new Error('No path found');
    }

    winners = winners.filter(w => w.price === winners[0].price);

    return winners;
}

function traverse(grid, visited, track, end, winners, c) {
    const x = track.x;
    const y = track.y;
    const d = track.d;

    if (x < 0 || x >= grid[0].length || y < 0 || y >= grid.length) {
        return [];
    }

    if (grid[y][x] === CellType.WALL) {
        return [];
    }

    if (findInPath(track, x, y, d)) {
        return [];
    }

    if (visited[y][x].length) {
        const first = visited[y][x].find(t => isSameDirection(t.d, d));

        const isFirst = !first;
        if (isFirst) {
            visited[y][x].push(track);
        } else {
            if (first.price > track.price) {
                visited[y][x] = visited[y][x].filter(t => !isSameDirection(t.d, d));
                visited[y][x].push(track);
            } else if (first.price === track.price) {
                visited[y][x].push(track);
                visited[y][x].forEach(t => {
                    t.alternate = t.alternate || [];
                    t.alternate.push(track);
                    track.alternate = track.alternate || [];
                    track.alternate.push(t);
                });
            } else {
                return [];
            }
        }
    } else {
        visited[y][x].push(track);
    }

    if (x === end.x && y === end.y) {
        winners.push(track);
        return [];
    }

    // Add new tracks.

    const directions = [
        Direction.EAST,
        Direction.WEST,
        Direction.NORTH,
        Direction.SOUTH,
    ]

    const newTracks = [];

    for (let i = 0; i < directions.length; i++) {
        const dir = directions[i];
        const nums = getDirectionNums(dir);

        const ny = y + nums[0];
        const nx = x + nums[1];

        if (nx < 0 || nx >= grid[0].length || ny < 0 || ny >= grid.length) {
            continue;
        }

        if (grid[ny][nx] === CellType.WALL) {
            continue;
        }

        // Don't return, unless there's no other way to go.
        if (isOpposite(dir, d)) {
            continue;
        }

        newTracks.push({y: ny, x: nx, d: dir, price: track.price + 1, prev: track});
    }

    return newTracks;
}

function findInPath(track, x, y, d) {
    if (track.prev === undefined) {
        return false;
    }

    if (track.prev.x === x && track.prev.y === y && isSameDirection(track.prev.d, d)) {
        return true;
    }

    return findInPath(track.prev, x, y, d);
}

function bestTrajectoryFromCache(trajectories) {
    function cost(trajectory) {
        let cost = 0;
        for (let i = 0; i < trajectory.length; i++) {
            const start = i === 0 ? 'A' : trajectory[i - 1];
            const end = trajectory[i];
            cost += getLength(cache[start + end], 1);
        }
        return cost;
    }

    trajectories.sort((a, b) => cost(a) - cost(b));
    return trajectories[0];
}

function getDirectionNums(d) {
    switch (d) {
        case Direction.NORTH:
            return [-1, 0];
        case Direction.SOUTH:
            return [1, 0];
        case Direction.WEST:
            return [0, -1];
        case Direction.EAST:
            return [0, 1];
    }
}

function isOpposite(d1, d2) {
    return d1 === Direction.NORTH && d2 === Direction.SOUTH || d1 === Direction.SOUTH && d2 === Direction.NORTH || d1 === Direction.WEST && d2 === Direction.EAST || d1 === Direction.EAST && d2 === Direction.WEST;
}

function isSameDirection(d1, d2) {
    return d1 === d2;
}

