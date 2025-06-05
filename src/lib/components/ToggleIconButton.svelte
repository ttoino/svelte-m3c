<script module lang="ts">
    import { tv } from "$lib/style.js";

    import { variants as baseVariants } from "./IconButton.svelte";

    export const variants = tv({
        compoundVariants: [
            {
                class: { container: "ui-off:text-primary" },
                color: "primary",
                variant: "filled",
            },
            {
                class: { container: "ui-on:text-primary" },
                color: "primary",
                variant: "standard",
            },
            {
                class: { container: "ui-off:text-secondary" },
                color: "secondary",
                variant: "filled",
            },
            {
                class: { container: "ui-on:text-secondary" },
                color: "secondary",
                variant: "standard",
            },
            {
                class: { container: "ui-off:text-tertiary" },
                color: "tertiary",
                variant: "filled",
            },
            {
                class: { container: "ui-on:text-tertiary" },
                color: "tertiary",
                variant: "standard",
            },
            {
                class: { container: "ui-off:text-error" },
                color: "error",
                variant: "filled",
            },
            {
                class: { container: "ui-on:text-error" },
                color: "error",
                variant: "standard",
            },
        ],
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
                outlined: {
                    container:
                        "ui-on:bg-inverse-surface ui-on:text-inverse-on-surface ui-on:disabled:bg-on-surface/12 ui-on:border-none bg-transparent",
                },
                tonal: {
                    container:
                        "ui-off:bg-surface-container-highest ui-off:text-on-surface-variant",
                },
            },
        },
    });
</script>

<script lang="ts">
    import type { VariantProps } from "$lib/types/style.js";
    import type { MaterialSymbol } from "material-symbols";

    import { Toggle, type WithoutChildren } from "bits-ui";

    import Icon from "./Icon.svelte";
    import StateLayer from "./StateLayer.svelte";

    let {
        color,
        containerClass,
        icon,
        pressed = $bindable(false),
        ref = $bindable(null),
        stateLayerClass,
        variant,
        ...props
    }: VariantProps<
        WithoutChildren<Toggle.RootProps>,
        typeof variants,
        "containerClass" | "stateLayerClass",
        {
            icon: MaterialSymbol;
        }
    > = $props();

    const classes = variants({ color, variant });
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
