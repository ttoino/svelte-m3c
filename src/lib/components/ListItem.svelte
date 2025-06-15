<script lang="ts" module>
    import { mergeVariants, tv } from "$lib/style.js";

    export const variantsConfig = mergeVariants({
        slots: {
            container:
                "bg-surface min-h-[calc(var(--spacing)*(10+4*var(--lines))))] group/list-item group/state-layer text-on-surface relative flex flex-row gap-4 px-4",
            labelText:
                "text-body-l group-disabled/list-item:text-on-surface/38",
            leading:
                "group-disabled/list-item:text-on-surface/38 shrink-0 has-[video]:-ml-4 has-[img]:h-14 has-[video]:h-16",
            stateLayer: "absolute inset-0",
            supportingText:
                "text-body-m text-on-surface-variant group-disabled/list-item:text-on-surface/38",
            text: "flex flex-grow flex-col justify-center self-stretch",
            trailing:
                "text-on-surface-variant text-label-s group-disabled/list-item:text-on-surface/38 shrink-0",
        },
        variants: {
            threeOrMoreLines: {
                false: { container: "items-center py-2" },
                true: { container: "items-start py-3" },
            },
        },
    });

    export const variants = tv(variantsConfig);
</script>

<script lang="ts">
    import type { WithoutChildren } from "bits-ui";
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    import { getLines } from "$lib/elements.js";
    import { type WrapperProps } from "$lib/types/style.js";

    import StateLayer from "./StateLayer.svelte";

    let {
        containerClass,
        labelText,
        labelTextClass,
        leading,
        leadingClass,
        lines,
        stateLayerClass,
        supportingText,
        supportingTextClass,
        textClass,
        trailing,
        trailingClass,
        ...props
    }: WrapperProps<
        WithoutChildren<HTMLAttributes<HTMLDivElement>>,
        typeof variants,
        {
            labelText?: Snippet;
            leading?: Snippet;
            lines?: number;
            supportingText?: Snippet;
            threeOrMoreLines?: never;
            trailing?: Snippet;
        }
    > = $props();

    let textEl: HTMLElement | undefined = $state(undefined);
    let finalLines = $derived(lines ?? (textEl ? getLines(textEl) : 1));

    let classes = $derived(variants({ threeOrMoreLines: finalLines >= 3 }));
</script>

<div
    style:--lines={lines}
    class={classes.container({ class: containerClass })}
    {...props}
>
    <StateLayer
        containerClass={classes.stateLayer({ class: stateLayerClass })}
    />

    {#if leading}
        <div class={classes.leading({ class: leadingClass })}>
            {@render leading()}
        </div>
    {/if}

    {#if labelText || supportingText}
        <div bind:this={textEl} class={classes.text({ class: textClass })}>
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
