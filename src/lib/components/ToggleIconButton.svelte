<script module lang="ts">
    import { tv } from "$lib/style.js";
    import { variants as baseVariants } from "./IconButton.svelte";

    export const variants = tv({
        extend: baseVariants,
        slots: {
            base: "ui-on:icon-filled ui-on:icon-grade-high whitespace-nowrap",
        },
        variants: {
            variant: {
                filled: {
                    base: "ui-off:bg-surface-container-highest",
                },
                tonal: {
                    base: "ui-off:bg-surface-container-highest ui-off:text-on-surface-variant",
                },
                outlined: {
                    base: "ui-on:bg-inverse-surface ui-on:text-inverse-on-surface ui-on:disabled:bg-on-surface/12 ui-on:border-none bg-transparent",
                },
            },
        },
        compoundVariants: [
            {
                variant: "filled",
                color: "primary",
                class: { base: "ui-off:text-primary" },
            },
            {
                variant: "standard",
                color: "primary",
                class: { base: "ui-on:text-primary" },
            },
            {
                variant: "filled",
                color: "secondary",
                class: { base: "ui-off:text-secondary" },
            },
            {
                variant: "standard",
                color: "secondary",
                class: { base: "ui-on:text-secondary" },
            },
            {
                variant: "filled",
                color: "tertiary",
                class: { base: "ui-off:text-tertiary" },
            },
            {
                variant: "standard",
                color: "tertiary",
                class: { base: "ui-on:text-tertiary" },
            },
            {
                variant: "filled",
                color: "error",
                class: { base: "ui-off:text-error" },
            },
            {
                variant: "standard",
                color: "error",
                class: { base: "ui-on:text-error" },
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
        class: className,
        variant,
        color,
        icon,
        ref = $bindable(null),
        pressed = $bindable(false),
        ...props
    }: VariantProps<
        WithoutChildren<Toggle.RootProps>,
        typeof variants,
        "class",
        {
            icon: MaterialSymbol;
        }
    > = $props();

    const { base, stateLayer } = variants({ variant, color });
</script>

<Toggle.Root class={base({ className })} bind:ref bind:pressed {...props}>
    <StateLayer target={ref} class={stateLayer()} />

    <Icon class="transition-[font-variation-settings]" {icon} />
</Toggle.Root>
