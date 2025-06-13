<script lang="ts" module>
    import { tv } from "$lib/style.js";

    export const variants = tv({
        base: "inline-flex items-center justify-center gap-0.5",
        defaultVariants: {
            size: "medium",
        },
        variants: {
            size: {
                "extra-large":
                    "*:not-first:not-ui-on:rounded-l-lg *:not-last:not-ui-on:rounded-r-lg",
                "extra-small":
                    "*:not-first:not-ui-on:rounded-l-sm *:not-last:not-ui-on:rounded-r-sm",
                large: "*:not-first:not-ui-on:rounded-l-lg *:not-last:not-ui-on:rounded-r-lg",
                medium: "*:not-first:not-ui-on:rounded-l-sm *:not-last:not-ui-on:rounded-r-sm",
                small: "*:not-first:not-ui-on:rounded-l-sm *:not-last:not-ui-on:rounded-r-sm",
            },
        },
    });
</script>

<script lang="ts">
    import type {
        ButtonColor,
        ButtonShape,
        ButtonVariant,
        IconButtonWidth,
    } from "$lib/types/button.js";
    import type { VariantProps } from "$lib/types/style.js";

    import {
        setButtonColor,
        setButtonShape,
        setButtonSize,
        setButtonVariant,
        setIconButtonWidth,
        setToggleButtonGroup,
    } from "$lib/context/button.js";
    import { ToggleGroup } from "bits-ui";

    let {
        class: className,
        color,
        ref = $bindable(null),
        shape,
        size,
        value = $bindable(),
        variant,
        width,
        ...props
    }: VariantProps<
        ToggleGroup.RootProps,
        typeof variants,
        "class",
        {
            color?: ButtonColor;
            shape?: ButtonShape;
            variant?: ButtonVariant;
            width?: IconButtonWidth;
        }
    > = $props();

    setToggleButtonGroup();

    setButtonColor(color);
    setButtonShape(shape);
    setButtonSize(size);
    setButtonVariant(variant);
    setIconButtonWidth(width);
</script>

<ToggleGroup.Root
    class={variants({ className, size })}
    bind:ref
    bind:value={value as never}
    {...props}
/>
