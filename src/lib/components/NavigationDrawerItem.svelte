<script lang="ts" module>
    import { tv } from "$lib/style.js";

    export const variants = tv({
        slots: {
            container:
                "group/state-layer text-on-surface group/navigation-rail-item relative -mx-4 flex h-14 flex-row items-center justify-start gap-3 rounded-full pl-4 pr-6",
            icon: "transition-colors",
            label: "text-label-l transition-colors after:absolute after:inset-0",
            stateLayer: "absolute inset-0 rounded-full",
        },
        variants: {
            active: {
                false: {
                    icon: "text-on-surface-variant group-hover/navigation-rail-item:text-on-surface group-focus-within/navigation-rail-item:text-on-surface",
                    label: "text-on-surface-variant group-hover/navigation-rail-item:text-on-surface group-focus-within/navigation-rail-item:text-on-surface",
                },
                true: {
                    icon: "text-on-secondary-container icon-filled",
                    item: "text-on-secondary-container bg-secondary-container",
                    label: "text-on-secondary-container",
                },
            },
        },
    });
</script>

<script lang="ts">
    import type { MaterialSymbol } from "material-symbols";
    import type { HTMLAttributes } from "svelte/elements";

    import { type WrapperProps } from "$lib/types/style.js";

    import Icon from "./Icon.svelte";
    import StateLayer from "./StateLayer.svelte";

    let {
        active = false,
        children,
        containerClass,
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
            icon: MaterialSymbol;
        }
    > = $props();

    let classes = $derived(variants({ active }));

    let target: HTMLElement | null = $state(null);
</script>

<div class={classes.container({ class: containerClass })} {...props}>
    <StateLayer
        containerClass={classes.stateLayer({ class: stateLayerClass })}
        {target}
    />

    <Icon class={classes.icon({ class: iconClass })} {icon} />

    <a bind:this={target} class={classes.label({ class: labelClass })} {href}>
        {@render children?.()}
    </a>
</div>
