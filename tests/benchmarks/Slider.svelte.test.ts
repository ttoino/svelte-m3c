import { Slider } from "$lib/index.js";
import { describe } from "vitest";

import {
    resolveToken,
    runSpecBenchmark,
    type StyleAssertion,
    withOpacity,
} from "./specBenchmark.js";

// https://m3.material.io/components/sliders/specs
describe("Slider spec benchmark", () => {
    runSpecBenchmark({
        axes: {
            state: ["enabled", "disabled"],
        },
        buildProps: ({ state }) => ({
            disabled: state === "disabled",
            value: [50],
        }),
        component: Slider,
        defineAssertions: ({ state }) => {
            const disabled = state === "disabled";
            const assertions: StyleAssertion[] = [
                {
                    expected: "4px",
                    name: "active track height",
                    property: "height",
                    selector: ":scope > span > span:first-child",
                },
                {
                    expected: "4px",
                    name: "inactive track height",
                    property: "height",
                    selector: ":scope > span > span:last-child",
                },
            ];

            if (disabled) {
                assertions.push({
                    expected: withOpacity(
                        resolveToken("--color-on-surface"),
                        0.38,
                    ),
                    name: "active track color",
                    property: "backgroundColor",
                    selector: ":scope > span > span:first-child",
                });
                assertions.push({
                    expected: withOpacity(
                        resolveToken("--color-on-surface"),
                        0.12,
                    ),
                    name: "inactive track color",
                    property: "backgroundColor",
                    selector: ":scope > span > span:last-child",
                });
                assertions.push({
                    expected: withOpacity(
                        resolveToken("--color-on-surface"),
                        0.38,
                    ),
                    name: "thumb color",
                    property: "backgroundColor",
                    selector: '[role="slider"]',
                });
            } else {
                assertions.push({
                    expected: resolveToken("--color-primary"),
                    name: "active track color",
                    property: "backgroundColor",
                    selector: ":scope > span > span:first-child",
                });
                assertions.push({
                    expected: resolveToken("--color-surface-container-highest"),
                    name: "inactive track color",
                    property: "backgroundColor",
                    selector: ":scope > span > span:last-child",
                });
                assertions.push({
                    expected: resolveToken("--color-primary"),
                    name: "thumb color",
                    property: "backgroundColor",
                    selector: '[role="slider"]',
                });
            }

            return assertions;
        },
    });
});
