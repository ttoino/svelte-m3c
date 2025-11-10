<script lang="ts">
    import { type IconName, Switch } from "$lib/index.js";

    import Playground, {
        iconControl,
        switchControl,
    } from "../../Playground.svelte";
    import Preview from "../../Preview.svelte";
    import { renderComponentCode } from "../../renderComponentCode.js";
</script>

<h1>Switches</h1>

<Playground
    code={({
        checkedIcon,
        showCheckedIcon,
        showUncheckedIcon,
        uncheckedIcon,
        ...props
    }) =>
        renderComponentCode("Switch", {
            checkedIcon: showCheckedIcon ? checkedIcon : undefined,
            uncheckedIcon: showUncheckedIcon ? uncheckedIcon : undefined,
            ...props,
        })}
    controls={{
        /* eslint-disable perfectionist/sort-objects */
        checkedIcon: iconControl("Checked icon"),
        uncheckedIcon: iconControl("Unchecked icon"),
        showCheckedIcon: switchControl("Show checked icon"),
        showUncheckedIcon: switchControl("Show unchecked icon"),
        disabled: switchControl("Disabled"),
        /* eslint-enable perfectionist/sort-objects */
    }}
    defaults={{
        checkedIcon: "check" as IconName,
        disabled: false,
        showCheckedIcon: false,
        showUncheckedIcon: false,
        uncheckedIcon: "close" as IconName,
    }}
>
    {#snippet children({
        checkedIcon,
        showCheckedIcon,
        showUncheckedIcon,
        uncheckedIcon,
        ...props
    })}
        <Switch
            checkedIcon={showCheckedIcon ? checkedIcon : undefined}
            uncheckedIcon={showUncheckedIcon ? uncheckedIcon : undefined}
            {...props}
        />
    {/snippet}
</Playground>

<h2>Switch</h2>

<!-- TODO -->

<Preview code="<Switch/>">
    <Switch />
</Preview>

<h2>With icon(s)</h2>

<!-- TODO -->

<Preview
    code={`
        <Switch uncheckedIcon="close" />
        <Switch checkedIcon="check" />
        <Switch checkedIcon="arrow_upward" uncheckedIcon="arrow_downward" />
    `}
>
    <Switch uncheckedIcon="close" />
    <Switch checked checkedIcon="check" />
    <Switch checkedIcon="arrow_upward" uncheckedIcon="arrow_downward" />
</Preview>

<!-- TODO: Reference, color? -->
