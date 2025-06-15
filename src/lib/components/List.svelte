<script lang="ts" module>
    import { mergeVariants, tv } from "$lib/style.js";

    export const variantsConfig = mergeVariants({
        base: "width-full flex flex-col py-2",
    });

    export const variants = tv(variantsConfig);
</script>

<script lang="ts">
    import type { WithElementRef } from "bits-ui";
    import type { HTMLAttributes } from "svelte/elements";

    import { type WrapperProps } from "$lib/types/style.js";

    let {
        children,
        class: className,
        ref = $bindable(null),
        ...props
    }: WrapperProps<
        WithElementRef<HTMLAttributes<HTMLDivElement>>,
        typeof variants
    > = $props();
</script>

<div bind:this={ref} class={variants({ className })} {...props}>
    {@render children?.()}
</div>
