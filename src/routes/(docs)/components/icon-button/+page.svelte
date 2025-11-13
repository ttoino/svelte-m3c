<script lang="ts">
    import type {
        ButtonShape,
        ButtonSize,
        ButtonVariant,
        IconButtonWidth,
    } from "$lib/types/button.js";
    import type { Color } from "$lib/types/common.js";

    import { IconButton, type IconName, ToggleIconButton } from "$lib/index.js";
    import dedent from "dedent";

    import Title from "../../../Title.svelte";
    import Playground, {
        buttonGroupControl,
        iconControl,
        selectControl,
        switchControl,
    } from "../../Playground.svelte";
    import Preview from "../../Preview.svelte";
    import { renderComponentCode } from "../../renderCode.js";
</script>

<svelte:head>
    <title>Icon buttons</title>
</svelte:head>

<Title content="Icon buttons" />

<!-- TODO -->

<Playground
    code={({ toggle, ...props }) =>
        renderComponentCode(toggle ? "ToggleIconButton" : "IconButton", props)}
    controls={{
        /* eslint-disable perfectionist/sort-objects */
        icon: iconControl("Icon"),
        variant: selectControl<ButtonVariant>("Variant", {
            elevated: "Elevated",
            filled: "Filled",
            tonal: "Tonal",
            outlined: "Outlined",
            text: "Text",
        }),
        size: selectControl<ButtonSize>("Size", {
            "extra-small": "Extra small",
            small: "Small",
            medium: "Medium",
            large: "Large",
            "extra-large": "Extra large",
        }),
        width: selectControl<IconButtonWidth>("Width", {
            narrow: "Narrow",
            default: "Default",
            wide: "Wide",
        }),
        color: selectControl<Color>("Color", {
            primary: "Primary",
            secondary: "Secondary",
            tertiary: "Tertiary",
            error: "Error",
            none: "None",
        }),
        shape: buttonGroupControl<ButtonShape>("Shape", {
            round: "Round",
            square: "Square",
        }),
        toggle: switchControl("Toggleable"),
        disabled: switchControl("Disabled"),
        /* eslint-enable perfectionist/sort-objects */
    }}
    defaults={{
        color: "primary" as Color,
        disabled: false,
        icon: "edit" as IconName,
        shape: "round" as ButtonShape,
        size: "small" as ButtonSize,
        toggle: false,
        variant: "filled" as ButtonVariant,
        width: "default" as IconButtonWidth,
    }}
>
    {#snippet children({ toggle, ...props })}
        {#if toggle}
            <ToggleIconButton value="" {...props} />
        {:else}
            <IconButton value="" {...props} />
        {/if}
    {/snippet}
</Playground>

<h2>Icon button</h2>

<!-- TODO -->

<Preview code="<IconButton icon=&quot;add&quot; />">
    <IconButton icon="add" />
</Preview>

<h2>Icon button variants</h2>

<!-- TODO -->

<Preview
    code={dedent`
        <IconButton icon="elevation" variant="elevated" />
        <IconButton icon="colors" variant="filled" />
        <IconButton icon="invert_colors" variant="tonal" />
        <IconButton icon="select" variant="outlined" />
        <IconButton icon="title" variant="text" />
    `}
>
    <IconButton icon="elevation" variant="elevated" />
    <IconButton icon="colors" variant="filled" />
    <IconButton icon="invert_colors" variant="tonal" />
    <IconButton icon="select" variant="outlined" />
    <IconButton icon="title" variant="text" />
</Preview>

<h2>Icon button sizes</h2>

<!-- TODO -->

<Preview
    code={dedent`
        <IconButton icon="pen_size_1" size="extra-small" />
        <IconButton icon="pen_size_2" size="small" />
        <IconButton icon="pen_size_3" size="medium" />
        <IconButton icon="pen_size_4" size="large" />
        <IconButton icon="pen_size_5" size="extra-large" />
    `}
>
    <IconButton icon="pen_size_1" size="extra-small" />
    <IconButton icon="pen_size_2" size="small" />
    <IconButton icon="pen_size_3" size="medium" />
    <IconButton icon="pen_size_4" size="large" />
    <IconButton icon="pen_size_5" size="extra-large" />
</Preview>

<h2>Icon button widths</h2>

<!-- TODO -->

<Preview
    code={dedent`
        <IconButton icon="crop_portrait" width="narrow" />
        <IconButton icon="crop_square" width="default" />
        <IconButton icon="crop_landscape" width="wide" />
    `}
>
    <IconButton icon="crop_portrait" width="narrow" />
    <IconButton icon="crop_square" width="default" />
    <IconButton icon="crop_landscape" width="wide" />
</Preview>

<h2>Icon button colors</h2>

<p>
    While technically not part of the spec, you can change the button color to
    indicate different button roles to the user.
    <br />
    The default color is <code>primary</code> for every variant except
    <code>tonal</code>, where it is <code>secondary</code>.
</p>

<Preview
    code={dedent`
        <IconButton icon="timer_1" color="primary" />
        <IconButton icon="timer_2" color="secondary" />
        <IconButton icon="timer_3" color="tertiary" />
        <IconButton icon="error" color="error" />
        <IconButton icon="block" color="none" />
    `}
>
    <IconButton color="primary" icon="timer_1" />
    <IconButton color="secondary" icon="timer_2" />
    <IconButton color="tertiary" icon="timer_3" />
    <IconButton color="error" icon="error" />
    <IconButton color="none" icon="block" />
</Preview>

<h2>Icon button shapes</h2>

<!-- TODO -->

<Preview
    code={dedent`
        <IconButton icon="circle" shape="round" />
        <IconButton icon="square" shape="square" />
    `}
>
    <IconButton icon="circle" shape="round" />
    <IconButton icon="square" shape="square" />
</Preview>

<h2>Toggle icon buttons</h2>

<!-- TODO -->

<Preview
    code={dedent`
        <ToggleIconButton icon="add" />
        <ToggleIconButton icon="title" variant="text" />
        <ToggleIconButton icon="pen_size_3" size="medium" />
        <ToggleIconButton icon="timer_3" color="tertiary" />
        <ToggleIconButton icon="square" shape="square" />
    `}
>
    <ToggleIconButton icon="add" value="" />
    <ToggleIconButton icon="title" value="" variant="text" />
    <ToggleIconButton icon="pen_size_3" size="medium" value="" />
    <ToggleIconButton icon="crop_landscape" value="" width="wide" />
    <ToggleIconButton color="tertiary" icon="timer_3" value="" />
    <ToggleIconButton icon="square" shape="square" value="" />
</Preview>

<h2>Reference</h2>

<!-- TODO -->
