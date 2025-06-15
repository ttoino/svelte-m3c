import {
    type ConfigExtension,
    extendTailwindMerge,
    validators,
} from "tailwind-merge";
import { createTV } from "tailwind-variants";

import type { ClassGroups, MergeVariants } from "./types/style.js";
import type { Mutable, Prettify } from "./types/util.js";

const twMergeConfig = {
    extend: {
        classGroups: {
            "icon-fill": [
                "icon-outline",
                "icon-filled",
                {
                    "icon-fill": [validators.isPercent],
                },
            ],
            "icon-grade": [
                {
                    "-icon-grade": [validators.isInteger],
                    "icon-grade": [
                        "low",
                        "normal",
                        "high",
                        validators.isInteger,
                    ],
                },
            ],
            "icon-size": [
                {
                    icon: [validators.isNumber, validators.isArbitraryLength],
                },
            ],
        },
        theme: {
            breakpoint: ["compact", "medium", "expanded", "large", "xlarge"],
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
            ease: [
                "emphasized",
                "emphasized-decelerate",
                "emphasized-accelerate",
                "standard",
                "standard-decelerate",
                "standard-accelerate",
            ],
            radius: ["xxs", "xs", "sm", "md", "lg", "xl"],
            shadow: ["1", "2", "3", "4", "5"],
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
        },
    },
} satisfies ConfigExtension<ClassGroups, never>;

export const twMerge = extendTailwindMerge<ClassGroups>(twMergeConfig);

export const tv = createTV({ twMergeConfig });

export const mergeVariants = <const Parent, const Child = undefined>(
    parent: Parent,
    child?: Child,
): Prettify<Mutable<MergeVariants<Parent, Child>>> => {
    if (parent === undefined || parent === null)
        return child as MergeVariants<Parent, Child>;
    if (child === undefined || child === null)
        return parent as MergeVariants<Parent, Child>;

    if (Array.isArray(parent) && Array.isArray(child)) {
        return [...parent, ...child] as MergeVariants<Parent, Child>;
    }

    if (typeof parent === "object" && typeof child === "object") {
        return Object.entries(child).reduce<Record<string, unknown>>(
            (acc, [key, value]) => {
                acc[key] = mergeVariants(
                    (parent as Record<string, unknown>)[key],
                    value,
                );
                return acc;
            },
            { ...parent } as Record<string, unknown>,
        ) as MergeVariants<Parent, Child>;
    }

    return [parent, child] as MergeVariants<Parent, Child>;
};
