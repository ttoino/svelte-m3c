import { Switch } from "$lib/index.js";
import { describe } from "vitest";

import {
    resolveToken,
    runSpecBenchmark,
    type StyleAssertion,
    withOpacity,
} from "./specBenchmark.js";

// https://m3.material.io/components/switch/specs
describe("Switch spec benchmark", () => {
    runSpecBenchmark({
        axes: {
            checked: ["checked", "unchecked"],
            state: ["enabled", "disabled"],
        },
        buildProps: ({ checked, state }) => ({
            checked: checked === "checked",
            disabled: state === "disabled",
        }),
        component: Switch,
        defineAssertions: ({ checked, state }) => {
            const isChecked = checked === "checked";
            const disabled = state === "disabled";
            const assertions: StyleAssertion[] = [
                {
                    expected: "52px",
                    name: "track width",
                    property: "width",
                },
                {
                    expected: "32px",
                    name: "track height",
                    property: "height",
                },
                {
                    expected: "9999px",
                    name: "track border-radius",
                    property: "borderRadius",
                },
                {
                    expected: "50%",
                    name: "thumb border-radius",
                    property: "borderRadius",
                    selector: ":scope > span",
                },
            ];

            if (isChecked) {
                if (disabled) {
                    assertions.push({
                        expected: withOpacity(
                            resolveToken("--color-on-surface"),
                            0.12,
                        ),
                        name: "track background",
                        property: "backgroundColor",
                    });
                    assertions.push({
                        expected: "rgba(0, 0, 0, 0)",
                        name: "track border",
                        property: "borderBottomColor",
                    });
                    assertions.push({
                        expected: resolveToken("--color-surface"),
                        name: "thumb background",
                        property: "backgroundColor",
                        selector: ":scope > span",
                    });
                } else {
                    assertions.push({
                        expected: resolveToken("--color-primary"),
                        name: "track background",
                        property: "backgroundColor",
                    });
                    assertions.push({
                        expected: "rgba(0, 0, 0, 0)",
                        name: "track border",
                        property: "borderBottomColor",
                    });
                    assertions.push({
                        expected: resolveToken("--color-on-primary"),
                        name: "thumb background",
                        property: "backgroundColor",
                        selector: ":scope > span",
                    });
                }

                assertions.push({
                    expected: "24px",
                    name: "thumb size",
                    property: "width",
                    selector: ":scope > span",
                });
                assertions.push({
                    expected: "24px",
                    name: "thumb size",
                    property: "height",
                    selector: ":scope > span",
                });
            } else {
                if (disabled) {
                    assertions.push({
                        expected: withOpacity(
                            resolveToken("--color-surface-container-highest"),
                            0.12,
                        ),
                        name: "track background",
                        property: "backgroundColor",
                    });
                    assertions.push({
                        expected: withOpacity(
                            resolveToken("--color-on-surface"),
                            0.12,
                        ),
                        name: "track border",
                        property: "borderBottomColor",
                    });
                    assertions.push({
                        expected: withOpacity(
                            resolveToken("--color-on-surface"),
                            0.12,
                        ),
                        name: "thumb background",
                        property: "backgroundColor",
                        selector: ":scope > span",
                    });
                } else {
                    assertions.push({
                        expected: resolveToken(
                            "--color-surface-container-highest",
                        ),
                        name: "track background",
                        property: "backgroundColor",
                    });
                    assertions.push({
                        expected: resolveToken("--color-outline"),
                        name: "track border",
                        property: "borderBottomColor",
                    });
                    assertions.push({
                        expected: resolveToken("--color-outline"),
                        name: "thumb background",
                        property: "backgroundColor",
                        selector: ":scope > span",
                    });
                }

                assertions.push({
                    expected: "16px",
                    name: "thumb size",
                    property: "width",
                    selector: ":scope > span",
                });
                assertions.push({
                    expected: "16px",
                    name: "thumb size",
                    property: "height",
                    selector: ":scope > span",
                });
            }

            return assertions;
        },
    });
});
