<script lang="ts" module>
    import { mergeVariants, tv } from "$lib/style.js";

    export const variantsConfig = mergeVariants({
        compoundVariants: [
            {
                interactive: true,
                slots: {
                    container: "hover:shadow-2 active:shadow-1",
                },
                variant: "elevated",
            },
        ],
        defaultVariants: {
            interactive: false,
            variant: "elevated",
        },
        slots: {
            container: "group/state-layer relative overflow-clip rounded-md",
            stateLayer: "absolute inset-0",
        },
        variants: {
            interactive: {
                false: {
                    stateLayer: "hidden",
                },
                true: {
                    container:
                        "transition-shadow hover:shadow-1 active:shadow-none",
                },
            },
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

    import { StateLayer } from "$lib/index.js";

    let {
        children,
        containerClass,
        interactive,
        stateLayerClass,
        variant,
        ...props
    }: WrapperProps<HTMLAttributes<HTMLDivElement>, typeof variants> = $props();

    let classes = $derived(variants({ interactive, variant }));
</script>

<div class={classes.container({ class: containerClass })} {...props}>
    <StateLayer
        containerClass={classes.stateLayer({ class: stateLayerClass })}
    />

    {@render children?.()}
</div>
