import {example, realInput} from "./input.js";

if (typeof process !== "undefined" && process.argv[2] === "run") {
    console.log(part2(realInput));
}

export function part1(input) {
    const {wires, values, zRegisters} = parseInput(input);

    return run(wires, values, zRegisters);
}

export function part2(input, sum) {
    const {wires, values, zRegisters} = parseInput(input);

    const swaps = [];
    loop: for (let i = 0; i < zRegisters.length; i++) {
        if (!checkIteration(wires, i, zRegisters.length)) {
            const swappingCandidates = Object.keys(wires).filter((wire) => !wires[wire].role);
            for (let x = 0; x < swappingCandidates.length; x++) {
                for (let y = x + 1; y < swappingCandidates.length; y++) {
                    swap(wires, swappingCandidates[x], swappingCandidates[y]);
                    const result = checkIteration(wires, i, zRegisters.length);
                    if (result) {
                        swaps.push([swappingCandidates[x], swappingCandidates[y]]);
                        continue loop;
                    } else {
                        swap(wires, swappingCandidates[y], swappingCandidates[x]);
                    }
                }
            }
        }
    }

    if (run(wires, values, zRegisters) !== sum) {
        throw new Error('Incorrect result!');
    }

    if (!swaps.length) {
        throw new Error('No swaps necessary!');
    }

    const result = swaps.flat();
    result.sort();

    return result.join(',');
}

export function parseInput(input) {
    const [rawValues, rawWires] = input.split('\n\n');

    const wires = {};
    rawWires.split('\n').map((line) => {
        const matches = line.match(/^(?<a>[a-z0-9]{3}) (?<op>OR|AND|XOR) (?<b>[a-z0-9]{3}) -> (?<c>[a-z0-9]{3})$/);
        wires[matches.groups.c] = {
            a: matches.groups.a,
            op: matches.groups.op,
            b: matches.groups.b,
            c: matches.groups.c,
        }
    }, {});

    const values = {};
    rawValues.split('\n').forEach((line) => {
        const matches = line.match(/^(?<a>[a-z0-9]{3}): (?<v>[0,1])$/);
        values[matches.groups.a] = Number(matches.groups.v);
    }, {});

    const zRegisters = Object.keys(wires).filter((wire) => wire.startsWith('z'));
    zRegisters.sort((a, b) => b.localeCompare(a));

    return {wires, values, zRegisters};
}

function run(wires, values, zRegisters) {
    function r(wire) {
        if (values[wire] !== undefined) {
            return values[wire];
        }

        const gate = wires[wire];

        switch (gate.op) {
            case 'AND':
                return r(gate.a) & r(gate.b);
            case 'OR':
                return r(gate.a) | r(gate.b);
            case 'XOR':
                return r(gate.a) ^ r(gate.b);
        }
    }

    const binary = zRegisters.reduce((binary, register) => {
        return binary + r(register, values, wires);
    }, '');

    return parseInt(binary, 2);
}

function checkIteration(wires, i, stop) {
    if (i === 0) {
        if (correct('x00 XOR y00 -> z00', wires)) {
            wires['z00'].role = 'z00';
            return true;
        } else {
            return false;
        }
    } else {
        const _i = i.toString().padStart(2, '0');

        let t, z, r, l, c, cPrev, tPrev;

        if (i === 1) {
            c = find('x00 AND y00', wires);
        } else {
            const __i = (i - 1).toString().padStart(2, '0');
            tPrev = Object.keys(wires).find((wire) => (wires[wire].role === `t${__i}`));
            cPrev = Object.keys(wires).find((wire) => (wires[wire].role === `c${__i}`));

            r = find(`${tPrev} AND ${cPrev}`, wires);
            l = find(`x${__i} AND y${__i}`, wires);
            c = find(`${l} OR ${r}`, wires);
        }

        if (i === stop - 1) {
            z = c;
        } else {
            t = find(`x${_i} XOR y${_i}`, wires);
            z = find(`${t} XOR ${c}`, wires);
        }

        if (z === `z${_i}`) {
            if (i === stop - 1) {
                wires[z].role = `z${_i}`;
            } else {
                wires[t].role = `t${_i}`;
                wires[z].role = `z${_i}`;
                wires[c].role = `c${_i}`;
            }
            if (r) {
                wires[r].role = `r${_i}`;
            }
            if (l) {
                wires[l].role = `l${_i}`;
            }
            return true;
        } else {
            return false;
        }
    }
}

function correct(record, wires) {
    const {x, op, y, z} = record.match(/^(?<x>[a-z0-9]{3}) (?<op>OR|AND|XOR) (?<y>[a-z0-9]{3}) -> (?<z>[a-z0-9]{3})$/).groups;
    return wires[z].op === op && (wires[z].a === x && wires[z].b === y || wires[z].a === y && wires[z].b === x);
}

function find(record, wires) {
    const {x, op, y} = record.match(/^(?<x>[a-z0-9]{3}) (?<op>OR|AND|XOR) (?<y>[a-z0-9]{3})/).groups;
    return Object.keys(wires).find((wire) => {
        return wires[wire].op === op && (wires[wire].a === x && wires[wire].b === y || wires[wire].a === y && wires[wire].b === x);
    });
}

function swap(wires, a, b) {
    const temp = wires[a];
    wires[a] = wires[b];
    wires[b] = temp;
    wires[a].c = a;
    wires[b].c = b;
}
