<script module lang="ts">
    import { variants as base } from "./List.svelte";

    export const variants = tv({
        base: "shadow-2 rounded-xs bg-surface-container",
        extend: base,
    });
</script>

<script lang="ts">
    import { type ClassProps, tv } from "$lib/style.js";
    import { ContextMenu, DropdownMenu } from "bits-ui";
    import { getContext } from "svelte";

    let {
        class: className,
        collisionPadding = {
            bottom: 48,
            left: 16,
            right: 16,
            top: 48,
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
