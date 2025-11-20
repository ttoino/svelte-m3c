<script lang="ts">
    import { Card } from "$lib/index.js";

    import Title from "../../../Title.svelte";
    import Playground, {
        buttonGroupControl,
        switchControl,
    } from "../../Playground.svelte";
    import { renderComponentCode } from "../../renderCode.js";
</script>

<Title content="Cards" />

<!-- TODO -->

<Playground
    code={(props) => renderComponentCode("Card", props)}
    controls={{
        /* eslint-disable perfectionist/sort-objects */
        variant: buttonGroupControl("Variant", {
            elevated: "Elevated",
            filled: "Filled",
            outlined: "Outlined",
        }),
        interactive: switchControl("Interactive"),
        /* eslint-enable perfectionist/sort-objects */
    }}
    defaults={{
        interactive: false,
        variant: "elevated" as "elevated" | "filled" | "outlined",
    }}
>
    {#snippet children(props)}
        <Card containerClass="mx-16 min-h-100 flex-1 self-stretch" {...props} />
    {/snippet}
</Playground>

<!-- TODO -->
