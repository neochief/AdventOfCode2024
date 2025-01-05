import {assert, test} from 'vitest'
import {example, realInput} from "./input.js";
import {part1, part2, parseInput} from "./code.js";

test('input', () => {
    const {map, x, y, direction} = parseInput(example);
    assert.equal(map.length, 10);
    assert.equal(map[0].length, 10);
    assert.equal(x, 4);
    assert.equal(y, 6);
    assert.equal(direction, '^');
});

test('part1: example', () => {
    const result = part1(example);
    assert.equal(result[0], 41);
});

test('part1: realInput', () => {
    const result = part1(realInput);
    assert.equal(result[0], 4819);
});

test('part2: example', () => {
    const result = part2(example);
    assert.equal(result, 6);
});

test('part2: realInput', () => {
    const result = part2(realInput);
    assert.equal(result, 1796);
});



