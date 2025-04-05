<script module lang="ts">
    import { tv } from "$lib/style.js";

    export const variants = tv({
        slots: {
            base: "group/state-layer focus-visible:outline-secondary disabled:text-on-surface/38 disabled:inset-shadow-transparent relative inline-flex h-10 w-10 cursor-pointer items-center justify-center overflow-clip rounded-full transition-all focus-visible:outline focus-visible:outline-offset-2 disabled:cursor-default",
            stateLayer: "absolute inset-0",
        },
        variants: {
            variant: {
                filled: {
                    base: "disabled:bg-on-surface/12",
                },
                tonal: {
                    base: "disabled:bg-on-surface/12",
                },
                outlined: {
                    base: "border-outline text-on-surface-variant disabled:border-on-surface/12 border",
                },
                standard: {
                    base: "text-on-surface-variant",
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
                variant: "filled",
                color: "error",
                class: { base: "bg-error text-on-error" },
            },
            {
                variant: "tonal",
                color: "error",
                class: { base: "bg-error-container text-on-error-container" },
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
        class: className,
        ref = $bindable(null),
        variant,
        color,
        icon,
        tooltip,
        ...props
    }: VariantProps<
        WithoutChildren<Button.RootProps>,
        typeof variants,
        "class",
        {
            icon: MaterialSymbol;
            tooltip?: string;
        }
    > = $props();

    let { base, stateLayer } = $derived(variants({ variant, color }));
</script>

{#snippet iconButton(additionalProps: Record<string, unknown> = {})}
    {@const mergedProps = mergeProps(props, additionalProps)}

    <Button.Root class={base({ className })} bind:ref {...mergedProps}>
        <StateLayer target={ref} class={stateLayer()} />

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
