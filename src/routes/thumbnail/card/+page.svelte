<script lang="ts">
    import { Button, Card, IconButton } from "$lib/index.js";
    // TODO
    import { Avatar } from "bits-ui";

    import Thumbnail from "../Thumbnail.svelte";
</script>

<Thumbnail class="py-12">
    <Card containerClass="w-88 bg-surface" variant="outlined">
        <header class="flex flex-row items-center gap-4 p-4">
            <Avatar.Root
                class="inline-flex size-12 items-center justify-center rounded-full bg-primary"
            >
                <Avatar.Fallback class="text-title-m text-on-primary">
                    A
                </Avatar.Fallback>
            </Avatar.Root>

            <div class="flex flex-1 flex-col gap-2">
                <h2 class="text-title-s">Glass Souls' World Tour</h2>
                <p class="text-body-s">From your record favorites</p>
            </div>

            <IconButton
                color="none"
                containerClass="-m-2"
                icon="more_vert"
                variant="text"
            />
        </header>
        <div class="aspect-video bg-neutral-60"></div>
        <div class="flex flex-col gap-8 p-4">
            <p>Buy tickets or check out the schedule.</p>
            <div class="flex flex-row gap-2 self-end">
                <Button variant="outlined">View schedule</Button>
                <Button>Buy tickets</Button>
            </div>
        </div>
    </Card>
</Thumbnail>
