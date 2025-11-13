<script lang="ts">
    import { Divider, List, ListItem } from "$lib/index.js";
    // TODO
    import { Avatar } from "bits-ui";

    import Thumbnail from "../Thumbnail.svelte";
</script>

<Thumbnail class="py-12">
    <List class="w-80 bg-surface-container-lowest shadow-1">
        <ListItem containerClass="bg-transparent">
            {#snippet leading()}
                <Avatar.Root
                    class="inline-flex size-12 items-center justify-center rounded-full bg-primary-container"
                >
                    <Avatar.Fallback
                        class="text-title-m text-on-primary-container"
                    >
                        A
                    </Avatar.Fallback>
                </Avatar.Root>
            {/snippet}
            {#snippet labelText()}
                Alejandro Ortega
            {/snippet}
            {#snippet supportingText()}
                6 messages
            {/snippet}
        </ListItem>
        <Divider class="mx-4 my-2" />
        <ListItem containerClass="bg-transparent">
            {#snippet leading()}
                <Avatar.Root
                    class="inline-flex size-12 items-center justify-center rounded-full bg-primary-container"
                >
                    <Avatar.Fallback
                        class="text-title-m text-on-primary-container"
                    >
                        S
                    </Avatar.Fallback>
                </Avatar.Root>
            {/snippet}
            {#snippet labelText()}
                Sophia Sacchi
            {/snippet}
            {#snippet supportingText()}
                7 messages
            {/snippet}
        </ListItem>
        <Divider class="mx-4 my-2" />
        <ListItem containerClass="bg-transparent">
            {#snippet leading()}
                <Avatar.Root
                    class="inline-flex size-12 items-center justify-center rounded-full bg-primary-container"
                >
                    <Avatar.Fallback
                        class="text-title-m text-on-primary-container"
                    >
                        A
                    </Avatar.Fallback>
                </Avatar.Root>
            {/snippet}
            {#snippet labelText()}
                Anna Russo
            {/snippet}
            {#snippet supportingText()}
                2 messages
            {/snippet}
        </ListItem>
    </List>
</Thumbnail>
