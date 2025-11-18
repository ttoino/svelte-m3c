<script lang="ts">
    import { Icon, type IconName } from "$lib/index.js";

    import { icons } from "../../icons.js";
    import Thumbnail from "../Thumbnail.svelte";

    const shown_icons: IconName[] = [];

    {
        const temp_icons = structuredClone(icons);

        for (let i = 0; i < 9 * 5; ++i) {
            const i = Math.floor(Math.random() * temp_icons.length);
            shown_icons.push(temp_icons[i]);
            temp_icons.splice(i, 1);
        }
    }
</script>

<Thumbnail class="icon-16">
    <div class="grid grid-cols-9 grid-rows-5">
        {#each shown_icons as icon, i (icon)}
            <Icon
                style="font-weight: {100 + (i / (9 * 5 - 1)) * 800};"
                {icon}
            />
        {/each}
    </div>
</Thumbnail>
