import {assert, test} from 'vitest'
import {example, realInput} from "./input.js";
import {part1, part2, parseInput} from "./code.js";

test('input', () => {
    const {ordering, updates} = parseInput(example);
    assert.equal(ordering.length, 21);
    assert.equal(updates.length, 6);
});

test('part1: example', () => {
    const result = part1(example);
    assert.equal(result, 143);
});

test('part1: realInput', () => {
    const result = part1(realInput);
    assert.equal(result, 5747);
});

test('part2: example', () => {
    const result = part2(example);
    assert.equal(result, 123);
});

test('part2: realInput', () => {
    const result = part2(realInput);
    assert.equal(result, 5502);
});



