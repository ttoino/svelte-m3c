import { createRawSnippet } from "svelte";
import { describe } from "vitest";

import {
    resolveToken,
    runSpecBenchmark,
    type StyleAssertion,
    withOpacity,
} from "./specBenchmark.js";
import TextFieldWrapper from "./TextFieldWrapper.svelte";

const labelSnippet = createRawSnippet(() => ({
    render: () => "Label",
    setup() {},
}));

// https://m3.material.io/components/text-fields/specs
describe("TextField spec benchmark", () => {
    runSpecBenchmark({
        axes: {
            state: ["enabled", "disabled"],
            variant: ["filled", "outlined"],
        },
        buildProps: ({ disabled, variant }) => ({
            disabled: disabled === "disabled",
            label: labelSnippet,
            placeholder: "",
            value: "",
            variant,
        }),
        component: TextFieldWrapper,
        defineAssertions: ({ state, variant }) => {
            const isDisabled = state === "disabled";
            const assertions: StyleAssertion[] = [
                {
                    expected: "56px",
                    name: "container height",
                    property: "height",
                    selector: ":scope > label",
                },
                {
                    expected: "16px",
                    name: "padding-left",
                    property: "paddingLeft",
                    selector: ":scope > label",
                },
                {
                    expected: "16px",
                    name: "padding-right",
                    property: "paddingRight",
                    selector: ":scope > label",
                },
                {
                    expected: resolveToken("--color-on-surface"),
                    name: "input text color",
                    property: "color",
                    selector: ":scope > label input",
                },
                {
                    expected: "16px",
                    name: "input font-size",
                    property: "fontSize",
                    selector: ":scope > label input",
                },
                {
                    expected: "400",
                    name: "input font-weight",
                    property: "fontWeight",
                    selector: ":scope > label input",
                },
                {
                    expected: "24px",
                    name: "input line-height",
                    property: "lineHeight",
                    selector: ":scope > label input",
                },
            ];

            if (variant === "filled") {
                assertions.push({
                    expected: "8px",
                    name: "padding-top",
                    property: "paddingTop",
                    selector: ":scope > label",
                });
                assertions.push({
                    expected: "8px",
                    name: "padding-bottom",
                    property: "paddingBottom",
                    selector: ":scope > label",
                });

                if (isDisabled) {
                    assertions.push({
                        expected: withOpacity(
                            resolveToken("--color-on-surface"),
                            0.04,
                        ),
                        name: "container background",
                        property: "backgroundColor",
                        selector: ":scope > label",
                    });
                    assertions.push({
                        expected: withOpacity(
                            resolveToken("--color-on-surface"),
                            0.38,
                        ),
                        name: "active indicator color",
                        property: "borderBottomColor",
                        selector: ":scope > label > div:last-child",
                    });
                } else {
                    assertions.push({
                        expected: resolveToken(
                            "--color-surface-container-highest",
                        ),
                        name: "container background",
                        property: "backgroundColor",
                        selector: ":scope > label",
                    });
                    assertions.push({
                        expected: resolveToken("--color-on-surface-variant"),
                        name: "active indicator color",
                        property: "borderBottomColor",
                        selector: ":scope > label > div:last-child",
                    });
                    assertions.push({
                        expected: resolveToken("--color-on-surface-variant"),
                        name: "label color",
                        property: "color",
                        selector: ":scope > label > span",
                    });
                }

                assertions.push({
                    expected: "1px",
                    name: "active indicator height",
                    property: "borderBottomWidth",
                    selector: ":scope > label > div:last-child",
                });
            } else {
                assertions.push({
                    expected: "16px",
                    name: "padding-top",
                    property: "paddingTop",
                    selector: ":scope > label",
                });
                assertions.push({
                    expected: "16px",
                    name: "padding-bottom",
                    property: "paddingBottom",
                    selector: ":scope > label",
                });

                if (isDisabled) {
                    assertions.push({
                        expected: withOpacity(
                            resolveToken("--color-on-surface"),
                            0.38,
                        ),
                        name: "label color",
                        property: "color",
                        selector: ":scope > label > span",
                    });
                } else {
                    assertions.push({
                        expected: resolveToken("--color-on-surface-variant"),
                        name: "label color",
                        property: "color",
                        selector: ":scope > label > span",
                    });
                }
            }

            return assertions;
        },
    });
});
