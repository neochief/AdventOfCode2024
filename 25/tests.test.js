import {assert, test} from 'vitest'
import {example, realInput} from "./input.js";
import {part1, part2, parseInput} from "./code.js";

test('input', () => {
    const { locks, keys } = parseInput(example);
    assert.equal(locks.length, 2);
    assert.equal(keys.length, 3);
    assert.equal(locks[0].join(','), '0,5,3,4,3');
});

test('part1: example', () => {
    const result = part1(example);
    assert.equal(result, 3);
});

test('part1: realInput', () => {
    const result = part1(realInput);
    assert.equal(result, 3136);
});

test('part2: example', () => {
    const result = part2(example);
    assert.equal(result, 'co,de,ka,ta');
});

test('part2: realInput', () => {
    const result = part2(realInput);
    assert.equal(result, 'gt,ha,ir,jn,jq,kb,lr,lt,nl,oj,pp,qh,vy');
});
