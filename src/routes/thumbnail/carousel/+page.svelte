<script lang="ts">
    import { Carousel, CarouselItem } from "$lib/index.js";

    import Thumbnail from "../Thumbnail.svelte";
</script>

<Thumbnail class="px-16 py-12">
    <Carousel containerClass="h-stretch w-128" variant="multi-browse">
        <CarouselItem>
            <img alt="" src="https://picsum.photos/id/453/1000" />

            <div
                class="absolute inset-0 flex flex-col items-center justify-end p-4 text-neutral-100 transition-opacity select-none"
            >
                <span class="text-display-s">79</span>
                <span class="text-title-l">Events</span>
            </div>
        </CarouselItem>
        <CarouselItem>
            <img alt="" src="https://picsum.photos/id/419/1000" />

            <div
                class="absolute inset-0 flex flex-col items-center justify-end p-4 text-neutral-100 transition-opacity select-none"
            >
                <span class="text-display-s">12</span>
                <span class="text-title-l">Cities</span>
            </div>
        </CarouselItem>
        <CarouselItem>
            <img alt="" src="https://picsum.photos/id/40/1000" />
        </CarouselItem>
        <CarouselItem></CarouselItem>
        <CarouselItem></CarouselItem>
        <CarouselItem></CarouselItem>
    </Carousel>
</Thumbnail>
