<script lang="ts">
    import { Button, Icon, type IconName, ToggleButton } from "$lib/index.js";
    import {
        type ButtonColor,
        type ButtonShape,
        type ButtonSize,
        type ButtonVariant,
    } from "$lib/types/button.js";
    import { slide } from "svelte/transition";

    import Playground, {
        buttonGroupControl,
        iconControl,
        selectControl,
        switchControl,
        textfieldControl,
    } from "../../Playground.svelte";
    import Preview from "../../Preview.svelte";
</script>

<svelte:head>
    <title>Common buttons</title>
</svelte:head>

<h1>Common buttons</h1>

<!-- TODO -->

<Playground
    code={({ icon, label, showIcon, toggle, ...props }) => {
        const name = toggle ? "ToggleButton" : "Button";

        const p = Object.entries(props).map(([k, v]) => `${k}="${v}"`).join(`
                `);

        const i = `<Icon icon="${icon}" /> `;

        return `
            <${name}
                ${p}
            >
                ${showIcon ? i : ""}${label}
            </${name}>
        `;
    }}
    controls={{
        /* eslint-disable perfectionist/sort-objects */
        label: textfieldControl("Label"),
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
        color: selectControl<ButtonColor>("Color", {
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
        showIcon: switchControl("Show icon"),
        toggle: switchControl("Toggleable"),
        /* eslint-enable perfectionist/sort-objects */
    }}
    defaults={{
        color: "primary" as ButtonColor,
        icon: "edit" as IconName,
        label: "Button",
        shape: "round" as ButtonShape,
        showIcon: false,
        size: "small" as ButtonSize,
        toggle: false,
        variant: "filled" as ButtonVariant,
    }}
>
    {#snippet children({ icon, label, showIcon, toggle, ...props })}
        {#snippet localChildren()}
            {#if showIcon}
                <span transition:slide={{ axis: "x", duration: 100 }}>
                    <Icon {icon} />
                </span>
            {/if}
            {label}
        {/snippet}

        {#if toggle}
            <ToggleButton children={localChildren} value="" {...props} />
        {:else}
            <Button children={localChildren} value="" {...props} />
        {/if}
    {/snippet}
</Playground>

<h2>Button</h2>

<!-- TODO -->

<Preview code="<Button>Default button</Button>">
    <Button>Default button</Button>
</Preview>

<h2>With icon</h2>

<p>
    You can include an icon in your button and it will automatically have the
    correct spacing, color, and size.
</p>

<Preview code="<Button><Icon icon=&quot;mood&quot; /> I have an icon</Button>">
    <Button><Icon icon="mood" /> I have an icon</Button>
</Preview>

<h2>Button variants</h2>

<!-- TODO -->

<Preview
    code={`
        <Button variant="elevated">Elevated</Button>
        <Button variant="filled">Filled</Button>
        <Button variant="tonal">Tonal</Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="text">Text</Button>
    `}
>
    <Button variant="elevated">Elevated</Button>
    <Button variant="filled">Filled</Button>
    <Button color="secondary" variant="tonal">Tonal</Button>
    <Button variant="outlined">Outlined</Button>
    <Button variant="text">Text</Button>
</Preview>

<h2>Button sizes</h2>

<!-- TODO -->

<Preview
    code={`
        <Button size="extra-small">Extra small</Button>
        <Button size="small">Small</Button>
        <Button size="medium">Medium</Button>
        <Button size="large">Large</Button>
        <Button size="extra-large">Extra large</Button>
    `}
>
    <Button size="extra-small">Extra small</Button>
    <Button size="small">Small</Button>
    <Button size="medium">Medium</Button>
    <Button size="large">Large</Button>
    <Button size="extra-large">Extra large</Button>
</Preview>

<h2>Button colors</h2>

<p>
    While technically not part of the spec, you can change the button color to
    indicate different button roles to the user.
    <br />
    The default color is <code>primary</code> for every variant except
    <code>tonal</code>, where it is <code>secondary</code>.
</p>

<Preview
    code={`
        <Button color="primary">Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button color="tertiary">Tertiary</Button>
        <Button color="error">Error</Button>
        <Button color="none">None</Button>
    `}
>
    <Button color="primary">Primary</Button>
    <Button color="secondary">Secondary</Button>
    <Button color="tertiary">Tertiary</Button>
    <Button color="error">Error</Button>
    <Button color="none">None</Button>
</Preview>

<h2>Button shapes</h2>

<!-- TODO -->

<Preview
    code={`
        <Button shape="round">Round</Button>
        <Button shape="square">Square</Button>
    `}
>
    <Button shape="round">Round</Button>
    <Button shape="square">Square</Button>
</Preview>

<h2>Toggle buttons</h2>

<!-- TODO -->

<Preview
    code={`
        <ToggleButton>Default</ToggleButton>
        <ToggleButton variant="text">Text</ToggleButton>
        <ToggleButton size="medium">Medium</ToggleButton>
        <ToggleButton color="tertiary">Tertiary</ToggleButton>
        <ToggleButton shape="square">Square</ToggleButton>
    `}
>
    <ToggleButton value="">Default</ToggleButton>
    <ToggleButton value="" variant="text">Text</ToggleButton>
    <ToggleButton size="medium" value="">Medium</ToggleButton>
    <ToggleButton color="tertiary" value="">Tertiary</ToggleButton>
    <ToggleButton shape="square" value="">Square</ToggleButton>
</Preview>

<h2>Reference</h2>

<!-- TODO -->
