<script lang="ts" module>
    import { mergeVariants, tv } from "$lib/style.js";

    export const variantsConfig = mergeVariants({
        base: "bg-error text-on-error not-empty:h-4 not-empty:min-w-4 not-empty:px-1 text-label-s inline-flex flex-row items-center justify-center gap-1 rounded-full empty:size-1.5",
    });

    export const variants = tv(variantsConfig);
</script>

<script lang="ts">
    import type { WrapperProps } from "$lib/types/style.js";
    import type { HTMLAttributes } from "svelte/elements";

    let {
        children,
        class: className,
        ...props
    }: WrapperProps<
        HTMLAttributes<HTMLSpanElement>,
        typeof variants
    > = $props();
</script>

<span class={variants({ className })} {...props}>{@render children?.()}</span>
