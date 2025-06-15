<script lang="ts" module>
    import { mergeVariants, tv } from "$lib/style.js";

    export const variantsConfig = mergeVariants({
        base: "z-50 m-2 inline-flex",
        defaultVariants: {
            variant: "plain",
        },
        variants: {
            variant: {
                plain: "bg-inverse-surface rounded-xs text-body-s text-inverse-on-surface min-h-6 flex-row items-center px-2",
                rich: "shadow-2 bg-surface-container text-body-m text-on-surface-variant flex-col rounded-md px-4 py-3",
            },
        },
    });

    export const variants = tv(variantsConfig);
</script>

<script lang="ts">
    import type { WrapperProps } from "$lib/types/style.js";

    import {
        Popover,
        Tooltip,
        type WithoutChild,
        type WithoutChildrenOrChild,
    } from "bits-ui";

    let {
        class: className,
        portalProps,
        rootProps,
        strategy = "tooltip",
        trigger,
        triggerProps,
        variant,
        ...props
    }: WrapperProps<
        WithoutChild<Popover.ContentProps & Tooltip.ContentProps>,
        typeof variants,
        {
            portalProps?: WithoutChildrenOrChild<
                Popover.PortalProps & Tooltip.PortalProps
            >;
            rootProps?: WithoutChildrenOrChild<
                Popover.RootProps & Tooltip.RootProps
            >;
            strategy?: "popover" | "tooltip";
            trigger: (Popover.TriggerProps & Tooltip.TriggerProps)["child"];
            triggerProps?: WithoutChildrenOrChild<
                Popover.TriggerProps & Tooltip.TriggerProps
            >;
        }
    > = $props();

    let Component = $derived(strategy === "popover" ? Popover : Tooltip);
</script>

<Component.Root {...rootProps}>
    <Component.Trigger child={trigger} {...triggerProps} />

    <Component.Portal {...portalProps}>
        <Component.Content
            class={variants({ className, variant })}
            {...props}
        />
    </Component.Portal>
</Component.Root>
