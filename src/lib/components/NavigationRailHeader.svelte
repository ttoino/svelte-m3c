<script lang="ts" module>
    import { mergeVariants, tv } from "$lib/style.js";

    const variantsConfig = mergeVariants({
        base: "text-label-l text-on-surface-variant",
        defaultVariants: {
            expanded: false,
        },
        variants: {
            expanded: {
                false: "mx-auto mt-2 mb-1 text-center",
                true: "mt-3 mb-2 ml-9",
            },
        },
    });

    const variants = tv(variantsConfig);
</script>

<script lang="ts">
    import type { WrapperProps } from "$lib/types/style.js";
    import type { HTMLAttributes } from "svelte/elements";

    import { isNavigationRailExpanded } from "$lib/context/navigationRail.js";

    let {
        children,
        class: className,
        ...props
    }: WrapperProps<
        HTMLAttributes<HTMLHeadingElement>,
        typeof variants
    > = $props();

    const expanded = isNavigationRailExpanded();
</script>

<h2 class={variants({ className, expanded: expanded?.() })} {...props}>
    {@render children?.()}
</h2>
