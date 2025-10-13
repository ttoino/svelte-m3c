<script lang="ts" module>
    import { mergeVariants, tv } from "$lib/style.js";

    export const variantsConfig = mergeVariants({
        slots: {
            container: "rounded-md",
        },
        variants: {
            variant: {
                elevated: {
                    container: "shadow-1 bg-surface-container-low",
                },
                filled: {
                    container: "bg-surface-container-highest",
                },
                outlined: {
                    container: "border-outline-variant border",
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
