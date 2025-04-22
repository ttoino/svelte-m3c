<script module lang="ts">
    import { tv } from "$lib/style.js";

    export const variants = tv({
        slots: {
            activeIndicator:
                "relative flex w-14 items-center justify-center rounded-full",
            icon: "transition-colors",
            item: "group/state-layer text-on-surface group/navigation-rail-item relative flex h-14 flex-col items-center justify-center gap-1",
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
</script>

<script lang="ts">
    import type { MaterialSymbol } from "material-symbols";
    import type { HTMLAttributes } from "svelte/elements";

    import { type VariantProps } from "$lib/style.js";

    import Icon from "./Icon.svelte";
    import StateLayer from "./StateLayer.svelte";

    let {
        active = false,
        children,
        class: className,
        hideLabel,
        href,
        icon,
        ...props
    }: VariantProps<
        HTMLAttributes<HTMLDivElement>,
        typeof variants,
        "class",
        {
            active?: boolean;
            href: string;
            icon: MaterialSymbol;
        }
    > = $props();

    let classes = $derived(variants({ active, hideLabel }));

    let target: HTMLElement | null = $state(null);
</script>

<div class={classes.item({ className })} {...props}>
    <div class={classes.activeIndicator()}>
        <StateLayer {target} class={classes.stateLayer()} />

        <Icon {icon} class={classes.icon()} />
    </div>

    <a bind:this={target} {href} class={classes.label()}>
        {@render children?.()}
    </a>
</div>
