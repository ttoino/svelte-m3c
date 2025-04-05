<script module lang="ts">
    import { tv } from "$lib/style.js";

    export const variants = tv({
        slots: {
            base: "icon-4.5 text-label-l group/state-layer focus-visible:outline-secondary disabled:text-on-surface/38 relative inline-flex h-10 min-w-16 cursor-pointer items-center justify-center gap-2 overflow-clip whitespace-nowrap rounded-full px-6 transition-all focus-visible:outline focus-visible:outline-offset-2 disabled:cursor-default disabled:shadow-none",
            stateLayer: "absolute inset-0",
        },
        variants: {
            variant: {
                elevated: {
                    base: "bg-surface-container-low shadow-1 hover:shadow-2 active:shadow-1 disabled:bg-on-surface/12",
                },
                filled: {
                    base: "hover:shadow-1 disabled:bg-on-surface/12 active:shadow-none",
                },
                tonal: {
                    base: "hover:shadow-1 disabled:bg-on-surface/12 active:shadow-none",
                },
                outlined: {
                    base: "border-outline disabled:border-on-surface/12 border",
                },
                text: {
                    base: "px-3",
                },
            },
            color: {
                primary: {},
                secondary: {},
                tertiary: {},
                error: {},
            },
        },
        compoundVariants: [
            {
                variant: ["elevated", "outlined", "text"],
                color: "primary",
                class: { base: "text-primary" },
            },
            {
                variant: "filled",
                color: "primary",
                class: { base: "bg-primary text-on-primary" },
            },
            {
                variant: "tonal",
                color: "primary",
                class: {
                    base: "bg-primary-container text-on-primary-container",
                },
            },
            {
                variant: "outlined",
                color: "primary",
                class: { base: "focus:border-primary" },
            },
            {
                variant: ["elevated", "outlined", "text"],
                color: "secondary",
                class: { base: "text-secondary" },
            },
            {
                variant: "filled",
                color: "secondary",
                class: { base: "bg-secondary text-on-secondary" },
            },
            {
                variant: "tonal",
                color: "secondary",
                class: {
                    base: "bg-secondary-container text-on-secondary-container",
                },
            },
            {
                variant: "outlined",
                color: "secondary",
                class: { base: "focus:border-secondary" },
            },
            {
                variant: ["elevated", "outlined", "text"],
                color: "tertiary",
                class: { base: "text-tertiary" },
            },
            {
                variant: "filled",
                color: "tertiary",
                class: { base: "bg-tertiary text-on-tertiary" },
            },
            {
                variant: "tonal",
                color: "tertiary",
                class: {
                    base: "bg-tertiary-container text-on-tertiary-container",
                },
            },
            {
                variant: "outlined",
                color: "tertiary",
                class: { base: "focus:border-tertiary" },
            },
            {
                variant: ["elevated", "outlined", "text"],
                color: "error",
                class: { base: "text-error" },
            },
            {
                variant: "filled",
                color: "error",
                class: { base: "bg-error text-on-error" },
            },
            {
                variant: "tonal",
                color: "error",
                class: {
                    base: "bg-error-container text-on-error-container",
                },
            },
            {
                variant: "outlined",
                color: "error",
                class: { base: "focus:border-error" },
            },
        ],
        defaultVariants: {
            variant: "text",
            color: "primary",
        },
    });
</script>

<script lang="ts">
    import { Button } from "bits-ui";
    import type { VariantProps } from "$lib/style.js";
    import StateLayer from "./StateLayer.svelte";

    let {
        ref = $bindable(),
        class: className,
        variant,
        color,
        children,
        ...props
    }: VariantProps<Button.RootProps, typeof variants> = $props();

    let { base, stateLayer } = $derived(variants({ variant, color }));
</script>

<Button.Root class={base({ className })} bind:ref {...props}>
    <StateLayer target={ref} class={stateLayer()} />

    {@render children?.()}
</Button.Root>
