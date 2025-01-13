import {example, realInput} from "./input.js";

if (typeof process !== "undefined" && process.argv[2] === "run") {
    console.log(part2(realInput));
}

export function part1(input) {
    const pairs = parseInput(input);

    const result = networks(pairs, 3)

    const networksWithT = result.filter(x => /(^t|,t)/.test(x));

    return networksWithT.length;
}

export function part2(input) {
    const pairs = parseInput(input);

    const result = networks(pairs);

    result.sort((a, b) => b.length - a.length);

    return result[0].join(',');
}

export function networks(pairs, limit) {
    const computers = {};
    pairs.forEach(([a, b]) => {
        computers[a] = computers[a] || {name: a, network: [a]};
        computers[b] = computers[b] || {name: b, network: [b]};
        computers[a].network.push(b);
        computers[b].network.push(a);
    });
    Object.keys(computers).forEach(name => {
        computers[name].network.sort();
    });

    function traverse(current, results, network = [], limit) {
        if (limit && network.length >= limit) {
            return;
        }

        if (!network.every(x => computers[x].network.includes(current))) {
            return;
        }

        const newBase = [...network, current];

        const point = computers[current].network.indexOf(current);
        for (let i = point + 1; i < computers[current].network.length; i++) {
            traverse(computers[current].network[i], results, newBase, limit);
        }

        if (newBase.length > 2) {
            if (!results.some(x => newBase.every(y => x.includes(y)))) {
                results.push(newBase);
            }
        }
    }

    let allRoutes = [];
    const allComps = Object.keys(computers);
    allComps.sort();
    allComps.forEach(name => {
        traverse(name, allRoutes, [], limit);
    });

    return allRoutes;
}

export function parseInput(input) {
    const result = input.split('\n').map(line => {
        return line.split('-');
    }).map(pair => {
        pair.sort();
        return pair;
    });

    result.sort((a, b) => a[0] !== b[0] ? a[0].localeCompare(b[0]) : a[1].localeCompare(b[1]));

    return result;
}