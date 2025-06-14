<script lang="ts" module>
    import { tv } from "$lib/style.js";

    import { variants as base } from "./Button.svelte";

    // TODO: Check if colors are correct
    export const variants = tv({
        compoundVariants: [
            {
                class: { container: "ui-on:bg-primary ui-on:text-on-primary" },
                color: "primary",
                variant: "elevated",
            },
            {
                class: {
                    container: "ui-on:bg-secondary ui-on:text-on-secondary",
                },
                color: "secondary",
                variant: "elevated",
            },
            {
                class: {
                    container: "ui-on:bg-tertiary ui-on:text-on-tertiary",
                },
                color: "tertiary",
                variant: "elevated",
            },
            {
                class: { container: "ui-on:bg-error ui-on:text-on-error" },
                color: "error",
                variant: "elevated",
            },
            {
                class: {
                    container:
                        "bg-surface-container text-on-surface-variant ui-on:bg-primary ui-on:text-on-primary",
                },
                color: "primary",
                variant: "filled",
            },
            {
                class: {
                    container:
                        "bg-surface-container text-on-surface-variant ui-on:bg-secondary ui-on:text-on-secondary",
                },
                color: "secondary",
                variant: "filled",
            },
            {
                class: {
                    container:
                        "bg-surface-container text-on-surface-variant ui-on:bg-tertiary ui-on:text-on-tertiary",
                },
                color: "tertiary",
                variant: "filled",
            },
            {
                class: {
                    container:
                        "bg-surface-container text-on-surface-variant ui-on:bg-error ui-on:text-on-error",
                },
                color: "error",
                variant: "filled",
            },
            {
                class: {
                    container: "ui-on:bg-primary ui-on:text-on-primary",
                },
                color: "primary",
                variant: "tonal",
            },
            {
                class: {
                    container: "ui-on:bg-secondary ui-on:text-on-secondary",
                },
                color: "secondary",
                variant: "tonal",
            },
            {
                class: {
                    container: "ui-on:bg-tertiary ui-on:text-on-tertiary",
                },
                color: "tertiary",
                variant: "tonal",
            },
            {
                class: {
                    container: "ui-on:bg-error ui-on:text-on-error",
                },
                color: "error",
                variant: "tonal",
            },
            {
                class: {
                    container: "text-on-surface-variant ui-on:text-primary",
                },
                color: "primary",
                variant: "text",
            },
            {
                class: {
                    container: "text-on-surface-variant ui-on:text-secondary",
                },
                color: "secondary",
                variant: "text",
            },
            {
                class: {
                    container: "text-on-surface-variant ui-on:text-tertiary",
                },
                color: "tertiary",
                variant: "text",
            },
            {
                class: {
                    container: "text-on-surface-variant ui-on:text-error",
                },
                color: "error",
                variant: "text",
            },
        ],
        extend: base,
        slots: {
            container: "ui-on:icon-filled ui-on:icon-grade-high",
        },
        variants: {
            variant: {
                outlined: {
                    container:
                        "ui-on:bg-inverse-surface ui-on:outline-inverse-surface ui-on:text-inverse-on-surface",
                },
            },
        },
    });
</script>

<script lang="ts">
    import type { WrapperProps } from "$lib/types/style.js";

    import {
        getButtonColor,
        getButtonShape,
        getButtonSize,
        getButtonVariant,
        isInToggleButtonGroup,
    } from "$lib/context/button.js";
    import { Toggle, ToggleGroup } from "bits-ui";

    import StateLayer from "./StateLayer.svelte";

    const contextColor = getButtonColor();
    const contextShape = getButtonShape();
    const contextSize = getButtonSize();
    const contextVariant = getButtonVariant();

    const inToggleButtonGroup = isInToggleButtonGroup();
    const Component = inToggleButtonGroup ? ToggleGroup.Item : Toggle.Root;

    let {
        children: baseChildren,
        color = contextColor,
        containerClass,
        pressed = $bindable(false),
        ref = $bindable(null),
        shape = contextShape,
        size = contextSize,
        stateLayerClass,
        variant = contextVariant,
        ...props
    }: WrapperProps<
        Toggle.RootProps & ToggleGroup.ItemProps,
        typeof variants
    > = $props();

    const classes = variants({ color, shape, size, variant });
</script>

<Component
    class={classes.container({ class: containerClass })}
    bind:ref
    bind:pressed
    {...props}
>
    {#snippet children(args)}
        <StateLayer
            containerClass={classes.stateLayer({ class: stateLayerClass })}
            target={ref}
        />

        {@render baseChildren?.(args)}
    {/snippet}
</Component>
