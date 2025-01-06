import {assert, test} from 'vitest'
import {example1, example2, example3, example4, example5, example6, example7, realInput} from "./input.js";
import {part1, part2, parseInput} from "./code.js";

test('input', () => {
    const {map, starts} = parseInput(example3);
    assert.equal(map.length, 7);
    assert.equal(map[0].length, 7);
    assert.equal(starts.length, 2);
});

test('part1: example1', () => {
    const result = part1(example1);
    assert.equal(result, 2);
});

test('part1: example2', () => {
    const result = part1(example2);
    assert.equal(result, 4);
});

test('part1: example3', () => {
    const result = part1(example3);
    assert.equal(result, 3);
});

test('part1: example4', () => {
    const result = part1(example4);
    assert.equal(result, 36);
});

test('part1: realInput', () => {
    const result = part1(realInput);
    assert.equal(result, 557);
});

test('part2: example5', () => {
    const result = part2(example5);
    assert.equal(result, 3);
});

test('part2: example6', () => {
    const result = part2(example6);
    assert.equal(result, 13);
});

test('part2: example7', () => {
    const result = part2(example7);
    assert.equal(result, 227);
});

test('part2: example8', () => {
    const result = part2(example4);
    assert.equal(result, 81);
});

test('part2: realInput', () => {
    const result = part2(realInput);
    assert.equal(result, 1062);
});
