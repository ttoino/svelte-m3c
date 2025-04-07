<script module lang="ts">
    import { tv } from "$lib/style.js";
    import { variants as base } from "./ListItem.svelte";

    export const variants = tv({
        extend: base,
        slots: {
            root: "bg-surface-container cursor-pointer",
        },
        defaultVariants: {
            threeOrMoreLines: false,
        },
    });
</script>

<script lang="ts">
    import { ContextMenu, DropdownMenu } from "bits-ui";
    import { type VariantProps } from "$lib/style.js";
    import { getContext, type Snippet } from "svelte";
    import StateLayer from "./StateLayer.svelte";

    let {
        ref = $bindable(null),
        class: className,
        leadingClass,
        textClass,
        trailingClass,
        stateLayerClass,
        leading,
        text,
        trailing,
        ...props
    }: VariantProps<
        ContextMenu.ItemProps & DropdownMenu.ItemProps,
        typeof variants,
        | "class"
        | "leadingClass"
        | "textClass"
        | "trailingClass"
        | "stateLayerClass",
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

<Base.Item bind:ref class={classes.root({ className })} {...props}>
    <StateLayer class={classes.stateLayer()} />

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
