<script lang="ts">
    import { IconButton } from "$lib/index.js";

    import Device from "../Device.svelte";
    import Thumbnail from "../Thumbnail.svelte";
</script>

<Thumbnail class="gap-3 px-16">
    <Device containerClass="absolute -inset-10 top-12 right-8" />

    <IconButton
        icon="settings"
        size="large"
        variant="outlined"
        width="narrow"
    />
    <IconButton icon="edit" size="large" variant="tonal" />
    <IconButton
        containerClass="icon-filled"
        icon="send"
        size="large"
        width="wide"
    />
</Thumbnail>
