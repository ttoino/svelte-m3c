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

    import { getMenuStrategy } from "$lib/context/menu.js";
    import { ContextMenu, DropdownMenu } from "bits-ui";

    const parentStrategy = getMenuStrategy();

    let {
        class: className,
        ...props
    }: ClassProps<ContextMenu.SeparatorProps & DropdownMenu.SeparatorProps> =
        $props();

    let strategy = $derived(parentStrategy?.() ?? "context");
    let Component = $derived(
        strategy === "context" ? ContextMenu.Separator : DropdownMenu.Separator,
    );
</script>

<Component
    class={variants({
        className,
    })}
    {...props}
/>
