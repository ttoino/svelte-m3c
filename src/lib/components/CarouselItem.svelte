<script lang="ts" module>
    import { getCarouselVariant } from "$lib/context/carousel.js";
    import { mergeVariants, tv } from "$lib/style.js";

    const variantsConfig = mergeVariants({
        defaultVariants: {
            variant: "uncontained",
        },
        slots: {
            container:
                "w-0 shrink-0 snap-start [view-timeline:--carousel-item_x]",
            item: "absolute inset-y-0 overflow-clip rounded-xl border border-outline-variant *:[img]:size-full *:[img]:object-cover",
        },
        variants: {
            variant: {
                "centered-hero": {
                    container: "basis-1/3",
                    item: "animate-[carousel-item-centered-hero_1ms_both] [animation-timeline:--carousel-item]",
                },
                "full-screen": {
                    container: "h-0 w-auto basis-full",
                    item: "static size-full",
                },
                hero: {
                    container: "basis-1/3",
                    item: "animate-[carousel-item-hero_1ms_both] [animation-timeline:--carousel-item]",
                },
                "multi-browse": {
                    container: "basis-1/3",
                    item: "animate-[carousel-item-multi-browse_1ms_both] [animation-timeline:--carousel-item]",
                },
                uncontained: {
                    container: "contents",
                    item: "static aspect-video w-fit max-w-full *:[img]:w-auto",
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
        itemClass,
        ...props
    }: WrapperProps<
        HTMLAttributes<HTMLDivElement>,
        typeof variants,
        { variant?: undefined }
    > = $props();

    const variant = getCarouselVariant();

    let classes = $derived(variants({ variant: variant() }));
</script>

<div class={classes.container({ class: containerClass })} {...props}>
    <div class={classes.item({ class: itemClass })}>
        {@render children?.()}
    </div>
</div>

<style>
    @keyframes -global-carousel-item-centered-hero {
        100% {
            left: -8px;
            right: calc(100% + 8px);
        }

        75% {
            left: 0;
            right: calc(100% - 56px);
        }

        50% {
            left: 64px;
            right: 64px;
        }

        25% {
            left: calc(100% - 56px);
            right: 0;
        }

        0% {
            left: calc(100% + 8px);
            right: -8px;
        }
    }

    @keyframes -global-carousel-item-hero {
        100% {
            left: -8px;
            right: calc(100% + 8px);
        }

        75% {
            left: 0;
            right: 128px;
        }

        50% {
            left: calc(100% - 120px);
            right: 64px;
        }

        25% {
            left: calc(100% - 56px);
            right: 0;
        }

        0% {
            left: calc(100% + 8px);
            right: -8px;
        }
    }

    @keyframes -global-carousel-item-multi-browse {
        100% {
            left: -8px;
            right: calc(100% + 8px);
        }

        75% {
            left: 0;
            right: calc((100% - 64px) / 3 + 64px);
        }

        50% {
            left: calc((100% - 64px) * 2 / 3 + 8px);
            right: 64px;
        }

        25% {
            left: calc(100% - 56px);
            right: 0;
        }

        0% {
            left: calc(100% + 8px);
            right: -8px;
        }
    }
</style>
