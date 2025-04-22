<script module lang="ts">
    import { tv } from "$lib/style.js";

    export const variants = tv({
        slots: {
            container:
                "group/state-layer focus-visible:outline-secondary disabled:text-on-surface/38 disabled:inset-shadow-transparent relative inline-flex h-10 w-10 cursor-pointer items-center justify-center overflow-clip rounded-full transition-all focus-visible:outline focus-visible:outline-offset-2 disabled:cursor-default disabled:pointer-events-none",
            stateLayer: "absolute inset-0",
        },
        variants: {
            variant: {
                filled: {
                    container: "disabled:bg-on-surface/12",
                },
                tonal: {
                    container: "disabled:bg-on-surface/12",
                },
                outlined: {
                    container:
                        "border-outline text-on-surface-variant disabled:border-on-surface/12 border",
                },
                standard: {
                    container: "text-on-surface-variant",
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
        ],
        defaultVariants: {
            variant: "standard",
            color: "primary",
        },
    });
</script>

<script lang="ts">
    import { Button, mergeProps, type WithoutChildren } from "bits-ui";
    import type { VariantProps } from "$lib/style.js";
    import Icon from "./Icon.svelte";
    import StateLayer from "./StateLayer.svelte";
    import type { MaterialSymbol } from "material-symbols";
    import TooltipRoot from "./TooltipRoot.svelte";
    import Tooltip from "./Tooltip.svelte";
    import TooltipTrigger from "./TooltipTrigger.svelte";

    let {
        containerClass,
        stateLayerClass,
        ref = $bindable(null),
        variant,
        color,
        icon,
        tooltip,
        ...props
    }: VariantProps<
        WithoutChildren<Button.RootProps>,
        typeof variants,
        "containerClass" | "stateLayerClass",
        {
            icon: MaterialSymbol;
            tooltip?: string;
        }
    > = $props();

    let classes = $derived(variants({ variant, color }));
</script>

{#snippet iconButton(additionalProps: Record<string, unknown> = {})}
    {@const mergedProps = mergeProps(props, additionalProps)}

    <Button.Root
        class={classes.container({ class: containerClass })}
        bind:ref
        {...mergedProps}
    >
        <StateLayer
            target={ref}
            class={classes.stateLayer({ class: stateLayerClass })}
        />

        <Icon {icon} />
    </Button.Root>
{/snippet}

{#if tooltip}
    <TooltipRoot>
        <Tooltip>{tooltip}</Tooltip>

        <TooltipTrigger>
            {#snippet child({ props })}
                {@render iconButton(props)}
            {/snippet}
        </TooltipTrigger>
    </TooltipRoot>
{:else}
    {@render iconButton()}
{/if}
