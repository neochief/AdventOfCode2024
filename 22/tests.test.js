import {assert, test} from 'vitest'
import {example1, example2, realInput} from "./input.js";
import {part1, part2, parseInput} from "./code.js";

test('input', () => {
    const secrets = parseInput(example1);
    assert.equal(secrets.length, 4);
    assert.equal(secrets[0], 1);
});

test('part1: example', () => {
    const result = part1(example1);
    assert.equal(result, 37327623n);
});

test('part1: realInput', () => {
    const result = part1(realInput);
    assert.equal(result, 13764677935n);
});

test('part2: example', () => {
    const result = part2(example2);
    assert.equal(result, 23);
});

test('part2: realInput', () => {
    const result = part2(realInput);
    assert.equal(result, 1619);
});
