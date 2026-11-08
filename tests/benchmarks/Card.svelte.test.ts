import { Card } from "$lib/index.js";
import { createRawSnippet } from "svelte";
import { describe } from "vitest";

import {
    resolveToken,
    runSpecBenchmark,
    type StyleAssertion,
} from "./specBenchmark.js";

const cardContent = createRawSnippet(() => ({
    render: () => "<p>Card content</p>",
    setup() {},
}));

// https://m3.material.io/components/cards/specs
describe("Card spec benchmark", () => {
    runSpecBenchmark({
        axes: {
            variant: ["elevated", "filled", "outlined"],
        },
        buildProps: ({ variant }) => ({
            children: cardContent,
            variant,
        }),
        component: Card,
        defineAssertions: ({ variant }) => {
            const assertions: StyleAssertion[] = [
                {
                    expected: "12px",
                    name: "border-radius",
                    property: "borderRadius",
                },
                {
                    expected: "16px",
                    name: "padding-top",
                    property: "paddingTop",
                },
                {
                    expected: "16px",
                    name: "padding-right",
                    property: "paddingRight",
                },
                {
                    expected: "16px",
                    name: "padding-bottom",
                    property: "paddingBottom",
                },
                {
                    expected: "16px",
                    name: "padding-left",
                    property: "paddingLeft",
                },
            ];

            if (variant === "elevated") {
                assertions.push({
                    expected: resolveToken("--color-surface-container-low"),
                    name: "background",
                    property: "backgroundColor",
                });
                assertions.push({
                    expected: "0px",
                    name: "border-width",
                    property: "borderLeftWidth",
                });
            } else if (variant === "filled") {
                assertions.push({
                    expected: resolveToken("--color-surface-container-highest"),
                    name: "background",
                    property: "backgroundColor",
                });
                assertions.push({
                    expected: "0px",
                    name: "border-width",
                    property: "borderLeftWidth",
                });
            } else {
                assertions.push({
                    expected: resolveToken("--color-surface"),
                    name: "background",
                    property: "backgroundColor",
                });
                assertions.push({
                    expected: resolveToken("--color-outline-variant"),
                    name: "border",
                    property: "borderBottomColor",
                });
                assertions.push({
                    expected: "1px",
                    name: "border-width",
                    property: "borderLeftWidth",
                });
            }

            return assertions;
        },
    });
});
