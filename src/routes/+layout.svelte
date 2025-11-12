<script lang="ts">
    import { resolve } from "$app/paths";
    import {
        NavigationRail,
        NavigationRailItem,
        Provider,
        ScrollArea,
    } from "$lib/index.js";
    import { constEntries } from "$lib/object.js";

    import "../app.css";
    import { components } from "./components.js";

    let { children } = $props();
</script>

<Provider>
    <div class="flex h-full flex-row items-stretch">
        <NavigationRail class="shrink-0 overflow-x-clip overflow-y-auto">
            {#each constEntries(components) as [category, c] (category)}
                {#each constEntries(c) as [id, { icon, title }] (id)}
                    <NavigationRailItem
                        href={resolve(`/components/${id}`)}
                        {icon}
                    >
                        {title}
                    </NavigationRailItem>
                {/each}
            {/each}
        </NavigationRail>

        <ScrollArea containerClass="grow">
            <main class="flex flex-col items-center justify-center gap-4 p-4">
                {@render children()}
            </main>
        </ScrollArea>
    </div>
</Provider>
