<script lang="ts" module>
    import { mergeVariants, tv } from "$lib/style.js";

    import { buttonToIconButtonConfig } from "./IconButton.svelte";
    import { variantsConfig as base } from "./ToggleButton.svelte";

    export const variantsConfig = mergeVariants(
        mergeVariants(base, buttonToIconButtonConfig),
        {
            slots: {
                container: "ui-on:icon-filled ui-on:icon-grade-high",
                icon: "transition-[font-variation-settings]",
            },
        },
    );

    export const variants = tv(variantsConfig);
</script>

<script lang="ts">
    import type { IconName } from "$lib/index.js";
    import type { WrapperProps } from "$lib/types/style.js";

    import {
        getButtonColor,
        getButtonShape,
        getButtonSize,
        getButtonVariant,
        getIconButtonWidth,
        isInToggleButtonGroup,
    } from "$lib/context/button.js";
    import { Toggle, ToggleGroup, type WithoutChildrenOrChild } from "bits-ui";

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
        color: propColor,
        containerClass,
        icon,
        iconClass,
        pressed = $bindable(false),
        ref = $bindable(null),
        shape: propShape,
        size: propSize,
        stateLayerClass,
        variant: propVariant,
        width: propWidth,
        ...props
    }: WrapperProps<
        WithoutChildrenOrChild<Toggle.RootProps & ToggleGroup.ItemProps>,
        typeof variants,
        {
            icon: IconName;
        }
    > = $props();

    let shape = $derived(propShape ?? contextShape?.() ?? "round");
    let size = $derived(propSize ?? contextSize?.() ?? "small");
    let variant = $derived(propVariant ?? contextVariant?.() ?? "filled");
    let width = $derived(propWidth ?? contextWidth?.() ?? "default");
    let color = $derived(
        propColor ??
            contextColor?.() ??
            (variant === "tonal"
                ? "secondary"
                : variant === "filled" || variant === "text"
                  ? "primary"
                  : "none"),
    );

    let classes = $derived(variants({ color, shape, size, variant, width }));
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

    <Icon class={classes.icon({ class: iconClass })} {icon} />
</Component>
