<script lang="ts">
    import { TextField } from "$lib/index.js";

    import Title from "../../../Title.svelte";
    import Playground, {
        buttonGroupControl,
        textfieldControl,
    } from "../../Playground.svelte";
    import {
        renderComponentCode,
        renderSnippetCode,
    } from "../../renderCode.js";
</script>

<Title content="Text fields" />

<!-- TODO: More options/select -->

<Playground
    code={({ label, ...props }) =>
        renderComponentCode(
            "TextField",
            props,
            renderSnippetCode("label", label),
        )}
    controls={{
        /* eslint-disable perfectionist/sort-objects */
        variant: buttonGroupControl("Variant", {
            filled: "Filled",
            outlined: "Outlined",
        }),
        label: textfieldControl("Label"),
        placeholder: textfieldControl("Placeholder"),
        /* eslint-enable perfectionist/sort-objects */
    }}
    defaults={{
        label: "Label",
        placeholder: "",
        variant: "filled" as "filled" | "outlined",
    }}
>
    {#snippet children({ label: lbl, ...props })}
        <TextField {...props}>
            {#snippet label()}{lbl}{/snippet}
        </TextField>
    {/snippet}
</Playground>

<!-- TODO -->
