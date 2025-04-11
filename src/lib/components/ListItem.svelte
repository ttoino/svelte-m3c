<script module lang="ts">
    import { tv } from "$lib/style.js";

    export const variants = tv({
        slots: {
            container: "bg-surface min-h-[calc(var(--spacing)*(10+4*var(--lines))))] group/list-item group/state-layer text-on-surface relative flex flex-row gap-4 px-4",
            leading:
                "group-disabled/list-item:text-on-surface/38 shrink-0 has-[video]:-ml-4 has-[img]:h-14 has-[video]:h-16",
            text: "flex flex-grow flex-col justify-center self-stretch",
            labelText:
                "text-body-l group-disabled/list-item:text-on-surface/38",
            supportingText:
                "text-body-m text-on-surface-variant group-disabled/list-item:text-on-surface/38",
            trailing:
                "text-on-surface-variant text-label-s group-disabled/list-item:text-on-surface/38 shrink-0",
            stateLayer: "absolute inset-0",
        },
        variants: {
            threeOrMoreLines: {
                false: { container: "items-center py-2" },
                true: { container: "items-start py-3" },
            },
        },
    });
</script>

<script lang="ts">
    import { type VariantProps } from "$lib/style.js";
    import type { WithoutChildren } from "bits-ui";
    import type { HTMLAttributes } from "svelte/elements";
    import StateLayer from "./StateLayer.svelte";
    import type { Snippet } from "svelte";
    import { getLines } from "$lib/elements.js";

    let {
        containerClass,
        leadingClass,
        textClass,
        labelTextClass,
        supportingTextClass,
        trailingClass,
        stateLayerClass,
        lines,
        leading,
        labelText,
        supportingText,
        trailing,
        ...props
    }: VariantProps<
        WithoutChildren<HTMLAttributes<HTMLDivElement>>,
        typeof variants,
        | "containerClass"
        | "leadingClass"
        | "textClass"
        | "labelTextClass"
        | "supportingTextClass"
        | "trailingClass"
        | "stateLayerClass",
        {
            lines?: number;
            leading?: Snippet;
            labelText?: Snippet;
            supportingText?: Snippet;
            trailing?: Snippet;
            threeOrMoreLines?: never;
        }
    > = $props();

    let textEl: HTMLElement | undefined = $state(undefined);
    let finalLines = $derived(lines ?? (textEl ? getLines(textEl) : 1));

    let classes = $derived(variants({ threeOrMoreLines: finalLines >= 3 }));
</script>

<div class={classes.container({ class: containerClass })} style="--lines: {lines}" {...props}>
    <StateLayer class={classes.stateLayer()} />

    {#if leading}
        <div class={classes.leading({ class: leadingClass })}>
            {@render leading()}
        </div>
    {/if}

    {#if labelText || supportingText}
        <div class={classes.text({ class: textClass })} bind:this={textEl}>
            {#if labelText}
                <span class={classes.labelText({ class: labelTextClass })}
                    >{@render labelText()}</span
                >
            {/if}

            {#if supportingText}
                <span
                    class={classes.supportingText({
                        class: supportingTextClass,
                    })}>{@render supportingText()}</span
                >
            {/if}
        </div>
    {/if}

    {#if trailing}
        <div class={classes.trailing({ class: trailingClass })}>
            {@render trailing()}
        </div>
    {/if}
</div>
