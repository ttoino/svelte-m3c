<script module lang="ts">
    import { tv } from "$lib/style.js";

    export const variants = tv({
        slots: {
            container:
                "icon-4.5 text-label-l group/state-layer focus-visible:outline-secondary disabled:text-on-surface/38 relative inline-flex h-10 min-w-16 cursor-pointer items-center justify-center gap-2 overflow-clip whitespace-nowrap rounded-full px-6 transition-all focus-visible:outline focus-visible:outline-offset-2 disabled:cursor-default disabled:shadow-none disabled:pointer-events-none",
            stateLayer: "absolute inset-0",
        },
        variants: {
            variant: {
                elevated: {
                    container:
                        "bg-surface-container-low shadow-1 hover:shadow-2 active:shadow-1 disabled:bg-on-surface/12",
                },
                filled: {
                    container:
                        "hover:shadow-1 disabled:bg-on-surface/12 active:shadow-none",
                },
                tonal: {
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
            },
            color: {
                primary: {},
                secondary: {},
                tertiary: {},
                error: {},
            },
            icon: {
                true: { container: "pl-4" },
            },
        },
        compoundVariants: [
            {
                variant: ["elevated", "outlined", "text"],
                color: "primary",
                class: { container: "text-primary" },
            },
            {
                variant: "filled",
                color: "primary",
                class: { container: "bg-primary text-on-primary" },
            },
            {
                variant: "tonal",
                color: "primary",
                class: {
                    container: "bg-primary-container text-on-primary-container",
                },
            },
            {
                variant: "outlined",
                color: "primary",
                class: { container: "focus:border-primary" },
            },
            {
                variant: ["elevated", "outlined", "text"],
                color: "secondary",
                class: { container: "text-secondary" },
            },
            {
                variant: "filled",
                color: "secondary",
                class: { container: "bg-secondary text-on-secondary" },
            },
            {
                variant: "tonal",
                color: "secondary",
                class: {
                    container:
                        "bg-secondary-container text-on-secondary-container",
                },
            },
            {
                variant: "outlined",
                color: "secondary",
                class: { container: "focus:border-secondary" },
            },
            {
                variant: ["elevated", "outlined", "text"],
                color: "tertiary",
                class: { container: "text-tertiary" },
            },
            {
                variant: "filled",
                color: "tertiary",
                class: { container: "bg-tertiary text-on-tertiary" },
            },
            {
                variant: "tonal",
                color: "tertiary",
                class: {
                    container:
                        "bg-tertiary-container text-on-tertiary-container",
                },
            },
            {
                variant: "outlined",
                color: "tertiary",
                class: { container: "focus:border-tertiary" },
            },
            {
                variant: ["elevated", "outlined", "text"],
                color: "error",
                class: { container: "text-error" },
            },
            {
                variant: "filled",
                color: "error",
                class: { container: "bg-error text-on-error" },
            },
            {
                variant: "tonal",
                color: "error",
                class: {
                    container: "bg-error-container text-on-error-container",
                },
            },
            {
                variant: "outlined",
                color: "error",
                class: { container: "focus:border-error" },
            },
            {
                variant: "text",
                icon: true,
                class: { container: "pr-4" },
            },
        ],
        defaultVariants: {
            variant: "text",
            color: "primary",
            icon: false,
        },
    });
</script>

<script lang="ts">
    import { Button } from "bits-ui";
    import type { VariantProps } from "$lib/style.js";
    import StateLayer from "./StateLayer.svelte";
    import type { MaterialSymbol } from "material-symbols";
    import Icon from "./Icon.svelte";

    let {
        ref = $bindable(),
        containerClass,
        iconClass,
        stateLayerClass,
        variant,
        color,
        children,
        icon,
        ...props
    }: VariantProps<
        Button.RootProps,
        typeof variants,
        "containerClass" | "iconClass" | "stateLayerClass",
        {
            icon?: MaterialSymbol;
        }
    > = $props();

    let classes = $derived(
        variants({ variant, color, icon: icon !== undefined }),
    );
</script>

<Button.Root
    class={classes.container({ class: containerClass })}
    bind:ref
    {...props}
>
    <StateLayer
        target={ref}
        class={classes.stateLayer({ class: stateLayerClass })}
    />

    {#if icon}
        <Icon {icon} class={iconClass} />
    {/if}

    {@render children?.()}
</Button.Root>
