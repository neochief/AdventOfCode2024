import {realInput} from "./input.js";

if (typeof process !== "undefined" && process.argv[2] === "run") {
    console.log(part2(realInput));
}

export function part1(input) {
    const {patterns, designs} = parseInput(input);

    let possibleDesigns = 0;
    const cache = {};

    for (let i = 0; i < designs.length; i++) {
        const design = designs[i];
        possibleDesigns += !!dive(design, patterns, cache);
    }

    return possibleDesigns;
}

export function part2(input) {
    const {patterns, designs} = parseInput(input);

    let possibleDesigns = 0;
    const cache = {};

    for (let i = 0; i < designs.length; i++) {
        const design = designs[i];
        possibleDesigns += dive(design, patterns, cache);
    }

    return possibleDesigns;
}

export function parseInput(input) {
    const [rawPatterns, rawDesigns] = input.trim().split("\n\n");
    return {
        patterns: rawPatterns.split(", "),
        designs: rawDesigns.split("\n")
    };
}

function dive(design, patterns, cache) {
    if (cache[design] !== undefined) {
        return cache[design];
    }

    let result = 0;

    for (let i = 0; i < patterns.length; i++) {
        const pattern = patterns[i];

        if (design === pattern) {
            result++;
            continue;
        }

        if (design.startsWith(pattern)) {
            const newDesign = design.slice(pattern.length);
            result += dive(newDesign, patterns, cache);
        }
    }

    cache[design] = result;

    return result;
}


// This is someone else's solution that doesn't even use cache.
// And works faster than mine, haha!
// https://github.com/Joxter/advent-of-code/blob/master/2024/js/day19.js#L128
export function part2_(inp) {
    let [towels, stripes] = inp.split("\n\n");

    towels = towels.split(", ");
    stripes = stripes.split("\n");

    return stripes
        .map((str) => {
            return possible(str, towels);
        })
        .reduce((a, b) => a + b, 0);

    function possible(str, towels) {
        let arr = Array(str.length + 1).fill(0);

        for (const towel of towels) {
            if (str.startsWith(towel)) {
                arr[towel.length]++;
            }
        }

        arr.forEach((v, i) => {
            if (v > 0) {
                for (const towel of towels) {
                    if (str.startsWith(towel, i)) {
                        arr[towel.length + i] += v;
                    }
                }
            }
        });

        return arr.at(-1);
    }
}

