import { Divider } from "$lib/index.js";
import { describe } from "vitest";

import { resolveToken, runSpecBenchmark } from "./specBenchmark.js";

// https://m3.material.io/components/dividers/specs
describe("Divider spec benchmark", () => {
    runSpecBenchmark({
        axes: {
            variant: ["full-width"],
        },
        buildProps: () => ({}),
        component: Divider,
        defineAssertions: () => [
            {
                expected: "1px",
                name: "height",
                property: "height",
            },
            {
                expected: "0px",
                name: "border-width",
                property: "borderBottomWidth",
            },
            {
                expected: resolveToken("--color-outline-variant"),
                name: "background",
                property: "backgroundColor",
            },
        ],
    });
});
