<script lang="ts">
    import { List, ListItem } from "$lib/index.js";
    // TODO
    import { Avatar } from "bits-ui";

    import Thumbnail from "../Thumbnail.svelte";
</script>

<Thumbnail class="py-12">
    <List class="bg-surface-container-lowest shadow-1 w-80">
        <ListItem containerClass="bg-transparent">
            {#snippet leading()}
                <Avatar.Root
                    class="bg-primary-container inline-flex size-12 items-center justify-center rounded-full"
                >
                    <Avatar.Fallback
                        class="text-on-primary-container text-title-m"
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
        <ListItem containerClass="bg-transparent">
            {#snippet leading()}
                <Avatar.Root
                    class="bg-primary-container inline-flex size-12 items-center justify-center rounded-full"
                >
                    <Avatar.Fallback
                        class="text-on-primary-container text-title-m"
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
        <ListItem containerClass="bg-transparent">
            {#snippet leading()}
                <Avatar.Root
                    class="bg-primary-container inline-flex size-12 items-center justify-center rounded-full"
                >
                    <Avatar.Fallback
                        class="text-on-primary-container text-title-m"
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
