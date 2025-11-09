<script lang="ts">
    import { Menu, MenuItem } from "$lib/index.js";

    import Thumbnail from "../Thumbnail.svelte";
</script>

<Thumbnail class="pb-52 pt-8">
    <Menu
        class="w-44"
        align="center"
        rootProps={{ open: true }}
        side="bottom"
        strategy="dropdown"
    >
        {#snippet trigger({ props })}
            <div {...props}></div>
        {/snippet}

        <MenuItem>{#snippet text()}Revert{/snippet}</MenuItem>
        <MenuItem id="focus">{#snippet text()}Settings{/snippet}</MenuItem>
        <MenuItem>{#snippet text()}Send Feedback{/snippet}</MenuItem>
        <MenuItem>{#snippet text()}Help{/snippet}</MenuItem>
    </Menu>
</Thumbnail>
