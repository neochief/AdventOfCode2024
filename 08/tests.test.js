import {assert, test} from 'vitest'
import {example, example1, realInput} from "./input.js";
import {part1, part2, parseInput} from "./code.js";

test('input', () => {
    const {map, antennas} = parseInput(example);
    assert.equal(map.length, 12);
    assert.equal(map[0].length, 12);
    assert.equal(Object.keys(antennas).length, 2);
});

test('part1: example', () => {
    const result = part1(example);
    assert.equal(result, 14);
});

test('part1: realInput', () => {
    const result = part1(realInput);
    assert.equal(result, 423);
});

test('part2: example1', () => {
    const result = part2(example1);
    assert.equal(result, 9);
});

test('part2: example', () => {
    const result = part2(example);
    assert.equal(result, 34);
});

test('part2: realInput', () => {
    const result = part2(realInput);
    assert.equal(result, 1287);
});



