<script lang="ts" module>
    import { tv } from "$lib/style.js";

    export const variants = tv({
        base: "width-full flex flex-col py-2",
    });
</script>

<script lang="ts">
    import type { WithElementRef } from "bits-ui";
    import type { HTMLAttributes } from "svelte/elements";

    import { type VariantProps } from "$lib/types/style.js";

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

<div bind:this={ref} class={variants({ className })} {...props}>
    {@render children?.()}
</div>
