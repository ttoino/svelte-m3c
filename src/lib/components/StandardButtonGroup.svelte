<script lang="ts" module>
    import { tv } from "$lib/style.js";

    export const variants = tv({
        base: "*:active:w-(--width-active) *:active:next:w-(--width-right) *:active:previous:w-(--width-left) inline-flex items-center justify-center",
        defaultVariants: {
            size: "medium",
        },
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
    import type { WrapperProps } from "$lib/types/style.js";
    import type { HTMLAttributes, MouseEventHandler } from "svelte/elements";

    import {
        setButtonColor,
        setButtonShape,
        setButtonSize,
        setButtonVariant,
        setIconButtonWidth,
    } from "$lib/context/button.js";

    let {
        children,
        class: className,
        color,
        onmousedown: baseOnmousedown,
        shape,
        size,
        variant,
        width,
        ...props
    }: WrapperProps<
        HTMLAttributes<HTMLDivElement>,
        typeof variants,
        {
            color?: ButtonColor;
            shape?: ButtonShape;
            variant?: ButtonVariant;
            width?: IconButtonWidth;
        }
    > = $props();

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

<div class={variants({ className, size })} {onmousedown} {...props}>
    {@render children?.()}
</div>
