<script lang="ts" module>
    // TODO: Search view
    import { mergeVariants, tv } from "$lib/style.js";

    export const variantsConfig = mergeVariants({
        slots: {
            container:
                "group/state-layer relative flex h-14 w-full max-w-180 cursor-text flex-row items-center gap-4 rounded-full bg-surface-container-highest px-4 shadow-3",
            input: "peer/search-bar-input text-on-surface outline-none",
            label: "absolute inset-0 text-on-surface-variant peer-not-placeholder-shown/search-bar-input:opacity-0",
            labelContainer: "relative flex-1 text-body-l",
            leading: "text-on-surface",
            stateLayer: "absolute inset-0 rounded-full",
            trailing: "text-on-surface-variant",
        },
    });

    export const variants = tv(variantsConfig);
</script>

<script lang="ts">
    import type { WrapperProps } from "$lib/types/style.js";
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    import Icon from "./Icon.svelte";
    import StateLayer from "./StateLayer.svelte";

    let {
        containerClass,
        inputClass,
        label = defaultLabel,
        labelClass,
        labelContainerClass,
        leading = defaultLeading,
        leadingClass,
        placeholder = "",
        stateLayerClass,
        trailing,
        trailingClass,
        ...props
    }: WrapperProps<
        HTMLAttributes<HTMLInputElement>,
        typeof variants,
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

<label class={classes.container({ class: containerClass })}>
    <span class={classes.leading({ class: leadingClass })}>
        {@render leading()}
    </span>

    <div class={classes.labelContainer({ class: labelContainerClass })}>
        <input
            class={classes.input({ class: inputClass })}
            {placeholder}
            type="search"
            {...props}
        />
        <span class={classes.label({ class: labelClass })}>
            {@render label()}
        </span>
    </div>

    {#if trailing}
        <span class={classes.trailing({ class: trailingClass })}>
            {@render trailing()}
        </span>
    {/if}

    <StateLayer
        containerClass={classes.stateLayer({ class: stateLayerClass })}
        focus="none"
    />
</label>
