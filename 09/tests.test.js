import {assert, test} from 'vitest'
import {example, realInput} from "./input.js";
import {part1, part2, parseInput} from "./code.js";

test('input', () => {
    const array = parseInput(example);
    assert.deepEqual(array, [2, 3, 3, 3, 1, 3, 3, 1, 2, 1, 4, 1, 4, 1, 3, 1, 4, 0, 2]);
});

test('part1: example', () => {
    const result = part1(example);
    assert.equal(result, 1928);
});

test('part1: realInput', () => {
    const result = part1(realInput);
    assert.equal(result, 6320029754031);
});

test('part2: example1', () => {
    const result = part2(example);
    assert.equal(result, 2858);
});

test('part2: realInput', () => {
    const result = part2(realInput);
    assert.equal(result, 6347435485773);
});



