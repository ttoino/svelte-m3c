<script lang="ts">
    import { Icon, SearchBar } from "$lib/index.js";

    import Device from "../Device.svelte";
    import Thumbnail from "../Thumbnail.svelte";
</script>

<Thumbnail class="px-20">
    <Device containerClass="mt-12 -mb-12 h-full w-120" statusbar>
        <div class="mx-6">
            <SearchBar containerClass="shadow-none">
                {#snippet label()}
                    Search in messages
                {/snippet}
                {#snippet trailing()}
                    <Icon icon="mic" />
                {/snippet}
            </SearchBar>
        </div>
    </Device>
</Thumbnail>
