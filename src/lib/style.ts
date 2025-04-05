import {
    extendTailwindMerge,
    validators,
    type ConfigExtension,
} from "tailwind-merge";
import {
    createTV,
    type ClassValue,
    type VariantProps as BaseVariantProps,
} from "tailwind-variants";

type ClassGroups = "icon-size" | "icon-fill" | "icon-grade";

const twMergeConfig = {
    extend: {
        classGroups: {
            "icon-size": [
                {
                    icon: [validators.isNumber, validators.isArbitraryLength],
                },
            ],
            "icon-fill": [
                "icon-outline",
                "icon-filled",
                {
                    "icon-fill": [validators.isPercent],
                },
            ],
            "icon-grade": [
                {
                    "icon-grade": [
                        "low",
                        "normal",
                        "high",
                        validators.isInteger,
                    ],
                    "-icon-grade": [validators.isInteger],
                },
            ],
        },
        theme: {
            color: [
                "primary",
                "on-primary",
                "primary-container",
                "on-primary-container",
                "secondary",
                "on-secondary",
                "secondary-container",
                "on-secondary-container",
                "tertiary",
                "on-tertiary",
                "tertiary-container",
                "on-tertiary-container",
                "error",
                "on-error",
                "error-container",
                "on-error-container",
                "surface",
                "on-surface",
                "surface-variant",
                "on-surface-variant",
                "surface-container-lowest",
                "surface-container-low",
                "surface-container",
                "surface-container-high",
                "surface-container-highest",
                "inverse-surface",
                "inverse-on-surface",
                "surface-tint",
                "outline",
                "outline-variant",
            ],
            shadow: ["1", "2", "3", "4", "5"],
            ease: [
                "emphasized",
                "emphasized-decelerate",
                "emphasized-accelerate",
                "standard",
                "standard-decelerate",
                "standard-accelerate",
            ],
            radius: ["xxs", "xs", "sm", "md", "lg", "xl"],
            text: [
                "display-l",
                "display-m",
                "display-s",
                "headline-l",
                "headline-m",
                "headline-s",
                "title-l",
                "title-m",
                "title-s",
                "body-l",
                "body-m",
                "body-s",
                "label-l",
                "label-m",
                "label-s",
            ],
            breakpoint: ["compact", "medium", "expanded", "large", "xlarge"],
        },
    },
} satisfies ConfigExtension<ClassGroups, never>;

export const twMerge = extendTailwindMerge<ClassGroups>(twMergeConfig);

export const tv = createTV({ twMergeConfig });

export type ExtendProps<Base, Other extends Record<string, unknown>> = Omit<
    Base,
    keyof Other
> &
    Other;

export type ClassProps<
    Base,
    Class extends string = "class",
    Other extends Record<string, unknown> = Record<never, never>,
> = ExtendProps<Base, { [c in Class]?: ClassValue } & Other>;

export type VariantProps<
    Base,
    TV extends () => unknown,
    Class extends string = "class",
    Other extends Record<string, unknown> = Record<never, never>,
> = ClassProps<Base, Class, BaseVariantProps<TV> & Other>;
