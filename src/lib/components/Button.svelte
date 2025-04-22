<script module lang="ts">
    import { tv } from "$lib/style.js";

    export const variants = tv({
        compoundVariants: [
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
            {
                class: { container: "pr-4" },
                icon: true,
                variant: "text",
            },
        ],
        defaultVariants: {
            color: "primary",
            icon: false,
            variant: "text",
        },
        slots: {
            container:
                "icon-4.5 text-label-l group/state-layer focus-visible:outline-secondary disabled:text-on-surface/38 relative inline-flex h-10 min-w-16 cursor-pointer items-center justify-center gap-2 overflow-clip whitespace-nowrap rounded-full px-6 transition-all focus-visible:outline focus-visible:outline-offset-2 disabled:pointer-events-none disabled:cursor-default disabled:shadow-none",
            stateLayer: "absolute inset-0",
        },
        variants: {
            color: {
                error: {},
                primary: {},
                secondary: {},
                tertiary: {},
            },
            icon: {
                true: { container: "pl-4" },
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
    import type { VariantProps } from "$lib/style.js";
    import type { MaterialSymbol } from "material-symbols";

    import { Button } from "bits-ui";

    import Icon from "./Icon.svelte";
    import StateLayer from "./StateLayer.svelte";

    let {
        children,
        color,
        containerClass,
        icon,
        iconClass,
        ref = $bindable(),
        stateLayerClass,
        variant,
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
        variants({ color, icon: icon !== undefined, variant }),
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
