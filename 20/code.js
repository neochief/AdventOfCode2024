import {example, realInput} from "./input.js";

const CellType = Object.freeze({
    WALL: '#',
    EMPTY: '.',
    START: 'S',
    END: 'E',
    SEAT: 'O',
});

const DEBUG = false;

if (typeof process !== "undefined" && process.argv[2] === "run") {
    console.log(part1(example));
}

export function part1(input) {
    const {grid, start, end} = parseInput(input);
    const winner = findPath(grid, start, end);
    const tracks = trackToArray(winner)

    const results = [];
    for (let s = 0; s < tracks.length; s++) {
        loop: for (let e = tracks.length - 1; e >= 0; e--) {
            const point1 = tracks[s];
            const point2 = tracks[e];

            let distance = grid.length * grid[0].length;
            const points = [];
            if (point1.x === point2.x) {
                distance = Math.abs(point1.y - point2.y);
                if (distance > 1 && distance <= 2) {
                    const min = Math.min(point1.y, point2.y);
                    const max = Math.max(point1.y, point2.y);
                    for (let i = min + 1; i <= max - 1; i++) {
                        if (tracks.find(t => t.y === i && t.x === point1.x)) {
                            continue loop;
                        }
                        points.push({y: i, x: point1.x});
                    }
                }
            } else if (point1.y === point2.y) {
                distance = Math.abs(point1.x - point2.x);
                if (distance > 1 && distance <= 2) {
                    const min = Math.min(point1.x, point2.x);
                    const max = Math.max(point1.x, point2.x);
                    for (let i = min + 1; i <= max - 1; i++) {
                        if (tracks.find(t => t.x === i && t.y === point1.y)) {
                            continue loop;
                        }
                        points.push({y: point1.y, x: i});
                    }
                }
            }

            if (points.length) {
                let newTrack = tracks.slice(0, s + 1);
                newTrack = newTrack.concat(tracks.slice(e));

                const newTrackLength = s + distance + (tracks.length - e);
                if (newTrackLength > tracks.length) {
                    continue;
                }

                const diff = tracks.length - newTrackLength;

                results[diff] = results[diff] || 0;
                results[diff]++;

                const render = JSON.parse(JSON.stringify(grid));
                for (let k = tracks.length - 1; k >= 0; k--) {
                    render[tracks[k].y][tracks[k].x] = render[tracks[k].y][tracks[k].x] === '.' ? 'X' : render[tracks[k].y][tracks[k].x];
                }
                for (let k = newTrack.length - 1; k >= 0; k--) {
                    render[newTrack[k].y][newTrack[k].x] = 'O';
                }
                for (let k = points.length - 1; k >= 0; k--) {
                    render[points[k].y][points[k].x] = '@';
                }
                render[start.y][start.x] = 'S';
                render[end.y][end.x] = 'E';
            }
        }
    }

    return results.reduce((acc, r, i) => acc + (i >= 100 ? r : 0), 0);
}

export function part2(input) {

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
    for (let i = 0; i < visited.length; i++) {
        for (let j = 0; j < visited[i].length; j++) {
            visited[i][j] = [];
        }
    }

    let winners = [];
    let tracks = [];
    tracks.push({
        y: start.y,
        x: start.x,
        prev: undefined,
    });

    let c = 0;
    while (tracks.length) {
        let allNewTracks = [];
        for (let i = 0; i < tracks.length; i++) {
            const newTracks = traverse(grid, visited, tracks[i], end, winners, c);
            allNewTracks = allNewTracks.concat(newTracks);
        }
        tracks = allNewTracks;

        if (DEBUG) {
            console.log(c, tracks.length);
            console.log(c, tracks.length, ": ", tracks.map(t => t.x + "/" + t.y).join(' '), winners.length);
            console.log(renderGrid(grid, tracks, visited));
        }

        c++;
    }

    if (!winners.length) {
        throw new Error('No path found');
    }

    const winner = winners[0];

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

    if (findInPath(track, x, y, 0)) {
        return [];
    }

    if (visited[y][x].length) {
        return [];
    } else {
        visited[y][x].push(track);
    }

    if (x === end.x && y === end.y) {
        winners.push(track);
        return [];
    }

    // Add new tracks.

    const directions = [
        [0, -1],
        [1, 0],
        [0, 1],
        [-1, 0],
    ]

    const newTracks = [];

    for (let i = 0; i < directions.length; i++) {
        const nums = directions[i];

        const nx = x + nums[0];
        const ny = y + nums[1];

        if (nx < 0 || nx >= grid.length || ny < 0 || ny >= grid[0].length) {
            continue;
        }

        if (grid[ny][nx] === CellType.WALL) {
            continue;
        }

        if (findInPath(track, nx, ny, 0)) {
            continue;
        }

        newTracks.push({y: ny, x: nx, prev: track});
    }

    return newTracks;
}

function findInPath(track, x, y, i) {
    let prev = track.prev;
    while (prev !== undefined) {
        if (prev.x === x && prev.y === y) {
            return true;
        }
        prev = prev.prev;
    }
    return false;
}

function trackToArray(track) {
    const result = [];
    result.push(track);
    let prev = track.prev;
    while (prev !== undefined) {
        result.push(prev);
        prev = prev.prev;
    }
    return result;
}

function renderGrid(grid, tracks) {
    const render = JSON.parse(JSON.stringify(grid));
    if (tracks.length) {
        for (let k = tracks.length - 1; k >= 0; k--) {
            render[tracks[k].y][tracks[k].x] = render[tracks[k].y][tracks[k].x] === '.' ? 'X' : render[tracks[k].y][tracks[k].x];
        }
    }
    return render.map(s => s.join('')).join('\n');
}
