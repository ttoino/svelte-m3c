<script module lang="ts">
    import { tv } from "$lib/style.js";
    import { variants as baseVariants } from "./IconButton.svelte";

    export const variants = tv({
        extend: baseVariants,
        slots: {
            container:
                "ui-on:icon-filled ui-on:icon-grade-high whitespace-nowrap",
        },
        variants: {
            variant: {
                filled: {
                    container: "ui-off:bg-surface-container-highest",
                },
                tonal: {
                    container:
                        "ui-off:bg-surface-container-highest ui-off:text-on-surface-variant",
                },
                outlined: {
                    container:
                        "ui-on:bg-inverse-surface ui-on:text-inverse-on-surface ui-on:disabled:bg-on-surface/12 ui-on:border-none bg-transparent",
                },
            },
        },
        compoundVariants: [
            {
                variant: "filled",
                color: "primary",
                class: { container: "ui-off:text-primary" },
            },
            {
                variant: "standard",
                color: "primary",
                class: { container: "ui-on:text-primary" },
            },
            {
                variant: "filled",
                color: "secondary",
                class: { container: "ui-off:text-secondary" },
            },
            {
                variant: "standard",
                color: "secondary",
                class: { container: "ui-on:text-secondary" },
            },
            {
                variant: "filled",
                color: "tertiary",
                class: { container: "ui-off:text-tertiary" },
            },
            {
                variant: "standard",
                color: "tertiary",
                class: { container: "ui-on:text-tertiary" },
            },
            {
                variant: "filled",
                color: "error",
                class: { container: "ui-off:text-error" },
            },
            {
                variant: "standard",
                color: "error",
                class: { container: "ui-on:text-error" },
            },
        ],
    });
</script>

<script lang="ts">
    import { Toggle, type WithoutChildren } from "bits-ui";
    import type { VariantProps } from "$lib/style.js";
    import Icon from "./Icon.svelte";
    import StateLayer from "./StateLayer.svelte";
    import type { MaterialSymbol } from "material-symbols";

    let {
        containerClass,
        stateLayerClass,
        variant,
        color,
        icon,
        ref = $bindable(null),
        pressed = $bindable(false),
        ...props
    }: VariantProps<
        WithoutChildren<Toggle.RootProps>,
        typeof variants,
        "containerClass" | "stateLayerClass",
        {
            icon: MaterialSymbol;
        }
    > = $props();

    const classes = variants({ variant, color });
</script>

<Toggle.Root
    class={classes.container({ class: containerClass })}
    bind:ref
    bind:pressed
    {...props}
>
    <StateLayer
        target={ref}
        class={classes.stateLayer({ class: stateLayerClass })}
    />

    <Icon class="transition-[font-variation-settings]" {icon} />
</Toggle.Root>
