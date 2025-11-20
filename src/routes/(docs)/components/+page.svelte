<script lang="ts">
    import { resolve } from "$app/paths";
    import { Card } from "$lib/index.js";
    import { constEntries } from "$lib/object.js";

    import { components } from "../../components.js";
    import Title from "../../Title.svelte";
</script>

<Title content="Component directory" />

{#each constEntries(components) as [category, c] (category)}
    <h2>{category}</h2>

    <div class="not-prose mt-4 grid gap-2 medium:grid-cols-2">
        {#each constEntries(c) as [id, { description, title }] (id)}
            <Card
                containerClass="relative flex flex-col"
                interactive
                variant="outlined"
            >
                <img
                    class="aspect-video rounded-md object-cover"
                    alt=""
                    src={resolve("/thumbnail/[component].png", {
                        component: id,
                    })}
                />

                <div class="p-4">
                    <h3 class="text-title-l">
                        <a
                            class="after:absolute after:inset-0 hover:underline"
                            href={resolve(`/components/${id}`)}
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
