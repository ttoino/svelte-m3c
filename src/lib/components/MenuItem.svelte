<script module lang="ts">
    import { tv } from "$lib/style.js";

    import { variants as base } from "./ListItem.svelte";

    export const variants = tv({
        defaultVariants: {
            threeOrMoreLines: false,
        },
        extend: base,
        slots: {
            container: "bg-surface-container cursor-pointer",
        },
    });
</script>

<script lang="ts">
    import { type VariantProps } from "$lib/style.js";
    import { ContextMenu, DropdownMenu } from "bits-ui";
    import { getContext, type Snippet } from "svelte";

    import StateLayer from "./StateLayer.svelte";

    let {
        containerClass,
        leading,
        leadingClass,
        ref = $bindable(null),
        stateLayerClass,
        text,
        textClass,
        trailing,
        trailingClass,
        ...props
    }: VariantProps<
        ContextMenu.ItemProps & DropdownMenu.ItemProps,
        typeof variants,
        | "containerClass"
        | "leadingClass"
        | "stateLayerClass"
        | "textClass"
        | "trailingClass",
        {
            leading?: Snippet;
            text?: Snippet;
            trailing?: Snippet;
        }
    > = $props();

    let classes = $derived(variants());

    let type = getContext("menu.type");

    let Base = $derived(type === "context" ? ContextMenu : DropdownMenu);
</script>

<Base.Item
    bind:ref
    class={classes.container({ class: containerClass })}
    {...props}
>
    <StateLayer class={classes.stateLayer({ class: stateLayerClass })} />

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
</Base.Item>
