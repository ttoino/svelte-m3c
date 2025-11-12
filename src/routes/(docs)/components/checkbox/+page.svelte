<script lang="ts">
    import { Checkbox } from "$lib/index.js";

    import Title from "../../../Title.svelte";
    import Playground, { switchControl } from "../../Playground.svelte";
    import Preview from "../../Preview.svelte";
    import { renderComponentCode } from "../../renderComponentCode.js";
</script>

<Title content="Checkboxes" />

<!-- TODO -->

<Playground
    code={({ ...props }) => renderComponentCode("Checkbox", props)}
    controls={{
        checked: switchControl("Checked"),
        indeterminate: switchControl("Indeterminate"),
    }}
    defaults={{
        checked: false,
        indeterminate: false,
    }}
>
    {#snippet children({ ...props })}
        <Checkbox {...props} />
    {/snippet}
</Playground>

<h2>Checkbox</h2>

<!-- TODO -->

<Preview code="<Checkbox />">
    <Checkbox />
</Preview>

<h2>With default state</h2>

<!-- TODO -->

<Preview
    code={`
        <Checkbox checked={false} />
        <Checkbox checked />
        <Checkbox indeterminate />
    `}
>
    <Checkbox checked={false} />
    <Checkbox checked />
    <Checkbox indeterminate />
</Preview>

<!-- TODO: Reference -->
