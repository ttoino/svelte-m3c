<script lang="ts">
    import {
        Button,
        ConnectedButtonGroup,
        Icon,
        IconButton,
        StandardButtonGroup,
        ToggleButton,
    } from "$lib/index.js";

    import Thumbnail from "../Thumbnail.svelte";
</script>

<Thumbnail class="flex-col gap-4 px-16">
    <ConnectedButtonGroup
        class="w-full *:flex-1"
        color="primary"
        size="medium"
        type="single"
        value="1"
        variant="tonal"
    >
        <ToggleButton value="1">
            <Icon icon="check" />
            4 oz
        </ToggleButton>
        <ToggleButton value="2">8 oz</ToggleButton>
        <ToggleButton value="3">12 oz</ToggleButton>
    </ConnectedButtonGroup>
    <StandardButtonGroup
        color="none"
        size="large"
        variant="outlined"
        width="narrow"
    >
        <IconButton icon="accessibility_new" />
        <Button color="primary" variant="filled">Get started</Button>
        <IconButton icon="language" />
    </StandardButtonGroup>
</Thumbnail>
