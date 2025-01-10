import {simple0} from "./input.js";

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
    SEAT: 'O',
});

if (typeof process !== "undefined" && process.argv[2] === "run") {
    console.log(part1(simple0));
}

const DEBUG = false;

export function part1(input) {
    const {grid, start, end} = parseInput(input);

    const winner = findPath(grid, start, end);

    const result = winner.price;

    function drawPath(track) {
        let char = '?';
        switch (track.d) {
            case Direction.NORTH:
                char = '↑';
                break;
            case Direction.SOUTH:
                char = '↓';
                break;
            case Direction.WEST:
                char = '←';
                break;
            case Direction.EAST:
                char = '→';
                break;
            default:
                char = '?';
        }
        if (grid[track.y][track.x] === CellType.WALL) {
            throw new Error('Invalid path');
        }

        grid[track.y][track.x] = char;

        if (track.prev) {
            drawPath(track.prev);
        }
    }

    drawPath(winner);

    const str = grid.map(s => s.join('')).join('\n');

    if (DEBUG) {
        console.log(result);
        console.log(str);
    }

    return [result, str];
}

export function part2(input) {
    const {grid, start, end} = parseInput(input);

    const winner = findPath(grid, start, end);

    let result = 0;

    function drawPath(track) {
        if (grid[track.y][track.x] !== CellType.SEAT) {
            grid[track.y][track.x] = CellType.SEAT;
            result++;
        }

        if (track.prev) {
            drawPath(track.prev);
        }
        if (track.alternate) {
            track.alternate.forEach(t => {
                drawPath(t);
            });
        }
    }

    drawPath(winner);

    const str = grid.map(s => s.join('')).join('\n');

    if (DEBUG) {
        console.log(result);
        console.log(str);
    }

    return [result, str];
}

function parseInput(input) {
    const grid = input.split('\n').map(line => line.split(''));

    let start, end;
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === CellType.START) {
                start = {
                    y,
                    x,
                };
            }
            if (grid[y][x] === CellType.END) {
                end = {
                    y,
                    x,
                };
            }
        }
    }

    return {grid, start, end};
}

function findPath(grid, start, end) {
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
        d: Direction.EAST,
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

        if (DEBUG) {
            console.log(c, tracks.length);
            console.log(c, tracks.length, ": ", tracks.map(t => t.x + "/" + t.y + '$' + t.price).join(' '), winners.length);
            console.log(renderGrid(grid, visited, tracks));
        }

        c++;
    }

    if (!winners.length) {
        throw new Error('No path found');
    }

    const winner = winners.sort((a, b) => a.price - b.price)[0];

    return winner;
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
        Direction.WEST,
        Direction.NORTH,
        Direction.SOUTH,
        Direction.EAST,
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

        newTracks.push({y: ny, x: nx, d: dir, price: track.price + getPrice(dir, d), prev: track});
    }

    // Return only if there's no other way to go.
    if (c === 0) {
        const dir = getOppositeDirection(d);
        const nums = getDirectionNums(dir);
        const ny = y + nums[0];
        const nx = x + nums[1];
        newTracks.push({y: ny, x: nx, d: dir, price: track.price + getPrice(dir, d), prev: track});
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

function renderGrid(grid, visited, tracks) {
    const render = _(grid);
    if (visited) {
        for (let y = 0; y < visited.length; y++) {
            for (let x = 0; x < visited[y].length; x++) {
                render[y][x] = render[y][x] === '.' ? (visited[y][x].length ? 'O' : render[y][x]) : render[y][x];
            }
        }
    }
    if (tracks.length) {
        for (let k = tracks.length - 1; k >= 0; k--) {
            render[tracks[k].y][tracks[k].x] = render[tracks[k].y][tracks[k].x] === '.' ? 'X' : render[tracks[k].y][tracks[k].x];
        }
    }
    return render.map(s => s.join('')).join('\n');
}

function _(v) {
    return JSON.parse(JSON.stringify(v));
}

function getPrice(oldD, newD) {
    if (isSameDirection(oldD, newD)) {
        return 1;
    } else if (isOpposite(oldD, newD)) {
        return 2001;
    } else {
        return 1001;
    }
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

function getOppositeDirection(d) {
    switch (d) {
        case Direction.NORTH:
            return Direction.SOUTH;
        case Direction.SOUTH:
            return Direction.NORTH;
        case Direction.WEST:
            return Direction.EAST;
        case Direction.EAST:
            return Direction.WEST;
    }
}

function isOpposite(d1, d2) {
    return d1 === Direction.NORTH && d2 === Direction.SOUTH || d1 === Direction.SOUTH && d2 === Direction.NORTH || d1 === Direction.WEST && d2 === Direction.EAST || d1 === Direction.EAST && d2 === Direction.WEST;
}

function isSameDirection(d1, d2) {
    return d1 === d2;
}

