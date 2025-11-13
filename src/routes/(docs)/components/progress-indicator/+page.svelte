<script lang="ts">
    import { Progress } from "$lib/index.js";
    import dedent from "dedent";

    import Title from "../../../Title.svelte";
    import Playground, {
        buttonGroupControl,
        sliderControl,
        switchControl,
    } from "../../Playground.svelte";
    import Preview from "../../Preview.svelte";
    import { renderComponentCode } from "../../renderCode.js";
</script>

<Title content="Progress indicators" />

<Playground
    code={({ indeterminate, value, ...props }) =>
        renderComponentCode("Progress", {
            value: indeterminate ? null : value,
            ...props,
        })}
    controls={{
        /* eslint-disable perfectionist/sort-objects */
        value: sliderControl("Progress"),
        shape: buttonGroupControl("Shape", {
            flat: "Flat",
            wavy: "Wavy",
        }),
        circular: switchControl("Circular"),
        indeterminate: switchControl("Indeterminate"),
        /* eslint-enable perfectionist/sort-objects */
    }}
    defaults={{
        circular: false,
        indeterminate: false,
        shape: "flat" as "flat" | "wavy",
        value: 0,
    }}
>
    {#snippet children({ indeterminate, value, ...props })}
        <Progress
            containerClass="mx-8"
            value={indeterminate ? null : value}
            {...props}
        />
    {/snippet}
</Playground>

<h2>Linear progress indicator</h2>

<!-- TODO -->

<Preview code="<Progress />">
    <Progress containerClass="mx-8" />
</Preview>

<h2>Linear indeterminate progress indicator</h2>

<!-- TODO -->

<Preview code="<Progress value=&lbrace;null&rbrace; />">
    <Progress containerClass="mx-8" value={null} />
</Preview>

<h2>Circular progress indicator</h2>

<!-- TODO -->

<Preview code="<Progress circular />">
    <Progress circular />
</Preview>

<h2>Circular indeterminate progress indicator</h2>

<!-- TODO -->

<Preview code="<Progress circular value=&lbrace;null&rbrace; />">
    <Progress circular value={null} />
</Preview>

<h2>Wavy progress indicators</h2>

<!-- TODO -->

<Preview
    code={dedent`
        <Progress shape="wavy" value={null} />
        <Progress circular shape="wavy" value={null} />
    `}
>
    <Progress containerClass="mx-8" shape="wavy" value={null} />
    <Progress circular shape="wavy" value={null} />
</Preview>

<!-- TODO: Reference -->
