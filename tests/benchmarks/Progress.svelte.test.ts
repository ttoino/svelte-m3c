import { Progress } from "$lib/index.js";
import { describe } from "vitest";

import { resolveToken, runSpecBenchmark } from "./specBenchmark.js";

// https://m3.material.io/components/progress-indicators/specs
describe("Progress spec benchmark", () => {
    runSpecBenchmark({
        axes: {
            type: ["linear", "circular"],
        },
        buildProps: ({ type }) => ({
            circular: type === "circular",
            shape: "flat",
            value: 50,
        }),
        component: Progress,
        defineAssertions: ({ type }) => {
            if (type === "circular") {
                return [
                    {
                        expected: "48px",
                        name: "width",
                        property: "width",
                    },
                    {
                        expected: "48px",
                        name: "height",
                        property: "height",
                    },
                ];
            }

            return [
                {
                    expected: "4px",
                    name: "container height",
                    property: "height",
                },
                {
                    expected: "4px",
                    name: "track height",
                    property: "height",
                    selector: ":scope > div:nth-child(2)",
                },
                {
                    expected: resolveToken("--color-surface-container-highest"),
                    name: "track color",
                    property: "backgroundColor",
                    selector: ":scope > div:nth-child(2)",
                },
                {
                    expected: "4px",
                    name: "active indicator height",
                    property: "height",
                    selector: ":scope > div:nth-child(1)",
                },
                {
                    expected: resolveToken("--color-primary"),
                    name: "active indicator color",
                    property: "backgroundColor",
                    selector: ":scope > div:nth-child(1)",
                },
            ];
        },
    });
});
