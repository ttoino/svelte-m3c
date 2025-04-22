<!-- TODO: Merge navigation components? -->
<!-- TODO: Maybe use navigation menu from bits ui? -->
<script module lang="ts">
    import { tv } from "$lib/style.js";

    export const variants = tv({
        base: "bg-surface flex w-20 flex-col justify-center gap-3",
    });
</script>

<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";

    import { type VariantProps } from "$lib/style.js";

    let {
        children,
        class: className,
        ...props
    }: VariantProps<HTMLAttributes<HTMLElement>, typeof variants> = $props();
</script>

<nav class={variants({ className })} {...props}>
    {@render children?.()}
</nav>
