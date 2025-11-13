<script lang="ts">
    import { Radio, RadioGroup } from "$lib/index.js";

    import Title from "../../../Title.svelte";
    import Playground, { switchControl } from "../../Playground.svelte";
    import { renderComponentCode } from "../../renderCode.js";
</script>

<Title content="Radio buttons" />

<!-- TODO -->

<Playground
    code={({ ...props }) =>
        renderComponentCode(
            "RadioGroup",
            props,
            ["1", "2", "3"].map((value) =>
                renderComponentCode("Radio", { value }),
            ),
        )}
    controls={{ disabled: switchControl("Disabled") }}
    defaults={{ disabled: false }}
>
    {#snippet children({ ...props })}
        <RadioGroup class="flex gap-8" value="1" {...props}>
            {#each "123" as value (value)}
                <Radio {value} />
            {/each}
        </RadioGroup>
    {/snippet}
</Playground>

<!-- TODO -->
