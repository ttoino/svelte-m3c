<script lang="ts">
    import { twMerge, type ClassProps } from "$lib/style.js";
    import { Checkbox } from "bits-ui";
    import { draw, fade } from "svelte/transition";
    import StateLayer from "./StateLayer.svelte";

    let {
        ref = $bindable(null),
        checked = $bindable(false),
        indeterminate = $bindable(false),
        class: className,
        ...props
    }: ClassProps<Checkbox.RootProps> = $props();
</script>

<Checkbox.Root
    class={twMerge(
        "group/state-layer size-4.5 border-outline rounded-xxs not-ui-unchecked:bg-primary not-ui-unchecked:border-primary text-on-surface not-ui-unchecked:text-on-primary disabled:border-on-surface/38 disabled:not-ui-unchecked:bg-on-surface/38 disabled:not-ui-unchecked:border-transparent disabled:text-surface relative inline-flex cursor-pointer items-center justify-center border-2 transition-colors *:absolute disabled:cursor-default",
        className,
    )}
    bind:ref
    bind:checked
    bind:indeterminate
    {...props}
>
    {#snippet children({ checked, indeterminate })}
        <StateLayer
            class={twMerge("size-10 rounded-full")}
            commonClass={twMerge(
                "group-not-ui-unchecked/state-layer:bg-primary",
            )}
            target={ref}
        />

        {#if indeterminate}
            <svg
                class="size-3.5 fill-none stroke-current stroke-2 [stroke-linecap:butt] [stroke-linejoin:square]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 14 14"
            >
                <path
                    in:draw={{ duration: 300 }}
                    out:fade={{ duration: 300 }}
                    d="M 2 7 H 12"
                />
            </svg>
        {:else if checked}
            <svg
                class="size-3.5 fill-none stroke-current stroke-2 [stroke-linecap:butt] [stroke-linejoin:square]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 14 14"
            >
                <path
                    in:draw={{ duration: 300 }}
                    out:fade={{ duration: 300 }}
                    d="M 2.4 7.4 L 5 10 L 11.6 3.4"
                />
            </svg>
        {/if}
    {/snippet}
</Checkbox.Root>
