<script lang="ts">
    import { twMerge, type ClassProps } from "$lib/style.js";
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

<span class={twMerge("icon inline-block select-none", className)} {...props}
    >{icon}</span
>
