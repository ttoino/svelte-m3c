<!-- TODO: Material 3 expressive -->
<!-- TODO: Maybe use navigation menu from bits ui? -->
<script lang="ts" module>
    import { mergeVariants, tv } from "$lib/style.js";

    export const variantsConfig = mergeVariants({
        base: "flex w-90 flex-col justify-start bg-surface px-7 py-4",
    });

    export const variants = tv(variantsConfig);
</script>

<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";

    import { type WrapperProps } from "$lib/types/style.js";

    let {
        children,
        class: className,
        ...props
    }: WrapperProps<HTMLAttributes<HTMLElement>, typeof variants> = $props();
</script>

<nav class={variants({ className })} {...props}>
    {@render children?.()}
</nav>
