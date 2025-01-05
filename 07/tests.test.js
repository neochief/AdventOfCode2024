import {assert, test} from 'vitest'
import {example, realInput} from "./input.js";
import {part1, part2, parseInput} from "./code.js";

test('input', () => {
    const equations = parseInput(example);
    assert.equal(equations[0][0], 190);
    assert.equal(equations[0][1], 10);
    assert.equal(equations[0][2], 19);
});

test('part1: example', () => {
    const result = part1(example);
    assert.equal(result, 3749);
});

test('part1: realInput', () => {
    const result = part1(realInput);
    assert.equal(result, 6083020304036);
});

test('part2: example', () => {
    const result = part2(example);
    assert.equal(result, 11387);
});

test('part2: realInput', () => {
    const result = part2(realInput);
    assert.equal(result, 59002246504791);
});



