import {assert, test} from 'vitest'
import {example1, example2, example3, example3_, realInput} from "./input.js";
import {part1, part2, parseInput} from "./code.js";

test('input', () => {
    const { wires, values, zRegisters } = parseInput(example1);
    assert.equal(values.x00, 1);
    assert.equal(values.x01, 1);
    assert.equal(wires.z00.a, 'x00');
    assert.equal(zRegisters.length, 3);
});

test('part1: example1', () => {
    const result = part1(example1);
    assert.equal(result, 4);
});

test('part1: example2', () => {
    const result = part1(example2);
    assert.equal(result, 2024);
});

test('part1: example3', () => {
    const result = part1(example3);
    assert.equal(result, 62);
});

test('part1: realInput', () => {
    const result = part1(realInput);
    assert.equal(result, 49520947122770);
});

test('part2: example', () => {
    const result = part2(example3_, 62);
    assert.equal(result, 'c01,c02,r02,r05,t03,z00,z03,z05');
});

test('part2: realInput', () => {
    const result = part2(realInput, 49521014360658);
    assert.equal(result, 'gjc,gvm,qjj,qsb,wmp,z17,z26,z39');
});
