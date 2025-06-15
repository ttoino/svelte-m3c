<script lang="ts" module>
    import { mergeVariants, tv } from "$lib/style.js";

    import { variantsConfig as base } from "./ListItem.svelte";

    export const variantsConfig = mergeVariants(base, {
        defaultVariants: {
            threeOrMoreLines: false,
        },
        slots: {
            container: "bg-surface-container cursor-pointer",
        },
    });

    export const variants = tv(variantsConfig);
</script>

<script lang="ts">
    import { getMenuStrategy } from "$lib/context/menu.js";
    import { type WrapperProps } from "$lib/types/style.js";
    import { ContextMenu, DropdownMenu } from "bits-ui";
    import { type Snippet } from "svelte";

    import StateLayer from "./StateLayer.svelte";

    const parentStrategy = getMenuStrategy();

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
    }: WrapperProps<
        ContextMenu.ItemProps &
            ContextMenu.SubTriggerProps &
            DropdownMenu.ItemProps &
            DropdownMenu.SubTriggerProps,
        typeof variants,
        {
            leading?: Snippet;
            text?: Snippet;
            trailing?: Snippet;
        }
    > = $props();

    let classes = $derived(variants());

    let strategy = $derived(parentStrategy?.() ?? "context");
    let Component = $derived(
        strategy === "context" ? ContextMenu.Item : DropdownMenu.Item,
    );
</script>

<Component
    class={classes.container({ class: containerClass })}
    bind:ref
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
</Component>
