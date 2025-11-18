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
        Icon,
        IconButton,
        MenuItem,
        SplitButton,
    } from "$lib/index.js";

    import Title from "../../../Title.svelte";
    import Playground, {
        buttonGroupControl,
        selectControl,
    } from "../../Playground.svelte";
    import {
        renderComponentCode,
        renderSnippetCode,
    } from "../../renderCode.js";
</script>

<Title content="Split buttons" />

<!-- TODO -->

<Playground
    code={({ buttonType, ...props }) =>
        renderComponentCode(`SplitButton`, props, [
            buttonType === "standard"
                ? renderComponentCode("Button", {}, "Edit")
                : renderComponentCode("IconButton", { icon: "edit" }),
            renderSnippetCode("menu", [
                renderComponentCode("MenuItem", {}, [
                    renderSnippetCode("leading", '<Icon icon="save" />'),
                    renderSnippetCode("text", "Save"),
                ]),
                renderComponentCode("MenuItem", {}, [
                    renderSnippetCode("leading", '<Icon icon="share" />'),
                    renderSnippetCode("text", "Share"),
                ]),
            ]),
        ])}
    controls={{
        /* eslint-disable perfectionist/sort-objects */
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
        variant: "filled" as ButtonVariant,
        width: "default" as IconButtonWidth,
    }}
>
    {#snippet children({ buttonType, ...props })}
        <SplitButton {...props}>
            {#if buttonType === "standard"}
                <Button>Edit</Button>
            {:else}
                <IconButton icon="edit" />
            {/if}

            {#snippet menu()}
                <MenuItem>
                    {#snippet leading()}<Icon icon="save" />{/snippet}
                    {#snippet text()}Save{/snippet}
                </MenuItem>
                <MenuItem>
                    {#snippet leading()}<Icon icon="share" />{/snippet}
                    {#snippet text()}Share{/snippet}
                </MenuItem>
            {/snippet}
        </SplitButton>
    {/snippet}
</Playground>

<!-- TODO -->
