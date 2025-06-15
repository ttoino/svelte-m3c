<script lang="ts" module>
    import { mergeVariants, tv } from "$lib/style.js";

    import { buttonToIconButtonConfig } from "./IconButton.svelte";
    import { variantsConfig as base } from "./ToggleButton.svelte";

    export const variantsConfig = mergeVariants(
        mergeVariants(base, buttonToIconButtonConfig),
        {
            slots: {
                container: "ui-on:icon-filled ui-on:icon-grade-high",
            },
        },
    );

    export const variants = tv(variantsConfig);
</script>

<script lang="ts">
    import type { WrapperProps } from "$lib/types/style.js";
    import type { MaterialSymbol } from "material-symbols";

    import {
        getButtonColor,
        getButtonShape,
        getButtonSize,
        getButtonVariant,
        getIconButtonWidth,
        isInToggleButtonGroup,
    } from "$lib/context/button.js";
    import { Toggle, ToggleGroup, type WithoutChildren } from "bits-ui";

    import Icon from "./Icon.svelte";
    import StateLayer from "./StateLayer.svelte";

    const contextColor = getButtonColor();
    const contextShape = getButtonShape();
    const contextSize = getButtonSize();
    const contextVariant = getButtonVariant();
    const contextWidth = getIconButtonWidth();

    const inToggleButtonGroup = isInToggleButtonGroup();
    const Component = inToggleButtonGroup ? ToggleGroup.Item : Toggle.Root;

    let {
        color = contextColor,
        containerClass,
        icon,
        pressed = $bindable(false),
        ref = $bindable(null),
        shape = contextShape,
        size = contextSize,
        stateLayerClass,
        variant = contextVariant,
        width = contextWidth,
        ...props
    }: WrapperProps<
        WithoutChildren<Toggle.RootProps & ToggleGroup.ItemProps>,
        typeof variants,
        {
            icon: MaterialSymbol;
        }
    > = $props();

    const classes = variants({ color, shape, size, variant, width });
</script>

<Component
    class={classes.container({ class: containerClass })}
    bind:ref
    bind:pressed
    {...props}
>
    <StateLayer
        containerClass={classes.stateLayer({ class: stateLayerClass })}
        target={ref}
    />

    <Icon class="transition-[font-variation-settings]" {icon} />
</Component>
