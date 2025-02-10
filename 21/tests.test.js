import {assert, test} from 'vitest'
import {ev, example, realInput} from "./input.js";
import {part1, part2, parseInput, bestTrajectory} from "./code.js";

test('input', () => {
    const codes = parseInput(example);
    assert.equal(codes.length, 5);
    assert.equal(codes[0], '029A');
});

test('part1: example', () => {
    const result = part1(example);
    assert.equal(result, 126384);
});

test('part1: realInput', () => {
    const result = part1(realInput);
    assert.equal(result, 219366);
});

test('part2: example', () => {
    const result = part2(example);
    assert.equal(result, 154154076501218);
});

test('part2: realInput', () => {
    const result = part2(realInput);
    assert.equal(result, 271631192020464);
});

test('part2: ev', () => {
    const result = part2(ev);
    assert.equal(result, 246810588779586);
});
