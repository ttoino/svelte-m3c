<script module lang="ts">
    import { tv } from "$lib/style.js";
    import { variants as base } from "./List.svelte";

    export const variants = tv({
        base: "shadow-2 rounded-xs bg-surface-container z-50",
        extend: base,
    });
</script>

<script lang="ts">
    import { type ClassProps } from "$lib/types/style.js";
    import { ContextMenu, DropdownMenu } from "bits-ui";
    import { getMenuBase, isSubMenu, setSubMenuTrigger } from "$lib/context/menu.js";

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

    setSubMenuTrigger(false);

    let Base = getMenuBase();

    let sub = isSubMenu();

    let Component = $derived(sub ? Base.SubContent : Base.Content);
</script>

<Component
    class={variants({
        className,
    })}
    {collisionPadding}
    {...props}
/>
