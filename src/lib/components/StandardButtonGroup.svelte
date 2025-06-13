<script lang="ts" module>
    // TODO: Connected variant
    import { tv } from "$lib/style.js";

    export const variants = tv({
        base: "*:active:w-(--width-active) *:active:next:w-(--width-right) *:active:previous:w-(--width-left) inline-flex items-center justify-center",
        variants: {
            size: {
                "extra-large": "gap-2",
                "extra-small": "gap-4.5",
                large: "gap-2",
                medium: "gap-2",
                small: "gap-3",
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
    import type { MouseEventHandler } from "svelte/elements";

    import {
        setButtonColor,
        setButtonGroup,
        setButtonShape,
        setButtonSize,
        setButtonVariant,
        setIconButtonWidth,
    } from "$lib/context/button.js";
    import { ToggleGroup } from "bits-ui";

    let {
        class: className,
        color = "primary",
        onmousedown: baseOnmousedown,
        shape = "round",
        size = "small",
        variant = "filled",
        width = "default",
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

    setButtonGroup();

    setButtonColor(color);
    setButtonShape(shape);
    setButtonSize(size);
    setButtonVariant(variant);
    setIconButtonWidth(width);

    const onmousedown: MouseEventHandler<HTMLDivElement> = (event) => {
        baseOnmousedown?.(event);

        let button = event.target as HTMLElement;
        const group = event.currentTarget;

        while (button.parentElement !== group && button.parentElement) {
            button = button.parentElement;
        }

        const normalWidth = button.clientWidth;
        const expandedWidth = normalWidth * 1.15;
        const offset = (expandedWidth - normalWidth) / 2;

        group.style.setProperty("--width-active", `${expandedWidth}px`);

        const left = button.previousElementSibling;
        const right = button.nextElementSibling;

        if (left && right) {
            group.style.setProperty(
                "--width-left",
                `${left.clientWidth - offset}px`,
            );
            group.style.setProperty(
                "--width-right",
                `${right.clientWidth - offset}px`,
            );
        } else if (left) {
            group.style.setProperty(
                "--width-left",
                `${left.clientWidth - offset * 2}px`,
            );
        } else if (right) {
            group.style.setProperty(
                "--width-right",
                `${right.clientWidth - offset * 2}px`,
            );
        }
    };
</script>

<ToggleGroup.Root
    class={variants({ className, size })}
    {onmousedown}
    {...props}
/>
