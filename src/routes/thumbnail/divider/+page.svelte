<script lang="ts">
    import { Divider, List, ListItem } from "$lib/index.js";

    import Device from "../Device.svelte";
    import Thumbnail from "../Thumbnail.svelte";
</script>

<Thumbnail class="px-20">
    <Device containerClass="-mt-24 -mb-24 h-[calc(100%+--spacing(48))] w-120">
        <List class="my-auto">
            <ListItem
                leadingClass="aspect-video h-16 rounded-lg bg-outline-variant"
            >
                {#snippet leading()}{/snippet}
            </ListItem>
            <Divider class="mx-4" />
            <ListItem
                leadingClass="aspect-video h-16 rounded-lg bg-outline-variant"
            >
                {#snippet leading()}{/snippet}
            </ListItem>
            <Divider class="mx-4" />
            <ListItem
                leadingClass="aspect-video h-16 rounded-lg bg-outline-variant"
            >
                {#snippet leading()}{/snippet}
            </ListItem>
            <Divider class="mx-4" />
            <ListItem
                leadingClass="aspect-video h-16 rounded-lg bg-outline-variant"
            >
                {#snippet leading()}{/snippet}
            </ListItem>
            <Divider class="mx-4" />
            <ListItem
                leadingClass="aspect-video h-16 rounded-lg bg-outline-variant"
            >
                {#snippet leading()}{/snippet}
            </ListItem>
        </List>
    </Device>
</Thumbnail>
