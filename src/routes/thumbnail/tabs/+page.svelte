<script lang="ts">
    import { Tab, Tabs } from "$lib/index.js";

    import Device from "../Device.svelte";
    import Thumbnail from "../Thumbnail.svelte";
</script>

<Thumbnail class="px-20">
    <Device containerClass="mt-12 -mb-12 h-full w-120" statusbar>
        <Tabs containerClass="mt-8" value="video">
            {#snippet tabs()}
                <Tab icon="videocam" value="video">Video</Tab>
                <Tab icon="photo" value="photos">Photos</Tab>
                <Tab icon="music_note" value="audio">Audio</Tab>
            {/snippet}
        </Tabs>
    </Device>
</Thumbnail>
