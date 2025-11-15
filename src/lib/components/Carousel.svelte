<script lang="ts" module>
    import { setCarouselVariant } from "$lib/context/carousel.js";
    import { mergeVariants, tv } from "$lib/style.js";

    export const variantsConfig = mergeVariants({
        defaultVariants: {
            variant: "uncontained",
        },
        slots: {
            container:
                "@container mx-4 my-2 w-stretch overflow-clip [--basis:100%] [--gap:--spacing(2)] [--large-count:1] [--medium-count:0] [--small-count:2] [--small:--spacing(10)] @md:[--small:--spacing(14)]",
            scroller:
                "flex h-full flex-row items-stretch gap-(--gap) px-(--gap)",
        },
        variants: {
            variant: {
                "centered-hero": {},
                "full-screen": {
                    container: "m-0 h-full",
                    scroller: "h-auto w-full flex-col gap-4 px-0 py-4",
                },
                hero: {},
                "multi-browse": {
                    container:
                        "[--large-count:1] [--medium-count:1] [--small-count:1]",
                },
                uncontained: {
                    container: "mx-0",
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
    import type {
        EmblaCarouselType,
        EmblaOptionsType,
        EmblaPluginType,
    } from "embla-carousel";
    import type { HTMLAttributes } from "svelte/elements";

    import embla from "embla-carousel-svelte";
    import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

    const baseEmblaOptions: EmblaOptionsType = {
        align: "start",
        axis: "x",
        loop: true,
        skipSnaps: true,
    };

    const variantEmblaOptions: Record<CarouselVariant, EmblaOptionsType> = {
        "centered-hero": {
            align: "center",
        },
        "full-screen": {
            axis: "y",
        },
        hero: {},
        "multi-browse": {},
        uncontained: {},
    };

    let {
        children,
        containerClass,
        emblaOptions = {},
        emblaPlugins = [WheelGesturesPlugin()],
        scrollerClass,
        variant = "uncontained",
        ...props
    }: WrapperProps<
        HTMLAttributes<HTMLDivElement>,
        typeof variants,
        {
            emblaOptions?: EmblaOptionsType;
            emblaPlugins?: EmblaPluginType[];
        }
    > = $props();

    setCarouselVariant(() => variant);

    let classes = $derived(variants({ variant }));

    let emblaConfig = $derived({
        options: {
            ...baseEmblaOptions,
            ...variantEmblaOptions[variant],
            ...emblaOptions,
            // This triggers a reinit when the variant changes
            variant,
        },
        plugins: emblaPlugins,
    });

    const onInit = (embla: EmblaCarouselType) => {
        const slideCount = embla.slideNodes().length;
        const scroller = embla.containerNode();

        if (variant === "uncontained" || variant === "full-screen") {
            scroller.style.removeProperty("--basis");

            for (const container of embla.slideNodes()) {
                const item = container.firstElementChild as HTMLElement | null;

                if (!item) continue;

                item.style.removeProperty("width");
                item.style.removeProperty("margin-left");
            }
        } else {
            const scrollerStyle = getComputedStyle(scroller);

            const largeSlides = parseInt(
                scrollerStyle.getPropertyValue("--large-count"),
            );
            const mediumSlides = parseInt(
                scrollerStyle.getPropertyValue("--medium-count"),
            );
            const smallSlides = parseInt(
                scrollerStyle.getPropertyValue("--small-count"),
            );

            const visibleSlides = largeSlides + mediumSlides + smallSlides;

            embla
                .containerNode()
                .style.setProperty(
                    "--basis",
                    `calc((var(--small) * ${slideCount - visibleSlides} + 100cqw - var(--gap) * ${visibleSlides - 1}) / ${slideCount})`,
                );
        }

        onScroll(embla);
    };

    const onScroll = (embla: EmblaCarouselType) => {
        if (variant === "uncontained" || variant === "full-screen") return;

        const mod = (n: number, m: number) => ((n % m) + m) % m;

        const slideCount = embla.slideNodes().length;
        const scrollProgress = embla.scrollProgress() * slideCount;

        const scrollerStyle = getComputedStyle(embla.containerNode());

        const largeSlides = parseInt(
            scrollerStyle.getPropertyValue("--large-count"),
        );
        const mediumSlides = parseInt(
            scrollerStyle.getPropertyValue("--medium-count"),
        );
        const smallSlides = parseInt(
            scrollerStyle.getPropertyValue("--small-count"),
        );

        const visibleSlides = largeSlides + mediumSlides + smallSlides;
        const sizedSlides = largeSlides + mediumSlides;
        const sizedPower = largeSlides * 2 + mediumSlides;

        embla.slideNodes().forEach((container, index) => {
            const item = container.firstElementChild as HTMLElement | null;

            if (!item) return;

            const myProgress = mod(index - scrollProgress, slideCount);
            const width =
                // Ramp up to large
                (myProgress >= slideCount - 1
                    ? (2 / sizedPower) *
                      (1 - mod(scrollProgress - index, slideCount))
                    : 0) +
                // Constant large
                (myProgress >= 0 && myProgress < largeSlides - 1
                    ? 2 / sizedPower
                    : 0) +
                (mediumSlides > 0
                    ? // Ramp down from large to medium
                      (myProgress >= largeSlides - 1 && myProgress < largeSlides
                          ? (2 -
                                mod(
                                    index - scrollProgress - largeSlides + 1,
                                    slideCount,
                                )) /
                            sizedPower
                          : 0) +
                      // Constant medium
                      (myProgress >= largeSlides && myProgress < sizedSlides - 1
                          ? 1 / sizedPower
                          : 0) +
                      // Ramp down from medium to small
                      (myProgress >= sizedSlides - 1 && myProgress < sizedSlides
                          ? (1 -
                                mod(
                                    index - scrollProgress - sizedSlides + 1,
                                    slideCount,
                                )) /
                            sizedPower
                          : 0)
                    : // Ramp down from large to small
                      myProgress >= largeSlides - 1 && myProgress < sizedSlides
                      ? (2 / sizedPower) *
                        (1 -
                            mod(
                                index - scrollProgress - largeSlides + 1,
                                slideCount,
                            ))
                      : 0);

            const largeToLeft = Math.max(
                0,
                Math.min(index - scrollProgress, largeSlides),
            );
            const mediumToLeft = Math.max(
                0,
                Math.min(index - scrollProgress - largeSlides, mediumSlides),
            );
            // TODO: Not working when looping
            const smallToLeft = index - scrollProgress;

            item.style.setProperty(
                "width",
                `calc(var(--small) + (100cqw - var(--small) * ${visibleSlides} - var(--gap) * ${visibleSlides - 1}) * ${width})`,
            );
            // TODO: Centered variant
            item.style.setProperty(
                "margin-left",
                `calc((100cqw - var(--small) * ${visibleSlides} - var(--gap) * ${visibleSlides - 1}) * ${(largeToLeft * 2 + mediumToLeft) / sizedPower} + var(--small) * ${smallToLeft} - var(--basis) * ${smallToLeft})`,
            );
        });
    };
</script>

<div
    class={classes.container({ class: containerClass })}
    onemblaInit={(e) => {
        onInit(e.detail);
        e.detail.on("reInit", onInit);
        e.detail.on("slidesChanged", onInit);
        e.detail.on("scroll", onScroll);
        e.detail.on("resize", onScroll);
    }}
    use:embla={emblaConfig}
    {...props}
>
    <div class={classes.scroller({ class: scrollerClass })}>
        {@render children?.()}
    </div>
</div>
