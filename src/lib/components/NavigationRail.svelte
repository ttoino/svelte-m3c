<!-- TODO: Merge navigation components? -->
<!-- TODO: Maybe use navigation menu from bits ui? -->
<script module lang="ts">
    import { tv } from "$lib/style.js";

    export const variants = tv({
        base: "w-20 bg-surface flex flex-col justify-center gap-3",
    });
</script>

<script lang="ts">
    import { type VariantProps } from "$lib/style.js";
    import type { HTMLAttributes } from "svelte/elements";

    let {
        class: className,
        children,
        ...props
    }: VariantProps<HTMLAttributes<HTMLElement>, typeof variants> = $props();
</script>

<nav class={variants({className})} {...props}>
{@render children?.()}
</nav>
