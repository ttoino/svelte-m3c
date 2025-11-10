<script lang="ts" module>
    import { mergeVariants, tv } from "$lib/style.js";

    export const variantsConfig = mergeVariants({
        slots: {
            container: "rounded-md",
        },
        variants: {
            variant: {
                elevated: {
                    container: "bg-surface-container-low shadow-1",
                },
                filled: {
                    container: "bg-surface-container-highest",
                },
                outlined: {
                    container: "border border-outline-variant",
                },
            },
        },
    });

    export const variants = tv(variantsConfig);
</script>

<script lang="ts">
    import type { WrapperProps } from "$lib/types/style.js";
    import type { HTMLAttributes } from "svelte/elements";

    let {
        children,
        containerClass,
        variant,
        ...props
    }: WrapperProps<HTMLAttributes<HTMLDivElement>, typeof variants> = $props();

    let classes = $derived(variants({ variant }));
</script>

<div class={classes.container({ class: containerClass })} {...props}>
    {@render children?.()}
</div>
