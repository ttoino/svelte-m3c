<script lang="ts" module>
    import { mergeVariants, tv } from "$lib/style.js";

    import { variantsConfig as base } from "./Button.svelte";

    export const buttonToIconButtonConfig = mergeVariants({
        compoundVariants: [
            {
                class: { container: "px-1" },
                size: ["extra-small", "small"],
                width: "narrow",
            },
            {
                class: { container: "px-3" },
                size: "medium",
                width: "narrow",
            },
            {
                class: { container: "px-4" },
                size: "large",
                width: "narrow",
            },
            {
                class: { container: "px-8" },
                size: "extra-large",
                width: "narrow",
            },
            {
                class: { container: "px-1.5" },
                size: "extra-small",
                width: "default",
            },
            {
                class: { container: "px-2" },
                size: "small",
                width: "default",
            },
            {
                class: { container: "px-4" },
                size: "medium",
                width: "default",
            },
            {
                class: { container: "px-8" },
                size: "large",
                width: "default",
            },
            {
                class: { container: "px-12" },
                size: "extra-large",
                width: "default",
            },
            {
                class: { container: "px-2.5" },
                size: "extra-small",
                width: "wide",
            },
            {
                class: { container: "px-3.5" },
                size: "small",
                width: "wide",
            },
            {
                class: { container: "px-6" },
                size: "medium",
                width: "wide",
            },
            {
                class: { container: "px-12" },
                size: "large",
                width: "wide",
            },
            {
                class: { container: "px-18" },
                size: "extra-large",
                width: "wide",
            },
        ],
        defaultVariants: {
            width: "default",
        },
        slots: {
            container: "min-w-0",
            icon: "",
        },
        variants: {
            size: {
                small: { container: "icon-6" },
            },
            width: {
                default: {},
                narrow: {},
                wide: {},
            },
        },
    });

    export const variantsConfig = mergeVariants(base, buttonToIconButtonConfig);

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
    } from "$lib/context/button.js";
    import { Button, type WithoutChildrenOrChild } from "bits-ui";

    import Icon from "./Icon.svelte";
    import StateLayer from "./StateLayer.svelte";

    const contextColor = getButtonColor();
    const contextShape = getButtonShape();
    const contextSize = getButtonSize();
    const contextVariant = getButtonVariant();
    const contextWidth = getIconButtonWidth();

    let {
        color: propColor,
        containerClass,
        icon,
        iconClass,
        ref = $bindable(null),
        shape: propShape,
        size: propSize,
        stateLayerClass,
        variant: propVariant,
        width: propWidth,
        ...props
    }: WrapperProps<
        WithoutChildrenOrChild<Button.RootProps>,
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
                : variant === "filled"
                  ? "primary"
                  : "none"),
    );

    let classes = $derived(variants({ color, shape, size, variant, width }));
</script>

<Button.Root
    class={classes.container({ class: containerClass })}
    bind:ref
    {...props}
>
    <StateLayer
        containerClass={classes.stateLayer({ class: stateLayerClass })}
        target={ref}
    />

    <Icon class={classes.icon({ class: iconClass })} {icon} />
</Button.Root>
