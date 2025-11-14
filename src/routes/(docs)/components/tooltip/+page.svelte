<script lang="ts">
    import { Button, Tooltip } from "$lib/index.js";
    import dedent from "dedent";

    import Title from "../../../Title.svelte";
    import Playground, { buttonGroupControl } from "../../Playground.svelte";
    import { renderComponentCode } from "../../renderCode.js";
</script>

<Title content="Tooltips" />

<!-- TODO -->

<Playground
    code={({ ...props }) =>
        renderComponentCode(
            "Tooltip",
            props,
            dedent`
                I'm a ${props.strategy}
                {#snippet trigger({ props })}
                    <Button {...props}>
                        I have a ${props.strategy}
                    </Button>
                {/snippet}
            `,
        )}
    controls={{
        /* eslint-disable perfectionist/sort-objects */
        variant: buttonGroupControl("Variant", {
            plain: "Plain",
            rich: "Rich",
        }),
        strategy: buttonGroupControl("Strategy", {
            tooltip: "Tooltip",
            popover: "Popover",
        }),
        /* eslint-enable perfectionist/sort-objects */
    }}
    defaults={{
        strategy: "tooltip" as "popover" | "tooltip",
        variant: "plain" as "plain" | "rich",
    }}
>
    {#snippet children({ strategy, ...props })}
        <Tooltip {strategy} {...props}>
            I'm a {strategy}

            {#snippet trigger({ props })}
                <Button {...props}>I have a {strategy}</Button>
            {/snippet}
        </Tooltip>
    {/snippet}
</Playground>

<!-- TODO -->
