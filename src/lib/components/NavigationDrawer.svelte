<!-- TODO: Merge navigation components? -->
<!-- TODO: Maybe use navigation menu from bits ui? -->
<script module lang="ts">
    import { tv } from "$lib/style.js";

    export const variants = tv({
        base: "w-90 bg-surface flex flex-col justify-start px-7 py-4",
    });
</script>

<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";

    import { type VariantProps } from "$lib/types/style.js";

    let {
        children,
        class: className,
        ...props
    }: VariantProps<HTMLAttributes<HTMLElement>, typeof variants> = $props();
</script>

<nav class={variants({ className })} {...props}>
    {@render children?.()}
</nav>
