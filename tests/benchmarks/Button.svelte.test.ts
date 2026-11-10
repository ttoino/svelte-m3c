import { Button } from "$lib/index.js";
import { describe } from "vitest";

import { iconAndLabel } from "../components/children.js";
import {
    colorAssertion,
    getToken,
    lengthAssertion,
    loadComponentTokens,
    opacityAssertion,
    shapeAssertion,
    transparentAssertion,
    tryGetToken,
    typographyAssertions,
} from "../fixtures/m3-tokens/index.js";
import { runSpecBenchmark, type StyleAssertion } from "./specBenchmark.js";

const BUTTON_COMPONENT_ID = "1c4257f8804f9478";

const sizeToDsdb = (size: string): string => {
    switch (size) {
        case "extra-large":
            return "xlarge";
        case "extra-small":
            return "xsmall";
        default:
            return size;
    }
};

describe("Button spec benchmark", async () => {
    const tokens = await loadComponentTokens(BUTTON_COMPONENT_ID);

    runSpecBenchmark({
        axes: {
            shape: ["round", "square"],
            size: ["extra-small", "small", "medium", "large", "extra-large"],
            state: ["enabled", "disabled"],
            variant: ["elevated", "filled", "outlined", "text", "tonal"],
        },
        buildProps: ({ disabled, shape, size, variant }) => ({
            children: iconAndLabel,
            disabled: disabled === "disabled",
            shape,
            size,
            variant,
        }),
        component: Button,
        defineAssertions: ({ shape, size, state, variant }) => {
            const dsdbSize = sizeToDsdb(size);
            const disabled = state === "disabled";
            const sizePrefix = `md.comp.button.${dsdbSize}`;
            const variantPrefix = `md.comp.button.${variant}`;
            const assertions: StyleAssertion[] = [];

            // Layout.
            assertions.push(
                lengthAssertion(
                    getToken(tokens.tokens, `${sizePrefix}.container.height`),
                    "height",
                    "height",
                    0,
                ),
                lengthAssertion(
                    getToken(tokens.tokens, `${sizePrefix}.leading-space`),
                    "paddingLeft",
                    "padding-left",
                    0,
                ),
                lengthAssertion(
                    getToken(tokens.tokens, `${sizePrefix}.trailing-space`),
                    "paddingRight",
                    "padding-right",
                    0,
                ),
                lengthAssertion(
                    getToken(tokens.tokens, `${sizePrefix}.icon-label-space`),
                    "gap",
                    "gap",
                    0,
                ),
                shapeAssertion(
                    getToken(
                        tokens.tokens,
                        `${sizePrefix}.container.shape.${shape}`,
                    ),
                    "borderRadius",
                    "border-radius",
                ),
            );

            // Typography.
            assertions.push(
                ...typographyAssertions(
                    getToken(tokens.tokens, `${sizePrefix}.label-text`),
                ),
            );

            if (disabled) {
                const containerOpacity = getToken(
                    tokens.tokens,
                    `${variantPrefix}.disabled.container.opacity`,
                );

                if (
                    containerOpacity.type === "OPACITY" &&
                    containerOpacity.value === 0
                ) {
                    assertions.push(
                        transparentAssertion(
                            "backgroundColor",
                            "disabled background",
                        ),
                    );
                } else {
                    const containerColor =
                        tryGetToken(
                            tokens.tokens,
                            `${variantPrefix}.disabled.container.color`,
                        ) ?? getToken(tokens.tokens, "md.sys.color.on-surface");

                    assertions.push(
                        opacityAssertion(
                            containerOpacity,
                            containerColor,
                            "backgroundColor",
                            "disabled background",
                        ),
                    );
                }

                assertions.push(
                    opacityAssertion(
                        getToken(
                            tokens.tokens,
                            `${variantPrefix}.disabled.label-text.opacity`,
                        ),
                        getToken(
                            tokens.tokens,
                            `${variantPrefix}.disabled.label-text.color`,
                        ),
                        "color",
                        "disabled label/icon color",
                    ),
                );

                if (variant === "outlined") {
                    assertions.push(
                        colorAssertion(
                            getToken(
                                tokens.tokens,
                                `${variantPrefix}.disabled.outline.color`,
                            ),
                            "borderBottomColor",
                            "disabled border",
                        ),
                    );
                }
            } else {
                if (variant === "text" || variant === "outlined") {
                    assertions.push(
                        transparentAssertion("backgroundColor", "background"),
                    );
                } else {
                    assertions.push(
                        colorAssertion(
                            getToken(
                                tokens.tokens,
                                `${variantPrefix}.container.color`,
                            ),
                            "backgroundColor",
                            "background",
                        ),
                    );
                }

                assertions.push(
                    colorAssertion(
                        getToken(
                            tokens.tokens,
                            `${variantPrefix}.label-text.color`,
                        ),
                        "color",
                        "label/icon color",
                    ),
                );

                if (variant === "outlined") {
                    assertions.push(
                        colorAssertion(
                            getToken(
                                tokens.tokens,
                                `${variantPrefix}.outline.color`,
                            ),
                            "borderBottomColor",
                            "border",
                        ),
                    );
                }
            }

            return assertions;
        },
    });
});
