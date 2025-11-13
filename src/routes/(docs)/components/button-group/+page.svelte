<script lang="ts">
    import type {
        ButtonShape,
        ButtonSize,
        ButtonVariant,
        IconButtonWidth,
    } from "$lib/types/button.js";
    import type { Color } from "$lib/types/common.js";

    import {
        Button,
        ConnectedButtonGroup,
        Icon,
        IconButton,
        StandardButtonGroup,
        ToggleButton,
        ToggleIconButton,
    } from "$lib/index.js";
    import dedent from "dedent";

    import Title from "../../../Title.svelte";
    import Playground, {
        buttonGroupControl,
        selectControl,
    } from "../../Playground.svelte";
    import Preview from "../../Preview.svelte";
    import { renderComponentCode } from "../../renderCode.js";
</script>

<Title content="Button groups" />

<!-- TODO -->

<Playground
    code={({ buttonType, type, ...props }) =>
        renderComponentCode(
            `${type === "standard" ? "Standard" : "Connected"}ButtonGroup`,
            props,
            [1, 2, 3].map((v) =>
                renderComponentCode(
                    `${type === "connected" ? "Toggle" : ""}${buttonType === "icon" ? "Icon" : ""}Button`,
                    {
                        icon: buttonType === "icon" ? `timer_${v}` : undefined,
                        value: type === "connected" ? v : undefined,
                    },
                    buttonType === "standard" ? `Button ${v}` : undefined,
                ),
            ),
        )}
    controls={{
        /* eslint-disable perfectionist/sort-objects */
        type: buttonGroupControl("Type", {
            standard: "Standard",
            connected: "Connected",
        }),
        buttonType: buttonGroupControl("Button type", {
            standard: "Standard",
            icon: "Icon",
        }),
        shape: buttonGroupControl<ButtonShape>("Shape", {
            round: "Round",
            square: "Square",
        }),
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
        /* eslint-enable perfectionist/sort-objects */
    }}
    defaults={{
        buttonType: "standard" as "icon" | "standard",
        color: "primary" as Color,
        shape: "round" as ButtonShape,
        size: "small" as ButtonSize,
        type: "standard" as "connected" | "standard",
        variant: "filled" as ButtonVariant,
        width: "default" as IconButtonWidth,
    }}
>
    {#snippet children({ buttonType, type, ...props })}
        {#if type === "standard"}
            <StandardButtonGroup {...props}>
                {#if buttonType === "standard"}
                    <Button>Button 1</Button>
                    <Button>Button 2</Button>
                    <Button>Button 3</Button>
                {:else}
                    <IconButton icon="timer_1" />
                    <IconButton icon="timer_2" />
                    <IconButton icon="timer_3" />
                {/if}
            </StandardButtonGroup>
        {:else}
            <ConnectedButtonGroup type="multiple" {...props}>
                {#if buttonType === "standard"}
                    <ToggleButton value="1">Button 1</ToggleButton>
                    <ToggleButton value="2">Button 2</ToggleButton>
                    <ToggleButton value="3">Button 3</ToggleButton>
                {:else}
                    <ToggleIconButton icon="timer_1" value="1" />
                    <ToggleIconButton icon="timer_2" value="2" />
                    <ToggleIconButton icon="timer_3" value="3" />
                {/if}
            </ConnectedButtonGroup>
        {/if}
    {/snippet}
</Playground>

<h2>Standard button groups</h2>

<!-- TODO -->

<Preview
    code={dedent`
        <StandardButtonGroup>
            <IconButton icon="skip_previous" />
            <Button><Icon icon="play_arrow" /> Play</Button>
            <IconButton icon="skip_next" />
        </StandardButtonGroup>
    `}
>
    <StandardButtonGroup>
        <IconButton icon="skip_previous" />
        <Button><Icon icon="play_arrow" /> Play</Button>
        <IconButton icon="skip_next" />
    </StandardButtonGroup>
</Preview>

<h2>Connected button groups</h2>

<!-- TODO -->

<Preview
    code={dedent`
        <ConnectedButtonGroup type="multiple">
            <ToggleIconButton icon="videocam" value="video" />
            <ToggleIconButton icon="volume_up" value="sound" />
            <ToggleIconButton icon="mic" value="mic" />
        </ConnectedButtonGroup>
        <ConnectedButtonGroup type="single">
            <ToggleButton value="horizontal">Horizontal</ToggleButton>
            <ToggleButton value="vertical">Vertical</ToggleButton>
        </ConnectedButtonGroup>
    `}
>
    <ConnectedButtonGroup type="multiple">
        <ToggleIconButton icon="videocam" value="video" />
        <ToggleIconButton icon="volume_up" value="sound" />
        <ToggleIconButton icon="mic" value="mic" />
    </ConnectedButtonGroup>
    <ConnectedButtonGroup type="single">
        <ToggleButton value="horizontal">Horizontal</ToggleButton>
        <ToggleButton value="vertical">Vertical</ToggleButton>
    </ConnectedButtonGroup>
</Preview>

<!-- TODO: More docs, reference -->
