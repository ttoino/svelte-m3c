<script module lang="ts">
    import { tv } from "$lib/style.js";

    export const variants = tv({
        base: "icon inline-block select-none align-middle",
    });
</script>

<script lang="ts">
    import type { ClassProps } from "$lib/style.js";
    import type { HTMLAttributes } from "svelte/elements";
    import type { MaterialSymbol } from "material-symbols";

    let {
        icon,
        class: className,
        ...props
    }: ClassProps<
        HTMLAttributes<HTMLSpanElement>,
        "class",
        {
            icon: MaterialSymbol;
        }
    > = $props();
</script>

<span class={variants({ className })} {...props}>{icon}</span>
