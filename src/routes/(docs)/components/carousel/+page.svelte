<script lang="ts">
    import { Carousel, CarouselItem } from "$lib/index.js";

    import Title from "../../../Title.svelte";
    import Playground, { selectControl } from "../../Playground.svelte";
    import { renderComponentCode } from "../../renderCode.js";
</script>

<Title content="Carousels" />

<Playground
    code={({ ...props }) =>
        renderComponentCode(
            "Carousel",
            props,
            Array.from({ length: 7 }, () => "<img>"),
        )}
    controls={{
        /* eslint-disable perfectionist/sort-objects */
        variant: selectControl("Variant", {
            "multi-browse": "Multi-browse",
            uncontained: "Uncontained",
            hero: "Hero",
            "centered-hero": "Center-aligned hero",
            "full-screen": "Full-screen",
        }),
        /* eslint-enable perfectionist/sort-objects */
    }}
    defaults={{
        variant: "hero" as
            | "centered-hero"
            | "full-screen"
            | "hero"
            | "multi-browse"
            | "uncontained",
    }}
>
    {#snippet children({ ...props })}
        <Carousel containerClass="max-h-100 flex-1 self-stretch" {...props}>
            {#each "123456789" as i (i)}
                <CarouselItem>
                    <img alt="" src="https://picsum.photos/1000/1000?{i}" />
                </CarouselItem>
            {/each}
        </Carousel>
    {/snippet}
</Playground>
