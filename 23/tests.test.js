import {assert, test} from 'vitest'
import {example, realInput} from "./input.js";
import {part1, part2, parseInput} from "./code.js";

test('input', () => {
    const pairs = parseInput(example);
    assert.equal(pairs.length, 32);
    assert.equal(pairs[0][0], 'kh');
});

test('part1: example', () => {
    const result = part1(example);
    assert.equal(result, 7);
});

test('part1: realInput', () => {
    const result = part1(realInput);
    assert.equal(result, 1423);
});

test('part2: example', () => {
    const result = part2(example);
    assert.equal(result, 'co,de,ka,ta');
});

test('part2: realInput', () => {
    const result = part2(realInput);
    assert.equal(result, 'gt,ha,ir,jn,jq,kb,lr,lt,nl,oj,pp,qh,vy');
});
