import { IconButton } from "$lib/index.js";
import { describe } from "vitest";

import {
    resolveToken,
    runSpecBenchmark,
    type StyleAssertion,
    withOpacity,
} from "./specBenchmark.js";

// https://m3.material.io/components/icon-buttons/specs
interface SizeSpec {
    containerSize: string;
    iconSize: string;
    roundRadius: string;
    squareRadius: string;
}

interface VariantColorSpec {
    background: null | string;
    border?: string;
    color: string;
    disabledBackgroundOpacity: number;
    disabledBorder?: null | string;
}

const iconButtonSizes: Record<string, SizeSpec> = {
    "extra-large": {
        containerSize: "136px",
        iconSize: "40px",
        roundRadius: "9999px",
        squareRadius: "28px",
    },
    "extra-small": {
        containerSize: "32px",
        iconSize: "20px",
        roundRadius: "9999px",
        squareRadius: "12px",
    },
    large: {
        containerSize: "96px",
        iconSize: "32px",
        roundRadius: "9999px",
        squareRadius: "28px",
    },
    medium: {
        containerSize: "56px",
        iconSize: "24px",
        roundRadius: "9999px",
        squareRadius: "16px",
    },
    small: {
        containerSize: "40px",
        iconSize: "24px",
        roundRadius: "9999px",
        squareRadius: "12px",
    },
};

const iconButtonVariants: Record<string, VariantColorSpec> = {
    filled: {
        background: "--color-primary",
        color: "--color-on-primary",
        disabledBackgroundOpacity: 0.1,
    },
    "filled-tonal": {
        background: "--color-secondary-container",
        color: "--color-on-secondary-container",
        disabledBackgroundOpacity: 0.1,
    },
    outlined: {
        background: null,
        border: "--color-outline-variant",
        color: "--color-on-surface-variant",
        disabledBackgroundOpacity: 0,
        disabledBorder: "--color-outline-variant",
    },
    standard: {
        background: null,
        color: "--color-on-surface-variant",
        disabledBackgroundOpacity: 0,
    },
};

describe("IconButton spec benchmark", () => {
    runSpecBenchmark({
        axes: {
            shape: ["round", "square"],
            size: ["extra-small", "small", "medium", "large", "extra-large"],
            state: ["enabled", "disabled"],
            variant: ["filled", "filled-tonal", "outlined", "standard"],
        },
        buildProps: ({ disabled, shape, size, variant }) => ({
            disabled: disabled === "disabled",
            icon: "edit",
            shape,
            size,
            variant,
        }),
        component: IconButton,
        defineAssertions: ({ shape, size, state, variant }) => {
            const sizeSpec = iconButtonSizes[size];
            const variantSpec = iconButtonVariants[variant];
            const isDisabled = state === "disabled";
            const assertions: StyleAssertion[] = [
                {
                    expected: sizeSpec.containerSize,
                    name: "width",
                    property: "width",
                },
                {
                    expected: sizeSpec.containerSize,
                    name: "height",
                    property: "height",
                },
                {
                    expected:
                        shape === "round"
                            ? sizeSpec.roundRadius
                            : sizeSpec.squareRadius,
                    name: "border-radius",
                    property: "borderRadius",
                },
                {
                    expected: sizeSpec.iconSize,
                    name: "icon size",
                    property: "width",
                    selector: ":scope > span",
                },
                {
                    expected: sizeSpec.iconSize,
                    name: "icon size",
                    property: "height",
                    selector: ":scope > span",
                },
            ];

            if (isDisabled) {
                if (variantSpec.disabledBorder) {
                    assertions.push({
                        expected: resolveToken(variantSpec.disabledBorder),
                        name: "border",
                        property: "borderBottomColor",
                    });
                }

                if (variantSpec.disabledBackgroundOpacity > 0) {
                    assertions.push({
                        expected: withOpacity(
                            resolveToken("--color-on-surface"),
                            variantSpec.disabledBackgroundOpacity,
                        ),
                        name: "background",
                        property: "backgroundColor",
                    });
                } else {
                    assertions.push({
                        expected: "rgba(0, 0, 0, 0)",
                        name: "background",
                        property: "backgroundColor",
                    });
                }

                assertions.push({
                    expected: withOpacity(
                        resolveToken("--color-on-surface"),
                        0.38,
                    ),
                    name: "icon color",
                    property: "color",
                    selector: ":scope > span",
                });
            } else {
                if (variantSpec.background) {
                    assertions.push({
                        expected: resolveToken(variantSpec.background),
                        name: "background",
                        property: "backgroundColor",
                    });
                } else {
                    assertions.push({
                        expected: "rgba(0, 0, 0, 0)",
                        name: "background",
                        property: "backgroundColor",
                    });
                }

                if (variantSpec.border) {
                    assertions.push({
                        expected: resolveToken(variantSpec.border),
                        name: "border",
                        property: "borderBottomColor",
                    });
                }

                assertions.push({
                    expected: resolveToken(variantSpec.color),
                    name: "icon color",
                    property: "color",
                    selector: ":scope > span",
                });
            }

            return assertions;
        },
    });
});
