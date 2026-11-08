import { describe } from "vitest";

import RadioWrapper from "./RadioWrapper.svelte";
import {
    resolveToken,
    runSpecBenchmark,
    type StyleAssertion,
    withOpacity,
} from "./specBenchmark.js";

// https://m3.material.io/components/radio-button/specs
describe("Radio spec benchmark", () => {
    runSpecBenchmark({
        axes: {
            checked: ["checked", "unchecked"],
            state: ["enabled", "disabled"],
        },
        buildProps: ({ checked, state }) => ({
            checked: checked === "checked",
            disabled: state === "disabled",
            value: "radio-value",
        }),
        component: RadioWrapper,
        defineAssertions: ({ checked, state }) => {
            const isChecked = checked === "checked";
            const disabled = state === "disabled";
            const assertions: StyleAssertion[] = [
                {
                    expected: "20px",
                    name: "width",
                    property: "width",
                },
                {
                    expected: "20px",
                    name: "height",
                    property: "height",
                },
                {
                    expected: "50%",
                    name: "border-radius",
                    property: "borderRadius",
                },
                {
                    expected: "2px",
                    name: "ring width",
                    property: "borderLeftWidth",
                },
            ];

            if (isChecked) {
                if (disabled) {
                    assertions.push({
                        expected: withOpacity(
                            resolveToken("--color-on-surface"),
                            0.38,
                        ),
                        name: "ring color",
                        property: "borderBottomColor",
                    });
                    assertions.push({
                        expected: withOpacity(
                            resolveToken("--color-on-surface"),
                            0.38,
                        ),
                        name: "dot color",
                        property: "backgroundColor",
                        selector: "span",
                    });
                } else {
                    assertions.push({
                        expected: resolveToken("--color-primary"),
                        name: "ring color",
                        property: "borderBottomColor",
                    });
                    assertions.push({
                        expected: resolveToken("--color-primary"),
                        name: "dot color",
                        property: "backgroundColor",
                        selector: "span",
                    });
                }

                assertions.push({
                    expected: "10px",
                    name: "dot size",
                    property: "width",
                    selector: "span",
                });
                assertions.push({
                    expected: "10px",
                    name: "dot size",
                    property: "height",
                    selector: "span",
                });
            } else {
                if (disabled) {
                    assertions.push({
                        expected: withOpacity(
                            resolveToken("--color-on-surface"),
                            0.38,
                        ),
                        name: "ring color",
                        property: "borderBottomColor",
                    });
                } else {
                    assertions.push({
                        expected: resolveToken("--color-on-surface-variant"),
                        name: "ring color",
                        property: "borderBottomColor",
                    });
                }

                assertions.push({
                    expected: "0px",
                    name: "dot size",
                    property: "width",
                    selector: "span",
                });
                assertions.push({
                    expected: "0px",
                    name: "dot size",
                    property: "height",
                    selector: "span",
                });
            }

            return assertions;
        },
    });
});
