<script module lang="ts">
    import { tv } from "$lib/style.js";

    export const variants = tv({
        base: "width-full flex flex-col py-2",
    });
</script>

<script lang="ts">
    import type { WithElementRef } from "bits-ui";
    import type { HTMLAttributes } from "svelte/elements";

    import { type VariantProps } from "$lib/style.js";

    let {
        children,
        class: className,
        ref = $bindable(null),
        ...props
    }: VariantProps<
        WithElementRef<HTMLAttributes<HTMLDivElement>>,
        typeof variants
    > = $props();
</script>

<div class={variants({ className })} bind:this={ref} {...props}>
    {@render children?.()}
</div>
