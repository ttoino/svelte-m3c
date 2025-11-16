import {
    type ConfigExtension,
    type DefaultClassGroupIds,
    type DefaultThemeGroupIds,
    extendTailwindMerge,
    validators,
} from "tailwind-merge";
import { createTV } from "tailwind-variants";

import type { ClassGroups, MergeVariants } from "./types/style.js";
import type { Mutable, Prettify } from "./types/util.js";

const twMergeConfig = {
    extend: {
        classGroups: {
            duration: [
                {
                    duration: [
                        "short1",
                        "short2",
                        "short3",
                        "short4",
                        "medium1",
                        "medium2",
                        "medium3",
                        "medium4",
                        "long1",
                        "long2",
                        "long3",
                        "long4",
                        "extra-long1",
                        "extra-long2",
                        "extra-long3",
                        "extra-long4",
                    ],
                },
            ],
            h: ["h-stretch"],
            "mask-image": [
                {
                    "mask-shape": [
                        "circle",
                        "square",
                        "slanted",
                        "arch",
                        "fan",
                        "arrow",
                        "semicircle",
                        "oval",
                        "pill",
                        "triangle",
                        "diamond",
                        "clamshell",
                        "pentagon",
                        "gem",
                        "very-sunny",
                        "sunny",
                        "4-sided-cookie",
                        "6-sided-cookie",
                        "7-sided-cookie",
                        "9-sided-cookie",
                        "12-sided-cookie",
                        "ghost-ish",
                        "4-leaf-clover",
                        "8-leaf-clover",
                        "burst",
                        "soft-burst",
                        "boom",
                        "soft-boom",
                        "flower",
                        "puffy",
                        "puffy-diamond",
                        "pixel-circle",
                        "pixel-triangle",
                        "bun",
                        "heart",
                    ],
                },
            ],
            "max-h": ["max-h-stretch"],
            "max-w": ["max-w-stretch"],
            "min-h": ["min-h-stretch"],
            "min-w": ["min-w-stretch"],
            size: ["size-stretch"],
            w: ["w-stretch"],
        },
    },
    override: {
        classGroups: {
            amplitude: [
                {
                    amplitude: [
                        validators.isNumber,
                        validators.isArbitraryLength,
                    ],
                },
            ],
            "icon-fill": [
                {
                    icon: ["outline", "filled"],
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
            linecap: [{ linecap: ["butt", "round", "square"] }],
            linejoin: [{ linejoin: ["miter", "round", "bevel"] }],
            paint: [{ paint: ["arc", "arc-wave", "wave"] }],
            phase: [
                { phase: [validators.isPercent, validators.isArbitraryNumber] },
            ],
            wavelength: [
                {
                    wavelength: [
                        validators.isNumber,
                        validators.isArbitraryLength,
                    ],
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
                "scrim",
            ],
            ease: [
                "emphasized",
                "emphasized-decelerate",
                "emphasized-accelerate",
                "standard",
                "standard-decelerate",
                "standard-accelerate",
            ],
            radius: [
                "xxs",
                "xs",
                "sm",
                "md",
                "lg",
                "lg-increased",
                "xl",
                "xl-increased",
                "xxl",
            ],
            shadow: ["1", "2", "3", "4", "5"],
            text: [
                "display-l",
                "display-l-emphasized",
                "display-m",
                "display-m-emphasized",
                "display-s",
                "display-s-emphasized",
                "headline-l",
                "headline-l-emphasized",
                "headline-m",
                "headline-m-emphasized",
                "headline-s",
                "headline-s-emphasized",
                "title-l",
                "title-l-emphasized",
                "title-m",
                "title-m-emphasized",
                "title-s",
                "title-s-emphasized",
                "body-l",
                "body-l-emphasized",
                "body-m",
                "body-m-emphasized",
                "body-s",
                "body-s-emphasized",
                "label-l",
                "label-l-emphasized",
                "label-m",
                "label-m-emphasized",
                "label-s",
                "label-s-emphasized",
            ],
        },
    },
} satisfies ConfigExtension<
    ClassGroups | DefaultClassGroupIds,
    DefaultThemeGroupIds
>;

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
