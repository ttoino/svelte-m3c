import { Checkbox } from "$lib/index.js";
import { describe } from "vitest";

import {
    resolveToken,
    runSpecBenchmark,
    withOpacity,
} from "./specBenchmark.js";

// https://m3.material.io/components/checkbox/specs
describe("Checkbox spec benchmark", () => {
    runSpecBenchmark({
        axes: {
            checked: ["checked", "unchecked"],
            state: ["enabled", "disabled"],
        },
        buildProps: ({ checked, state }) => ({
            checked: checked === "checked",
            disabled: state === "disabled",
        }),
        component: Checkbox,
        defineAssertions: ({ checked, state }) => {
            const isChecked = checked === "checked";
            const disabled = state === "disabled";
            const assertions = [
                {
                    expected: "18px",
                    name: "width",
                    property: "width",
                },
                {
                    expected: "18px",
                    name: "height",
                    property: "height",
                },
                {
                    expected: "2px",
                    name: "border-radius",
                    property: "borderRadius",
                },
            ];

            if (isChecked) {
                if (disabled) {
                    assertions.push({
                        expected: withOpacity(
                            resolveToken("--color-on-surface"),
                            0.38,
                        ),
                        name: "background",
                        property: "backgroundColor",
                    });
                    assertions.push({
                        expected: resolveToken("--color-surface"),
                        name: "checkmark color",
                        property: "color",
                    });
                } else {
                    assertions.push({
                        expected: resolveToken("--color-primary"),
                        name: "background",
                        property: "backgroundColor",
                    });
                    assertions.push({
                        expected: resolveToken("--color-on-primary"),
                        name: "checkmark color",
                        property: "color",
                    });
                }

                assertions.push({
                    expected: "0px",
                    name: "border-width",
                    property: "borderLeftWidth",
                });
            } else {
                if (disabled) {
                    assertions.push({
                        expected: withOpacity(
                            resolveToken("--color-on-surface"),
                            0.38,
                        ),
                        name: "border color",
                        property: "borderBottomColor",
                    });
                } else {
                    assertions.push({
                        expected: resolveToken("--color-on-surface-variant"),
                        name: "border color",
                        property: "borderBottomColor",
                    });
                }

                assertions.push({
                    expected: "rgba(0, 0, 0, 0)",
                    name: "background",
                    property: "backgroundColor",
                });
                assertions.push({
                    expected: "2px",
                    name: "border-width",
                    property: "borderLeftWidth",
                });
            }

            return assertions;
        },
    });
});
