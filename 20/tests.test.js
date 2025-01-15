import {assert, test} from 'vitest'
import {example, realInput} from "./input.js";
import {part2} from "./code2.js";
import {part1, parseInput} from "./code.js";


test('part1: example', () => {
    assert.equal(part1(example), 0);
});

test('part1: realInput', () => {
    assert.equal(part1(realInput), 1497);
});

test('part2: example', () => {
    assert.equal(part2(example), 0);
});

test('part2: realInput', () => {
    assert.equal(part2(realInput), 1030809);
});