<script lang="ts">
    import { Provider, ScrollArea } from "$lib/index.js";

    import "../app.css";

    let { children } = $props();
</script>

<Provider>
    <div class="flex h-full flex-row items-stretch">
        <ScrollArea containerClass="grow">
            <main class="flex flex-col items-center justify-center gap-4 p-4">
                {@render children()}
            </main>
        </ScrollArea>
    </div>
</Provider>
