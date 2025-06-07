<script lang="ts" module>
    // TODO: Material 3 Expressive
    import { tv } from "$lib/style.js";

    export const variants = tv({
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
                "group/state-layer focus-visible:outline-secondary disabled:text-on-surface/38 relative inline-flex min-w-16 cursor-pointer items-center justify-center overflow-clip whitespace-nowrap transition-all focus-visible:outline focus-visible:outline-offset-2 disabled:pointer-events-none disabled:cursor-default disabled:shadow-none",
            stateLayer: "absolute inset-0",
        },
        variants: {
            color: {
                error: {},
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
                        "h-34 icon-10 text-headline-l gap-4 px-16 active:rounded-lg",
                },
                "extra-small": {
                    container:
                        "icon-5 text-label-l h-8 gap-1 px-3 active:rounded-sm",
                },
                large: {
                    container:
                        "icon-8 text-headline-s h-24 gap-3 px-12 active:rounded-lg",
                },
                medium: {
                    container:
                        "icon-6 text-title-m h-14 gap-2 px-6 active:rounded-md",
                },
                small: {
                    container:
                        "icon-5 text-label-l h-10 gap-2 px-4 active:rounded-sm",
                },
            },
            variant: {
                elevated: {
                    container:
                        "bg-surface-container-low shadow-1 hover:shadow-2 active:shadow-1 disabled:bg-on-surface/12",
                },
                filled: {
                    container:
                        "hover:shadow-1 disabled:bg-on-surface/12 active:shadow-none",
                },
                outlined: {
                    container:
                        "border-outline disabled:border-on-surface/12 border",
                },
                text: {
                    container: "px-3",
                },
                tonal: {
                    container:
                        "hover:shadow-1 disabled:bg-on-surface/12 active:shadow-none",
                },
            },
        },
    });
</script>

<script lang="ts">
    import type { VariantProps } from "$lib/types/style.js";

    import { getButtonColor, getButtonShape, getButtonSize, getButtonVariant } from "$lib/context/button.js";
    import { Button } from "bits-ui";

    import StateLayer from "./StateLayer.svelte";

    const contextColor = getButtonColor();
    const contextShape = getButtonShape();
    const contextSize = getButtonSize();
    const contextVariant = getButtonVariant();

    let {
        children,
        color = contextColor,
        containerClass,
        shape = contextShape,
        size = contextSize,
        // ref = $bindable(),
        stateLayerClass,
        variant = contextVariant,
        ...props
    }: VariantProps<
        Button.RootProps,
        typeof variants,
        "containerClass" | "stateLayerClass"
    > = $props();

    let ref = $state<HTMLElement | null>(null);

    let classes = $derived(variants({ color, shape, size, variant }));
</script>

<Button.Root
    class={classes.container({ class: containerClass })}
    bind:ref
    {...props}
>
    <StateLayer
        class={classes.stateLayer({ class: stateLayerClass })}
        target={ref}
    />

    {@render children?.()}
</Button.Root>
