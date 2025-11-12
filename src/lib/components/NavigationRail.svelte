<!-- TODO: Maybe use navigation menu from bits ui? -->
<script lang="ts" module>
    import { mergeVariants, tv } from "$lib/style.js";

    export const variantsConfig = mergeVariants({
        base: "flex flex-col justify-start bg-surface py-11 transition-[width,gap]",
        defaultVariants: {
            expanded: false,
        },
        variants: {
            expanded: {
                false: "w-24 gap-1",
                true: "max-w-90 min-w-55",
            },
        },
    });

    export const variants = tv(variantsConfig);
</script>

<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";

    import { setNavigationRailExpanded } from "$lib/context/navigationRail.js";
    import { type WrapperProps } from "$lib/types/style.js";

    let {
        children,
        class: className,
        expanded = false,
        ...props
    }: WrapperProps<HTMLAttributes<HTMLElement>, typeof variants> = $props();

    setNavigationRailExpanded(() => expanded);
</script>

<nav class={variants({ className, expanded })} {...props}>
    {@render children?.()}
</nav>
