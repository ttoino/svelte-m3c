<script lang="ts" module>
    import { mergeVariants, tv } from "$lib/style.js";

    const variantsConfig = mergeVariants({
        base: "relative flex aspect-video flex-row items-center justify-center overflow-clip bg-surface-container",
    });

    const variants = tv(variantsConfig);
</script>

<script lang="ts">
    import type { WrapperProps } from "$lib/types/style.js";
    import type { HTMLAttributes } from "svelte/elements";

    let {
        children,
        class: className,
        ...props
    }: WrapperProps<HTMLAttributes<HTMLDivElement>, typeof variants> = $props();
</script>

<div id="thumbnail" class={variants({ className })} {...props}>
    {@render children?.()}
</div>
