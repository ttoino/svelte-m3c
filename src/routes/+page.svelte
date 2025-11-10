<script lang="ts">
    import { resolve } from "$app/paths";
    import { Button } from "$lib/index.js";

    import Title from "./Title.svelte";
</script>

<Title class="text-display-l-emphasized" />

<Button href={resolve("/components")}>Components</Button>
