<script lang="ts" module>
    import { tv } from "$lib/style.js";

    import { variants as base } from "./Button.svelte";

    // TODO: Check if colors are correct
    export const variants = tv({
        compoundVariants: [
            {
                class: {container: "ui-on:bg-primary ui-on:text-on-primary"},
                color: "primary",
                variant: "elevated",
            },
            {
                class: {container: "ui-on:bg-secondary ui-on:text-on-secondary"},
                color: "secondary",
                variant: "elevated",
            },
            {
                class: {container: "ui-on:bg-tertiary ui-on:text-on-tertiary"},
                color: "tertiary",
                variant: "elevated",
            },
            {
                class: {container: "ui-on:bg-error ui-on:text-on-error"},
                color: "error",
                variant: "elevated",
            },
            {
                class: {container: "bg-surface-container text-on-surface-variant ui-on:bg-primary ui-on:text-on-primary"},
                color: "primary",
                variant: "filled",
            },
            {
                class: {container: "bg-surface-container text-on-surface-variant ui-on:bg-secondary ui-on:text-on-secondary"},
                color: "secondary",
                variant: "filled",
            },
            {
                class: {container: "bg-surface-container text-on-surface-variant ui-on:bg-tertiary ui-on:text-on-tertiary"},
                color: "tertiary",
                variant: "filled",
            },
            {
                class: {container: "bg-surface-container text-on-surface-variant ui-on:bg-error ui-on:text-on-error"},
                color: "error",
                variant: "filled",
            },
            {
                class: {container: "bg-primary-container text-on-primary-container ui-on:bg-primary ui-on:text-on-primary"},
                color: "primary",
                variant: "tonal",
            },
            {
                class: {container: "bg-secondary-container text-on-secondary-container ui-on:bg-secondary ui-on:text-on-secondary"},
                color: "secondary",
                variant: "tonal",
            },
            {
                class: {container: "bg-tertiary-container text-on-tertiary-container ui-on:bg-tertiary ui-on:text-on-tertiary"},
                color: "tertiary",
                variant: "tonal",
            },
            {
                class: {container: "bg-error-container text-on-error-container ui-on:bg-error ui-on:text-on-error"},
                color: "error",
                variant: "tonal",
            },
            {
                class: {container: "ui-on:bg-inverse-surface ui-on:outline-inverse-surface ui-on:text-inverse-on-surface"},
                color: "primary",
                variant: "outlined",
            },
            {
                class: {container: "ui-on:bg-inverse-surface ui-on:outline-inverse-surface ui-on:text-inverse-on-surface"},
                color: "secondary",
                variant: "outlined",
            },
            {
                class: {container: "ui-on:bg-inverse-surface ui-on:outline-inverse-surface ui-on:text-inverse-on-surface"},
                color: "tertiary",
                variant: "outlined",
            },
            {
                class: {container: "ui-on:bg-inverse-surface ui-on:outline-inverse-surface ui-on:text-inverse-on-surface"},
                color: "error",
                variant: "outlined",
            },
            {
                class: {container: "text-on-surface-variant ui-on:text-primary"},
                color: "primary",
                variant: "text",
            },
            {
                class: {container: "text-on-surface-variant ui-on:text-secondary"},
                color: "secondary",
                variant: "text",
            },
            {
                class: {container: "text-on-surface-variant ui-on:text-tertiary"},
                color: "tertiary",
                variant: "text",
            },
            {
                class: {container: "text-on-surface-variant ui-on:text-error"},
                color: "error",
                variant: "text",
            },
        ],
        extend: base,
        slots: {
            container:
                "ui-on:icon-filled ui-on:icon-grade-high",
        },
    });
</script>

<script lang="ts">
    import type { VariantProps } from "$lib/types/style.js";

    import { Toggle, ToggleGroup } from "bits-ui";

    import StateLayer from "./StateLayer.svelte";
    import { getButtonColor, getButtonShape, getButtonSize, getButtonVariant, getIconButtonWidth, isInButtonGroup } from "$lib/context/button.js";

    const contextColor = getButtonColor();
    const contextShape = getButtonShape();
    const contextSize = getButtonSize();
    const contextVariant = getButtonVariant();

    const inButtonGroup = isInButtonGroup();
    let Component = inButtonGroup ? ToggleGroup.Item : Toggle.Root

    let {
        color = contextColor,
        children,
        containerClass,
        pressed = $bindable(false),
        ref = $bindable(null),
        stateLayerClass,
        variant = contextVariant,
        shape = contextShape,
        size = contextSize,
        ...props
    }: VariantProps<
        Toggle.RootProps & ToggleGroup.ItemProps,
        typeof variants,
        "containerClass" | "stateLayerClass"
    > = $props();

    const classes = variants({ color, variant, shape, size });
</script>

<Component
    class={classes.container({ class: containerClass })}
    bind:ref
    bind:pressed
    {...props}
>
    {#snippet children(args)}
    <StateLayer
        class={classes.stateLayer({ class: stateLayerClass })}
        target={ref}
    />

    {@render children?.(args)}
    {/snippet}
</Component>
