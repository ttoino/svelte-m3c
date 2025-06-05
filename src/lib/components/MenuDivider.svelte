<script lang="ts" module>
    import { tv } from "$lib/style.js";

    import { variants as base } from "./Divider.svelte";

    export const variants = tv({
        base: "my-2",
        extend: base,
    });
</script>

<script lang="ts">
    import type { ClassProps } from "$lib/types/style.js";

    import { getMenuBase } from "$lib/context/menu.js";
    import { ContextMenu, DropdownMenu } from "bits-ui";

    let {
        class: className,
        ...props
    }: ClassProps<ContextMenu.SeparatorProps & DropdownMenu.SeparatorProps> =
        $props();

    const Base = getMenuBase();
</script>

<Base.Separator
    class={variants({
        className,
    })}
    {...props}
/>
