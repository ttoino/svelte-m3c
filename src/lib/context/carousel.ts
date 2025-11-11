import type { CarouselVariant } from "$lib/components/Carousel.svelte";

import { getContext, setContext } from "svelte";

export const CAROUSEL_VARIANT = "carousel.variant";

export const setCarouselVariant = (
    variant: () => CarouselVariant | undefined,
) => setContext(CAROUSEL_VARIANT, variant);

export const getCarouselVariant = () =>
    getContext<() => CarouselVariant | undefined>(CAROUSEL_VARIANT);
