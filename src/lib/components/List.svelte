<script module lang="ts">
    import { tv } from "$lib/style.js";

    export const variants = tv({
        base: "width-full flex flex-col py-2",
    });
</script>

<script lang="ts">
    import { type VariantProps } from "$lib/style.js";
    import type { HTMLAttributes } from "svelte/elements";

    let {
        class: className,
        children,
        ...props
    }: VariantProps<HTMLAttributes<HTMLDivElement>, typeof variants> = $props();
</script>

<div class={variants({ className })} {...props}>
    {@render children?.()}
</div>
