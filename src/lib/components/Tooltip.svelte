<script lang="ts" module>
    import { tv } from "$lib/style.js";

    export const variants = tv({
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
</script>

<script lang="ts">
    import type { VariantProps } from "$lib/types/style.js";

    import {
        Popover,
        Tooltip,
        type WithoutChild,
        type WithoutChildrenOrChild,
    } from "bits-ui";

    let {
        class: className,
        portal = true,
        portalProps,
        rootProps,
        strategy = "tooltip",
        trigger,
        triggerProps,
        variant,
        ...props
    }: VariantProps<
        WithoutChild<Popover.ContentProps & Tooltip.ContentProps>,
        typeof variants,
        "class",
        {
            portal?: boolean;
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

{#snippet content()}
    <Component.Content class={variants({ className, variant })} {...props} />
{/snippet}

<Component.Root {...rootProps}>
    <Component.Trigger child={trigger} {...triggerProps} />

    {#if portal}
        <Component.Portal {...portalProps}>
            {@render content()}
        </Component.Portal>
    {:else}
        {@render content()}
    {/if}
</Component.Root>
