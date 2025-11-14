<script lang="ts" module>
    import { setCarouselVariant } from "$lib/context/carousel.js";
    import { mergeVariants, tv } from "$lib/style.js";

    export const variantsConfig = mergeVariants({
        defaultVariants: {
            variant: "uncontained",
        },
        slots: {
            container: "@container mx-4 my-2 w-stretch overflow-clip",
            scroller:
                "flex h-full flex-row items-stretch gap-2 px-2 [--basis:100%] [--small:--spacing(10)] @md:[--small:--spacing(14)]",
        },
        variants: {
            variant: {
                "centered-hero": {},
                "full-screen": {
                    container: "m-0 h-full",
                    scroller: "h-auto w-full flex-col gap-4 px-0 py-4",
                },
                hero: {},
                "multi-browse": {},
                uncontained: {
                    container: "mx-0 px-2",
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
        },
        plugins: emblaPlugins,
    });

    const onInit = (embla: EmblaCarouselType) => {
        const slideCount = embla.slideNodes().length;

        if (variant === "hero") {
            embla
                .containerNode()
                .style.setProperty(
                    "--basis",
                    `calc((var(--small) * ${slideCount - 3} + 100cqw - var(--spacing) * 4) / ${slideCount})`,
                );
        } else {
            embla.containerNode().style.removeProperty("--basis");

            for (const container of embla.slideNodes()) {
                const item = container.firstElementChild as HTMLElement | null;

                if (!item) continue;

                item.style.removeProperty("width");
                item.style.removeProperty("margin-left");
            }
        }

        onScroll(embla);
    };

    const onScroll = (embla: EmblaCarouselType) => {
        const mod = (n: number, m: number) => ((n % m) + m) % m;

        const slideCount = embla.slideNodes().length;
        const scrollProgress = embla.scrollProgress() * slideCount;

        if (variant === "uncontained" || variant === "full-screen") return;

        embla.slideNodes().forEach((container, index) => {
            const item = container.firstElementChild as HTMLElement | null;

            if (!item) return;

            if (variant === "hero") {
                // 1 when progress == index, 0 elsewhere
                const width = Math.max(
                    0,
                    1 -
                        Math.abs(
                            mod(index - scrollProgress + 1, slideCount) - 1,
                        ),
                );
                // 0 when index <= progress, 1 when index > progress
                const bigTranslate = Math.max(
                    0,
                    Math.min(index - scrollProgress, 1),
                );
                // Positive when index <= progress, negative when index >= progress + 1
                const smallTranslate =
                    index == 0 && scrollProgress >= slideCount - 1
                        ? (slideCount - scrollProgress) * (slideCount - 1)
                        : index <= scrollProgress
                          ? scrollProgress - index
                          : index >= scrollProgress + 1
                            ? scrollProgress - index + 1
                            : 0;

                item.style.setProperty(
                    "width",
                    `calc(var(--small) + (100cqw - var(--small) * 3 - var(--spacing) * 4) * ${width})`,
                );
                item.style.setProperty(
                    "margin-left",
                    `calc((100cqw - var(--small) * 2 - var(--spacing) * 4 - var(--basis)) * ${bigTranslate} + (var(--basis) - var(--small)) * ${smallTranslate})`,
                );
            }
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
    }}
    use:embla={emblaConfig}
    {...props}
>
    <div class={classes.scroller({ class: scrollerClass })}>
        {@render children?.()}
    </div>
</div>
