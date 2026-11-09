<script lang="ts">
    import { Icon, type IconName } from "$lib/index.js";

    import Thumbnail from "../Thumbnail.svelte";

    const icons: IconName[] = [
        "home",
        "search",
        "menu",
        "arrow_back",
        "arrow_forward",
        "more_vert",
        "close",
        "check",
        "add",
        "edit",
        "delete",
        "favorite",
        "star",
        "share",
        "download",
        "upload",
        "refresh",
        "sync",
        "mail",
        "chat",
        "forum",
        "send",
        "notifications",
        "call",
        "videocam",
        "person",
        "group",
        "play_arrow",
        "pause",
        "skip_next",
        "skip_previous",
        "volume_up",
        "image",
        "photo_camera",
        "music_note",
        "movie",
        "folder",
        "description",
        "calendar_today",
        "schedule",
        "shopping_cart",
        "credit_card",
        "lock",
        "visibility",
        "settings",
        "info",
        "warning",
        "error",
        "check_circle",
        "cancel",
        "help",
        "map",
        "location_on",
        "pin_drop",
    ];
</script>

<Thumbnail class="icon-16">
    <div class="grid grid-cols-9 grid-rows-5">
        {#each icons as icon, i (icon)}
            <Icon
                style="font-weight: {100 + (i / (9 * 5 - 1)) * 800};"
                {icon}
            />
        {/each}
    </div>
</Thumbnail>
