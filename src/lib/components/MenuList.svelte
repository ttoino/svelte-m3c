<script module lang="ts">
    import { variants as base } from "./List.svelte";

    export const variants = tv({
        extend: base,
        base: "shadow-2 rounded-xs bg-surface-container",
    });
</script>

<script lang="ts">
    import { tv, type ClassProps } from "$lib/style.js";
    import { ContextMenu, DropdownMenu } from "bits-ui";
    import { getContext } from "svelte";

    let {
        class: className,
        collisionPadding = {
            top: 48,
            bottom: 48,
            left: 16,
            right: 16,
        },
        ...props
    }: ClassProps<
        ContextMenu.ContentProps & DropdownMenu.ContentProps
    > = $props();

    let type = getContext("menu.type");

    let Base = $derived(type === "context" ? ContextMenu : DropdownMenu);
</script>

<Base.Portal>
    <Base.Content
        class={variants({
            className,
        })}
        {collisionPadding}
        {...props}
    />
</Base.Portal>
