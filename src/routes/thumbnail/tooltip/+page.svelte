<script lang="ts">
    import { Button, Tooltip } from "$lib/index.js";

    import Thumbnail from "../Thumbnail.svelte";
</script>

<Thumbnail class="gap-12 pr-84 pl-36">
    <Tooltip rootProps={{ open: true }} side="left">
        {#snippet trigger({ props })}
            <div {...props}></div>
        {/snippet}

        Add to list
    </Tooltip>

    <Tooltip rootProps={{ open: true }} side="right" variant="rich">
        {#snippet trigger({ props })}
            <div {...props}></div>
        {/snippet}

        <div class="flex w-68 flex-col items-start">
            <h3 class="mb-1 font-bold">New settings available</h3>
            <p>
                Now you can adjust the uploaded image quality, and upgrade your
                available storage space.
            </p>
            <Button containerClass="-mx-2 mt-2" variant="text"
                >Learn more</Button
            >
        </div>
    </Tooltip>
</Thumbnail>
