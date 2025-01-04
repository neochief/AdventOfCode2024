import {assert, test} from 'vitest'
import {example, example2, realInput} from "./input.js";
import {parseInput, part1, part2, part2_} from "./code.js";

test('input', () => {
    const {patterns, designs} = parseInput(example);
    assert.equal(patterns.length, 8);
    assert.equal(patterns[0], 'r');
    assert.equal(designs.length, 8);
    assert.equal(designs[0], 'brwrr');
});

test('part1: example', () => {
    assert.equal(part1(example), 6);
});

test('part1: realInput', () => {
    assert.equal(part1(realInput), 283);
});

test('part2: example', () => {
    assert.equal(part2(example), 16);
});

test('part2: realInput', () => {
    assert.equal(part2(realInput), 615388132411142);
});