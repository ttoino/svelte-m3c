<script module lang="ts">
    // TODO: Search view
    import { tv } from "$lib/style.js";

    export const variants = tv({
        slots: {
            container:
                "shadow-3 bg-surface-container-highest group/state-layer max-w-180 relative flex h-14 w-full cursor-text flex-row items-center gap-4 rounded-full px-4",
            input: "text-on-surface peer/search-bar-input outline-none",
            label: "text-on-surface-variant peer-not-placeholder-shown/search-bar-input:opacity-0 absolute inset-0",
            labelContainer: "text-body-l relative flex-1",
            leading: "text-on-surface",
            stateLayer: "absolute inset-0 rounded-full",
            trailing: "text-on-surface-variant",
        },
    });
</script>

<script lang="ts">
    import type { VariantProps } from "$lib/types/style.js";
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    import Icon from "./Icon.svelte";
    import StateLayer from "./StateLayer.svelte";

    let {
        class: className,
        label = defaultLabel,
        leading = defaultLeading,
        placeholder = "",
        trailing,
        ...props
    }: VariantProps<
        HTMLAttributes<HTMLInputElement>,
        typeof variants,
        "class",
        {
            label?: Snippet;
            leading?: Snippet;
            trailing?: Snippet;
        }
    > = $props();

    let classes = $derived(variants({}));
</script>

{#snippet defaultLabel()}Search{/snippet}
{#snippet defaultLeading()}<Icon icon="search" />{/snippet}

<label class={classes.container({ className })}>
    {@render leading()}

    <div class={classes.labelContainer({})}>
        <input
            class={classes.input({})}
            type="search"
            {placeholder}
            {...props}
        />
        <span class={classes.label({})}>{@render label()}</span>
    </div>

    {@render trailing?.()}

    <StateLayer class={classes.stateLayer()} focus="none" />
</label>
