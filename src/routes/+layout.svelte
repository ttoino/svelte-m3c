<script lang="ts">
    import type { RouteId } from "$app/types";

    import { resolve } from "$app/paths";
    import { page } from "$app/state";
    import {
        NavigationRail,
        NavigationRailHeader,
        NavigationRailItem,
        Provider,
        ScrollArea,
    } from "$lib/index.js";

    import "../app.css";
    import { constEntries } from "$lib/object.js";
    import { onMount } from "svelte";

    import { components } from "./components.js";

    let { children } = $props();

    let expanded = $state(false);

    onMount(() => {
        const w = getComputedStyle(document.body).getPropertyValue(
            "--breakpoint-large",
        );

        const query = matchMedia(`(width >= ${w})`);

        expanded = query.matches;

        query.onchange = (e) => {
            expanded = e.matches;
            console.log(e);
        };
    });
</script>

<Provider>
    <div class="flex h-full flex-row items-stretch">
        <NavigationRail
            class="shrink-0 overflow-x-clip overflow-y-auto max-medium:hidden"
            {expanded}
        >
            {#each constEntries(components) as [category, c] (category)}
                <NavigationRailHeader>
                    {category}
                </NavigationRailHeader>

                {#each constEntries(c) as [id, { icon, title }] (id)}
                    {@const route: RouteId = `/(docs)/components/${id}`}

                    <NavigationRailItem
                        active={page.route.id == route}
                        href={resolve(route)}
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
