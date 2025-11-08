<script lang="ts" module>
    import { mergeVariants, tv } from "$lib/style.js";

    import { variantsConfig as base } from "./MenuItem.svelte";

    export const variantsConfig = mergeVariants(base, {
        slots: {
            container: "cursor-pointer",
        },
    });

    export const variants = tv(variantsConfig);
</script>

<script lang="ts">
    import type { WrapperProps } from "$lib/types/style.js";
    import type { Snippet } from "svelte";

    import { Select } from "bits-ui";

    import StateLayer from "./StateLayer.svelte";

    let {
        containerClass,
        leading,
        leadingClass,
        stateLayerClass,
        text,
        textClass,
        trailing,
        trailingClass,
        ...props
    }: WrapperProps<
        Select.ItemProps,
        typeof variants,
        {
            leading?: Snippet;
            text?: Snippet;
            trailing?: Snippet;
        }
    > = $props();

    let classes = $derived(variants());
</script>

<Select.Item class={classes.container({ class: containerClass })} {...props}>
    <StateLayer
        containerClass={classes.stateLayer({ class: stateLayerClass })}
    />

    {#if leading}
        <div class={classes.leading({ class: leadingClass })}>
            {@render leading()}
        </div>
    {/if}

    {#if text}
        <div class={classes.text()}>
            <span class={classes.labelText({ class: textClass })}>
                {@render text()}
            </span>
        </div>
    {/if}

    {#if trailing}
        <div class={classes.trailing({ class: trailingClass })}>
            {@render trailing()}
        </div>
    {/if}
</Select.Item>
