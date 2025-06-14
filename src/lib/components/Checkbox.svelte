<script lang="ts" module>
    import { tv } from "$lib/style.js";

    export const variants = tv({
        slots: {
            container:
                "group/state-layer size-4.5 border-outline rounded-xxs not-ui-unchecked:bg-primary not-ui-unchecked:border-primary text-on-surface not-ui-unchecked:text-on-primary disabled:border-on-surface/38 disabled:not-ui-unchecked:bg-on-surface/38 disabled:not-ui-unchecked:border-transparent disabled:text-surface relative inline-flex cursor-pointer items-center justify-center border-2 transition-colors *:absolute disabled:cursor-default",
            icon: "size-3.5 fill-none stroke-current stroke-2 [stroke-linecap:butt] [stroke-linejoin:square]",
            stateLayer:
                "group-not-ui-unchecked/state-layer:text-primary size-10 rounded-full",
        },
    });
</script>

<script lang="ts">
    import { type WrapperProps } from "$lib/types/style.js";
    import { Checkbox } from "bits-ui";
    import { draw, fade } from "svelte/transition";

    import StateLayer from "./StateLayer.svelte";

    let {
        checked = $bindable(false),
        containerClass,
        iconClass,
        indeterminate = $bindable(false),
        ref = $bindable(null),
        stateLayerClass,
        ...props
    }: WrapperProps<Checkbox.RootProps, typeof variants> = $props();

    let classes = $derived(variants({}));
</script>

{#snippet icon(path: string)}
    <svg
        class={classes.icon({ class: iconClass })}
        viewBox="0 0 14 14"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d={path}
            in:draw={{ duration: 300 }}
            out:fade={{ duration: 300 }}
        />
    </svg>
{/snippet}

<Checkbox.Root
    class={classes.container({ class: containerClass })}
    bind:ref
    bind:checked
    bind:indeterminate
    {...props}
>
    {#snippet children({ checked, indeterminate })}
        <StateLayer
            containerClass={classes.stateLayer({ class: stateLayerClass })}
            target={ref}
        />

        {#if indeterminate}
            {@render icon("M 2 7 H 12")}
        {:else if checked}
            {@render icon("M 2.4 7.4 L 5 10 L 11.6 3.4")}
        {/if}
    {/snippet}
</Checkbox.Root>
