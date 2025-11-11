<script lang="ts" module>
    import { mergeVariants, tv } from "$lib/style.js";

    export const variantsConfig = mergeVariants({
        slots: {
            activeIndicator:
                "relative mx-5 flex items-center justify-center rounded-full px-4 py-1 transition-[padding]",
            collapsedLabel:
                "w-24 text-center text-label-m transition-[height,padding,opacity] transition-colors after:absolute after:inset-0",
            container:
                "group/state-layer relative flex flex-col items-start justify-center",
            expandedLabel: "text-label-l transition-[width,padding,opacity]",
            icon: "transition-colors",
            stateLayer: "absolute inset-0 rounded-full",
        },
        variants: {
            active: {
                false: {
                    collapsedLabel: "text-on-surface-variant",
                    expandedLabel: "text-on-surface-variant",
                    icon: "text-on-surface-variant",
                    stateLayer: "text-on-surface",
                },
                true: {
                    activeIndicator: "bg-secondary-container",
                    collapsedLabel: "text-secondary",
                    expandedLabel: "text-secondary",
                    icon: "text-on-secondary-container icon-filled",
                    stateLayer: "text-on-secondary-container",
                },
            },
            expanded: {
                false: {
                    collapsedLabel: "pt-1 pb-1.5",
                    expandedLabel: "w-0 opacity-0",
                },
                true: {
                    activeIndicator: "py-4",
                    collapsedLabel: "h-0 opacity-0",
                    expandedLabel: "pl-2",
                },
            },
        },
    });

    export const variants = tv(variantsConfig);
</script>

<script lang="ts">
    import type { IconName } from "$lib/index.js";
    import type { HTMLAttributes } from "svelte/elements";

    import { isNavigationRailExpanded } from "$lib/context/navigationRail.js";
    import { type WrapperProps } from "$lib/types/style.js";

    import Icon from "./Icon.svelte";
    import StateLayer from "./StateLayer.svelte";

    let {
        active = false,
        activeIndicatorClass,
        children,
        collapsedLabelClass,
        containerClass,
        expandedLabelClass,
        href,
        icon,
        iconClass,
        stateLayerClass,
        ...props
    }: WrapperProps<
        HTMLAttributes<HTMLDivElement>,
        typeof variants,
        {
            active?: boolean;
            expanded?: undefined;
            href: string;
            icon: IconName;
        }
    > = $props();

    const expanded = isNavigationRailExpanded();

    let classes = $derived(variants({ active, expanded: expanded() }));

    let target: HTMLElement | null = $state(null);
</script>

<div class={classes.container({ class: containerClass })} {...props}>
    <div class={classes.activeIndicator({ class: activeIndicatorClass })}>
        <StateLayer
            containerClass={classes.stateLayer({ class: stateLayerClass })}
            {target}
        />

        <Icon class={classes.icon({ class: iconClass })} {icon} />

        <span
            class={classes.expandedLabel({ class: expandedLabelClass })}
            aria-hidden="true"
        >
            {@render children?.()}
        </span>
    </div>

    <a
        bind:this={target}
        class={classes.collapsedLabel({ class: collapsedLabelClass })}
        {href}
    >
        {@render children?.()}
    </a>
</div>
