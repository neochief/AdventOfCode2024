import {assert, test} from 'vitest'
import {example, realInput} from "./input.js";
import {part1, part2, parseInput} from "./code.js";

test('input', () => {
    const array = parseInput(example);
    assert.deepEqual(array, [125, 17]);
});

test('part1: example', () => {
    const result = part1(example, 25);
    assert.equal(result, 55312);
});

test('part1: realInput', () => {
    const result = part1(realInput, 25);
    assert.equal(result, 189547);
});

test('part2: example', () => {
    const result = part2(example, 75);
    assert.equal(result, 65601038650482);
});

test('part2: realInput', () => {
    const result = part2(realInput, 75);
    assert.equal(result, 224577979481346);
});
