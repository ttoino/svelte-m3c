<script lang="ts">
    import type { Picture } from "@sveltejs/enhanced-img";

    import { resolve } from "$app/paths";
    import { Card } from "$lib/index.js";
    import { constEntries } from "$lib/object.js";

    import { components } from "../../components.js";
    import Title from "../../Title.svelte";

    const thumbnails = import.meta.glob<Picture>("./*/thumbnail.png", {
        base: "../../thumbnail",
        eager: true,
        import: "default",
        query: { enhanced: true },
    });

    console.log(thumbnails);
</script>

<Title content="Component directory" />

{#each constEntries(components) as [category, c] (category)}
    <h2>{category}</h2>

    <div class="not-prose mt-4 grid gap-2 medium:grid-cols-2">
        {#each constEntries(c) as [id, { description, title }] (id)}
            {@const thumbnail = thumbnails[`./${id}/thumbnail.png`]}

            <Card
                containerClass="relative flex flex-col"
                interactive
                variant="outlined"
            >
                {#if thumbnail}
                    <enhanced:img
                        class="aspect-video rounded-md object-cover"
                        alt=""
                        sizes="640px"
                        src={thumbnail}
                    />
                {/if}

                <div class="p-4">
                    <h3 class="text-title-l">
                        <a
                            class="after:absolute after:inset-0 hover:underline"
                            href={resolve(`/(docs)/components/${id}`)}
                        >
                            {title}
                        </a>
                    </h3>
                    <p class="text-body-l">{description}</p>
                </div>
            </Card>
        {/each}
    </div>
{/each}
