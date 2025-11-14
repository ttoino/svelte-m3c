<script lang="ts">
    import { Divider } from "$lib/index.js";

    import Title from "../../../Title.svelte";
    import Playground from "../../Playground.svelte";
    import { renderComponentCode } from "../../renderCode.js";
</script>

<Title content="Dividers" />

<!-- TODO -->

<Playground code={() => renderComponentCode("Divider")}>
    <Divider class="mx-16 flex-1" />
</Playground>

<!-- TODO -->
