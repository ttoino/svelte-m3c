<script lang="ts" module>
    import { mergeVariants, tv } from "$lib/style.js";

    export const variantsConfig = mergeVariants({
        slots: {
            activeIndicator:
                "relative flex w-14 items-center justify-center rounded-full",
            container:
                "group/state-layer text-on-surface group/navigation-rail-item relative flex h-14 flex-col items-center justify-center gap-1",
            icon: "transition-colors",
            label: "text-label-m transition-colors",
            stateLayer: "absolute inset-0 rounded-full",
        },
        variants: {
            active: {
                false: {
                    icon: "text-on-surface-variant group-hover/navigation-rail-item:text-on-surface group-focus-within/navigation-rail-item:text-on-surface",
                    label: "text-on-surface-variant group-hover/navigation-rail-item:text-on-surface group-focus-within/navigation-rail-item:text-on-surface",
                },
                true: {
                    activeIndicator: "bg-secondary-container",
                    icon: "text-on-secondary-container icon-filled",
                    label: "text-on-surface",
                },
            },
            hideLabel: {
                false: {
                    activeIndicator: "h-8",
                    label: "after:absolute after:inset-0",
                },
                true: {
                    activeIndicator: "h-14",
                    label: "absolute inset-0 opacity-0",
                },
            },
        },
    });

    export const variants = tv(variantsConfig);
</script>

<script lang="ts">
    import type { IconName } from "$lib/index.js";
    import type { HTMLAttributes } from "svelte/elements";

    import { type WrapperProps } from "$lib/types/style.js";

    import Icon from "./Icon.svelte";
    import StateLayer from "./StateLayer.svelte";

    let {
        active = false,
        activeIndicatorClass,
        children,
        containerClass,
        hideLabel,
        href,
        icon,
        iconClass,
        labelClass,
        stateLayerClass,
        ...props
    }: WrapperProps<
        HTMLAttributes<HTMLDivElement>,
        typeof variants,
        {
            active?: boolean;
            href: string;
            icon: IconName;
        }
    > = $props();

    let classes = $derived(variants({ active, hideLabel }));

    let target: HTMLElement | null = $state(null);
</script>

<div class={classes.container({ class: containerClass })} {...props}>
    <div class={classes.activeIndicator({ class: activeIndicatorClass })}>
        <StateLayer
            containerClass={classes.stateLayer({ class: stateLayerClass })}
            {target}
        />

        <Icon class={classes.icon({ class: iconClass })} {icon} />
    </div>

    <a bind:this={target} class={classes.label({ class: labelClass })} {href}>
        {@render children?.()}
    </a>
</div>
