<script lang="ts">
    import { Button, Icon } from "$lib/index.js";

    import Device from "../Device.svelte";
    import Thumbnail from "../Thumbnail.svelte";
</script>

<Thumbnail class="gap-4 px-16">
    <Device containerClass="absolute -inset-10 bottom-12" navbar />

    <Button color="secondary" size="medium" variant="tonal">
        <Icon icon="arrow_back" />
        Back
    </Button>
    <Button size="large">
        <Icon class="icon-filled" icon="edit" />
        Edit
    </Button>
    <Button color="secondary" size="medium" variant="tonal">
        <Icon icon="arrow_forward" />
        Next
    </Button>
</Thumbnail>
