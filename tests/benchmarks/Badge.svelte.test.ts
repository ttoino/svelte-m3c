import { Badge } from "$lib/index.js";
import { createRawSnippet } from "svelte";
import { describe } from "vitest";

import { resolveToken, runSpecBenchmark } from "./specBenchmark.js";

const singleDigit = createRawSnippet(() => ({
    render: () => "3",
    setup() {},
}));

// https://m3.material.io/components/badges/specs
describe("Badge spec benchmark", () => {
    runSpecBenchmark({
        axes: {
            content: ["empty", "single-digit"],
        },
        buildProps: ({ content }) => ({
            children: content === "single-digit" ? singleDigit : undefined,
        }),
        component: Badge,
        defineAssertions: ({ content }) => {
            const hasContent = content === "single-digit";

            if (hasContent) {
                return [
                    {
                        expected: "16px",
                        name: "height",
                        property: "height",
                    },
                    {
                        expected: "16px",
                        name: "min-width",
                        property: "minWidth",
                    },
                    {
                        expected: "4px",
                        name: "padding-left",
                        property: "paddingLeft",
                    },
                    {
                        expected: "4px",
                        name: "padding-right",
                        property: "paddingRight",
                    },
                    {
                        expected: "9999px",
                        name: "border-radius",
                        property: "borderRadius",
                    },
                    {
                        expected: resolveToken("--color-error"),
                        name: "background",
                        property: "backgroundColor",
                    },
                    {
                        expected: resolveToken("--color-on-error"),
                        name: "color",
                        property: "color",
                    },
                    {
                        expected: "11px",
                        name: "font-size",
                        property: "fontSize",
                    },
                    {
                        expected: "500",
                        name: "font-weight",
                        property: "fontWeight",
                    },
                    {
                        expected: "16px",
                        name: "line-height",
                        property: "lineHeight",
                    },
                ];
            }

            return [
                {
                    expected: "6px",
                    name: "width",
                    property: "width",
                },
                {
                    expected: "6px",
                    name: "height",
                    property: "height",
                },
                {
                    expected: "9999px",
                    name: "border-radius",
                    property: "borderRadius",
                },
                {
                    expected: resolveToken("--color-error"),
                    name: "background",
                    property: "backgroundColor",
                },
            ];
        },
    });
});
