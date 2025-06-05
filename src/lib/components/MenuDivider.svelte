<script module lang="ts">
    import { tv } from "$lib/style.js";
    import { variants as base } from "./Divider.svelte";

    export const variants = tv({
        base: "my-2",
        extend: base,
    });
</script>

<script lang="ts">
    import { ContextMenu, DropdownMenu } from "bits-ui";
    import type { ClassProps } from "$lib/types/style.js";
    import { getMenuBase } from "$lib/context/menu.js";

    let {
        class: className,
        ...props
    }: ClassProps<ContextMenu.SeparatorProps & DropdownMenu.SeparatorProps> =
        $props();

    let Base = getMenuBase();
</script>

<Base.Separator
    class={variants({
        className,
    })}
    {...props}
/>
