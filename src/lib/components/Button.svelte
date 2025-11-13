<script lang="ts" module>
    import { mergeVariants, tv } from "$lib/style.js";

    export const variantsConfig = mergeVariants({
        compoundVariants: [
            // Primary colors
            {
                class: { container: "text-primary" },
                color: "primary",
                variant: ["elevated", "outlined", "text"],
            },
            {
                class: { container: "bg-primary text-on-primary" },
                color: "primary",
                variant: "filled",
            },
            {
                class: {
                    container: "bg-primary-container text-on-primary-container",
                },
                color: "primary",
                variant: "tonal",
            },
            {
                class: { container: "focus:border-primary" },
                color: "primary",
                variant: "outlined",
            },
            // Secondary colors
            {
                class: { container: "text-secondary" },
                color: "secondary",
                variant: ["elevated", "outlined", "text"],
            },
            {
                class: { container: "bg-secondary text-on-secondary" },
                color: "secondary",
                variant: "filled",
            },
            {
                class: {
                    container:
                        "bg-secondary-container text-on-secondary-container",
                },
                color: "secondary",
                variant: "tonal",
            },
            {
                class: { container: "focus:border-secondary" },
                color: "secondary",
                variant: "outlined",
            },
            // Tertiary colors
            {
                class: { container: "text-tertiary" },
                color: "tertiary",
                variant: ["elevated", "outlined", "text"],
            },
            {
                class: { container: "bg-tertiary text-on-tertiary" },
                color: "tertiary",
                variant: "filled",
            },
            {
                class: {
                    container:
                        "bg-tertiary-container text-on-tertiary-container",
                },
                color: "tertiary",
                variant: "tonal",
            },
            {
                class: { container: "focus:border-tertiary" },
                color: "tertiary",
                variant: "outlined",
            },
            // Error colors
            {
                class: { container: "text-error" },
                color: "error",
                variant: ["elevated", "outlined", "text"],
            },
            {
                class: { container: "bg-error text-on-error" },
                color: "error",
                variant: "filled",
            },
            {
                class: {
                    container: "bg-error-container text-on-error-container",
                },
                color: "error",
                variant: "tonal",
            },
            {
                class: { container: "focus:border-error" },
                color: "error",
                variant: "outlined",
            },
            // No color
            {
                class: { container: "text-on-surface-variant" },
                color: "none",
                variant: ["elevated", "outlined", "text"],
            },
            {
                class: { container: "bg-on-surface text-surface" },
                color: "none",
                variant: "filled",
            },
            {
                class: {
                    container: "text-on-surface-container bg-surface-container",
                },
                color: "none",
                variant: "tonal",
            },
            {
                class: { container: "focus:border-on-surface" },
                color: "none",
                variant: "outlined",
            },
            // Square radii
            {
                class: { container: "rounded-md" },
                shape: "square",
                size: ["extra-small", "small"],
            },
            {
                class: { container: "rounded-lg" },
                shape: "square",
                size: "medium",
            },
            {
                class: { container: "rounded-xl" },
                shape: "square",
                size: ["large", "extra-large"],
            },
            // Round radii
            {
                class: { container: "rounded-[--spacing(4)]" },
                shape: "round",
                size: "extra-small",
            },
            {
                class: { container: "rounded-[--spacing(5)]" },
                shape: "round",
                size: "small",
            },
            {
                class: { container: "rounded-[--spacing(7)]" },
                shape: "round",
                size: "medium",
            },
            {
                class: { container: "rounded-[--spacing(12)]" },
                shape: "round",
                size: "large",
            },
            {
                class: { container: "rounded-[--spacing(17)]" },
                shape: "round",
                size: "extra-large",
            },
        ],
        defaultVariants: {
            color: "primary",
            shape: "round",
            size: "small",
            variant: "filled",
        },
        slots: {
            container:
                "group/state-layer relative inline-flex min-w-16 cursor-pointer items-center justify-center overflow-clip whitespace-nowrap transition-all focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-secondary disabled:pointer-events-none disabled:cursor-default disabled:text-on-surface/38 disabled:shadow-none",
            stateLayer: "absolute inset-0",
        },
        variants: {
            color: {
                error: {},
                none: {},
                primary: {},
                secondary: {},
                tertiary: {},
            },
            shape: {
                round: {},
                square: {},
            },
            size: {
                "extra-large": {
                    container:
                        "h-34 gap-4 px-16 text-headline-l icon-10 active:rounded-lg",
                },
                "extra-small": {
                    container:
                        "h-8 gap-1 px-3 text-label-l icon-5 active:rounded-sm",
                },
                large: {
                    container:
                        "h-24 gap-3 px-12 text-headline-s icon-8 active:rounded-lg",
                },
                medium: {
                    container:
                        "h-14 gap-2 px-6 text-title-m icon-6 active:rounded-md",
                },
                small: {
                    container:
                        "h-10 gap-2 px-4 text-label-l icon-5 active:rounded-sm",
                },
            },
            variant: {
                elevated: {
                    container:
                        "bg-surface-container-low shadow-1 hover:shadow-2 active:shadow-1 disabled:bg-on-surface/12",
                },
                filled: {
                    container:
                        "hover:shadow-1 active:shadow-none disabled:bg-on-surface/12",
                },
                outlined: {
                    container:
                        "border border-outline disabled:border-on-surface/12",
                },
                text: {},
                tonal: {
                    container:
                        "hover:shadow-1 active:shadow-none disabled:bg-on-surface/12",
                },
            },
        },
    });

    export const variants = tv(variantsConfig);
</script>

<script lang="ts">
    import type { WrapperProps } from "$lib/types/style.js";

    import {
        getButtonColor,
        getButtonShape,
        getButtonSize,
        getButtonVariant,
    } from "$lib/context/button.js";
    import { Button } from "bits-ui";

    import StateLayer from "./StateLayer.svelte";

    const contextColor = getButtonColor();
    const contextShape = getButtonShape();
    const contextSize = getButtonSize();
    const contextVariant = getButtonVariant();

    let {
        children,
        color: propColor,
        containerClass,
        ref = $bindable(null),
        shape: propShape,
        size: propSize,
        stateLayerClass,
        variant: propVariant,
        ...props
    }: WrapperProps<Button.RootProps, typeof variants> = $props();

    let shape = $derived(propShape ?? contextShape?.() ?? "round");
    let size = $derived(propSize ?? contextSize?.() ?? "small");
    let variant = $derived(propVariant ?? contextVariant?.() ?? "filled");
    let color = $derived(
        propColor ??
            contextColor?.() ??
            (variant === "tonal" ? "secondary" : "primary"),
    );

    let classes = $derived(variants({ color, shape, size, variant }));
</script>

<Button.Root
    class={classes.container({ class: containerClass })}
    bind:ref
    {...props}
>
    <StateLayer
        containerClass={classes.stateLayer({ class: stateLayerClass })}
        target={ref}
    />

    {@render children?.()}
</Button.Root>
