<script lang="ts" module>
    import { setCarouselVariant } from "$lib/context/carousel.js";
    import { mergeVariants, tv } from "$lib/style.js";

    export const variantsConfig = mergeVariants({
        defaultVariants: {
            variant: "uncontained",
        },
        slots: {
            container: "relative mx-4 my-2 w-[stretch] overflow-clip",
            scroller:
                "flex size-full snap-x snap-mandatory snap-always flex-row overflow-x-scroll overflow-y-clip scroll-smooth",
        },
        variants: {
            variant: {
                "centered-hero": {},
                "full-screen": {
                    container: "m-0 h-full",
                    scroller:
                        "snap-y flex-col gap-2 overflow-x-clip overflow-y-scroll",
                },
                hero: {},
                "multi-browse": {},
                uncontained: {
                    container: "mx-0",
                    scroller: "gap-2 px-4",
                },
            },
        },
    });

    export const variants = tv(variantsConfig);

    export type CarouselVariant =
        keyof (typeof variants)["variants"]["variant"];
</script>

<script lang="ts">
    import type { WrapperProps } from "$lib/types/style.js";
    import type { HTMLAttributes } from "svelte/elements";

    let {
        children,
        containerClass,
        scrollerClass,
        variant,
        ...props
    }: WrapperProps<HTMLAttributes<HTMLDivElement>, typeof variants> = $props();

    setCarouselVariant(() => variant);

    let classes = $derived(variants({ variant }));
</script>

<div class={classes.container({ class: containerClass })} {...props}>
    <div class={classes.scroller({ class: scrollerClass })}>
        {@render children?.()}
    </div>
</div>
