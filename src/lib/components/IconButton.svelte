<script lang="ts" module>
    import { tv } from "$lib/style.js";

    import { variants as base } from "./Button.svelte";

    export const variants = tv({
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
        extend: base,
        slots: {
            container: "min-w-0",
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
</script>

<script lang="ts">
    import type { VariantProps } from "$lib/types/style.js";
    import type { MaterialSymbol } from "material-symbols";

    import { Button, type WithoutChildren } from "bits-ui";

    import Icon from "./Icon.svelte";
    import StateLayer from "./StateLayer.svelte";
    import { getButtonColor, getButtonShape, getButtonSize, getButtonVariant, getIconButtonWidth } from "$lib/context/button.js";

    const contextColor = getButtonColor();
    const contextShape = getButtonShape();
    const contextSize = getButtonSize();
    const contextVariant = getButtonVariant();
    const contextWidth = getIconButtonWidth();

    let {
        color = contextColor,
        containerClass,
        icon,
        ref = $bindable(null),
        shape = contextShape,
        size = contextSize,
        stateLayerClass,
        tooltip,
        variant = contextVariant,
        width = contextWidth,
        ...props
    }: VariantProps<
        WithoutChildren<Button.RootProps>,
        typeof variants,
        "containerClass" | "stateLayerClass",
        {
            icon: MaterialSymbol;
        }
    > = $props();

    let classes = $derived(variants({ color, shape, size, variant, width }));
</script>

<Button.Root
    class={classes.container({ class: containerClass })}
    bind:ref
    {...props}
>
    <StateLayer
        class={classes.stateLayer({ class: stateLayerClass })}
        target={ref}
    />

    <Icon {icon} />
</Button.Root>
