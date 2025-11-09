<script lang="ts">
    import type {
        SliderOrientation,
        SliderSize,
    } from "$lib/components/Slider.svelte";

    import { type IconName, Slider } from "$lib/index.js";

    import Playground, {
        buttonGroupControl,
        iconControl,
        selectControl,
        switchControl,
    } from "../../Playground.svelte";
    import Preview from "../../Preview.svelte";
</script>

<h1>Sliders</h1>

<Playground
    code={({ discrete, icon, showIcon, variant, ...props }) => {
        const p = Object.entries({
            discrete,
            icon: showIcon ? icon : undefined,
            step: discrete ? 10 : undefined,
            type: variant === "standard" ? "single" : "multiple",
            ...props,
        })
            .map(([k, v]) => {
                if (!v) return;

                if (v === true) return k;

                const value = typeof v === "string" ? `"${v}"` : `{${v}}`;

                return `${k}=${value}`;
            })
            .filter((v) => !!v)
            .toSorted().join(`
                `);

        return `
            <Slider
                ${p}
            />
        `;
    }}
    controls={{
        /* eslint-disable perfectionist/sort-objects */
        variant: buttonGroupControl("Variant", {
            standard: "Standard",
            centered: "Centered",
            range: "Range",
        }),
        orientation: buttonGroupControl("Orientation", {
            horizontal: "Horizontal",
            vertical: "Vertical",
        }),
        size: selectControl("Size", {
            "extra-small": "Extra small",
            small: "Small",
            medium: "Medium",
            large: "Large",
            "extra-large": "Extra large",
        }),
        icon: iconControl("Icon"),
        showIcon: switchControl("Show icon"),
        discrete: switchControl("Discrete"),
        collapsible: switchControl("Collapsible"),
        disabled: switchControl("Disabled"),
        /* eslint-enable perfectionist/sort-objects */
    }}
    defaults={{
        collapsible: false,
        disabled: false,
        discrete: false,
        icon: "add" as IconName,
        orientation: "horizontal" as SliderOrientation,
        showIcon: false,
        size: "extra-small" as SliderSize,
        variant: "standard" as "centered" | "range" | "standard",
    }}
>
    {#snippet children({ discrete, icon, showIcon, variant, ...props })}
        {#if variant === "centered"}
            TBI
        {:else}
            <Slider
                {discrete}
                icon={showIcon ? icon : undefined}
                step={discrete ? 10 : undefined}
                type={variant === "standard" ? "single" : "multiple"}
                value={variant === "standard" ? 50 : [20, 80]}
                {...props}
            />
        {/if}
    {/snippet}
</Playground>

<h2>Slider</h2>

<!-- TODO -->

<Preview code="<Slider />">
    <Slider />
</Preview>

<h2>Discrete slider</h2>

<!-- TODO -->

<Preview code="<Slider discrete step=&lbrace;10&rbrace; />">
    <Slider discrete step={10} />
</Preview>

<h2>Collapsible slider</h2>

<p>
    Collapsible sliders look like progress bars until they are hovered or
    focused.
</p>

<Preview code="<Slider collapsible />">
    <Slider collapsible />
</Preview>

<h2>Slider sizes</h2>

<!-- TODO -->

<Preview
    code={`
        <Slider size="extra-small" />
        <Slider size="small" />
        <Slider size="medium" />
        <Slider size="large" />
        <Slider size="extra-large" />
    `}
>
    <Slider size="extra-small" />
    <Slider size="small" />
    <Slider size="medium" />
    <Slider size="large" />
    <Slider size="extra-large" />
</Preview>

<h2>Slider with icon</h2>

<p>Medium or larger sliders can accommodate an icon.</p>

<Preview code="<Slider icon=&quot;volume_up&quot; size=&quot;medium&quot; />">
    <Slider icon="volume_up" size="medium" />
</Preview>

<!-- TODO: Variants, reference -->
