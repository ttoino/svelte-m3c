<script module lang="ts">
    import { tv } from "$lib/style.js";

    export const variants = tv({
        slots: {
            item: "h-14 flex flex-col items-center justify-center relative group/state-layer text-on-surface group/navigation-rail-item gap-1",
            activeIndicator: "w-14 rounded-full relative flex items-center justify-center",
            stateLayer: "absolute inset-0 rounded-full",
            icon: "transition-colors",
            label: "text-label-m transition-colors",
        },
        variants: {
            hideLabel: {
                true: {
                    activeIndicator: "h-14",
                    label: "opacity-0 absolute inset-0",
                },
                false: {
                    activeIndicator: "h-8",
                    label: "after:absolute after:inset-0",
                },
            },
            active: {
                false: {
                    icon: "text-on-surface-variant group-hover/navigation-rail-item:text-on-surface group-focus-within/navigation-rail-item:text-on-surface",
                    label: "text-on-surface-variant group-hover/navigation-rail-item:text-on-surface group-focus-within/navigation-rail-item:text-on-surface"
                },
                true: {
                    activeIndicator: "bg-secondary-container",
                    icon: "text-on-secondary-container icon-filled",
                    label: "text-on-surface",
                },
            },
        }
    });
</script>

<script lang="ts">
    import { type VariantProps } from "$lib/style.js";
    import type { HTMLAttributes } from "svelte/elements";
    import StateLayer from "./StateLayer.svelte";
    import Icon from "./Icon.svelte";
    import type { MaterialSymbol } from "material-symbols";

    let {
        class: className,
        hideLabel,
        icon,
        href,
        active = false,
        children,
        ...props
    }: VariantProps<HTMLAttributes<HTMLDivElement>, typeof variants, "class", {
        icon: MaterialSymbol,
        href: string,
        active?: boolean,
    }> = $props();

    let classes = $derived(variants({hideLabel, active}));

    let target: HTMLElement | null = $state(null);
</script>

<div class={classes.item({className})} {...props}>
    <div class={classes.activeIndicator()}>
        <StateLayer {target} class={classes.stateLayer()} />

        <Icon {icon} class={classes.icon()} />
    </div>
    
    <a bind:this={target} {href} class={classes.label()}>
        {@render children?.()}
    </a>
</div>
