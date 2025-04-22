<script module lang="ts">
    import { tv } from "$lib/style.js";

    export const variants = tv({
        compoundVariants: [
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
        ],
        defaultVariants: {
            color: "primary",
            variant: "standard",
        },
        slots: {
            container:
                "group/state-layer focus-visible:outline-secondary disabled:text-on-surface/38 disabled:inset-shadow-transparent relative inline-flex h-10 w-10 cursor-pointer items-center justify-center overflow-clip rounded-full transition-all focus-visible:outline focus-visible:outline-offset-2 disabled:pointer-events-none disabled:cursor-default",
            stateLayer: "absolute inset-0",
        },
        variants: {
            color: {
                error: {},
                primary: {},
                secondary: {},
                tertiary: {},
            },
            variant: {
                filled: {
                    container: "disabled:bg-on-surface/12",
                },
                outlined: {
                    container:
                        "border-outline text-on-surface-variant disabled:border-on-surface/12 border",
                },
                standard: {
                    container: "text-on-surface-variant",
                },
                tonal: {
                    container: "disabled:bg-on-surface/12",
                },
            },
        },
    });
</script>

<script lang="ts">
    import type { VariantProps } from "$lib/style.js";
    import type { MaterialSymbol } from "material-symbols";

    import { Button, mergeProps, type WithoutChildren } from "bits-ui";

    import Icon from "./Icon.svelte";
    import StateLayer from "./StateLayer.svelte";
    import Tooltip from "./Tooltip.svelte";
    import TooltipRoot from "./TooltipRoot.svelte";
    import TooltipTrigger from "./TooltipTrigger.svelte";

    let {
        color,
        containerClass,
        icon,
        ref = $bindable(null),
        stateLayerClass,
        tooltip,
        variant,
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

    let classes = $derived(variants({ color, variant }));
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
