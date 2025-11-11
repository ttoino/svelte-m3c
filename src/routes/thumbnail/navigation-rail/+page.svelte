<script lang="ts">
    import {
        IconButton,
        NavigationRail,
        NavigationRailItem,
    } from "$lib/index.js";

    import Device from "../Device.svelte";
    import Thumbnail from "../Thumbnail.svelte";
</script>

{#snippet column(expanded: boolean)}
    <div class="relative h-72 overflow-hidden">
        <Device
            containerClass="absolute -top-16 -right-12 -bottom-48 left-12 flex-row"
        >
            <NavigationRail {expanded}>
                <IconButton
                    color="none"
                    containerClass="mx-7 mb-4 self-start"
                    icon="menu"
                    variant="text"
                />

                <!-- TODO: FAB -->
                <IconButton
                    containerClass="mx-5 mb-12 self-start"
                    icon="edit"
                    shape="square"
                    size="medium"
                />

                <NavigationRailItem active href="" icon="stars">
                    Label
                </NavigationRailItem>
                <NavigationRailItem href="" icon="stars">
                    Label
                </NavigationRailItem>
                <NavigationRailItem href="" icon="stars">
                    Label
                </NavigationRailItem>
            </NavigationRail>
        </Device>
    </div>
{/snippet}

<Thumbnail class="grid grid-cols-2">
    {@render column(false)}
    {@render column(true)}
</Thumbnail>
