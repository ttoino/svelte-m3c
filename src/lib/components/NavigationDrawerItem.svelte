<script module lang="ts">
    import { tv } from "$lib/style.js";

    export const variants = tv({
        slots: {
            item: "group/state-layer text-on-surface group/navigation-rail-item relative -mx-4 flex h-14 flex-row items-center justify-start gap-3 rounded-full pl-4 pr-6",
            stateLayer: "absolute inset-0 rounded-full",
            icon: "transition-colors",
            label: "text-label-l transition-colors after:absolute after:inset-0",
        },
        variants: {
            active: {
                false: {
                    icon: "text-on-surface-variant group-hover/navigation-rail-item:text-on-surface group-focus-within/navigation-rail-item:text-on-surface",
                    label: "text-on-surface-variant group-hover/navigation-rail-item:text-on-surface group-focus-within/navigation-rail-item:text-on-surface",
                },
                true: {
                    item: "text-on-secondary-container bg-secondary-container",
                    icon: "text-on-secondary-container icon-filled",
                    label: "text-on-secondary-container",
                },
            },
        },
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
        icon,
        href,
        active = false,
        children,
        ...props
    }: VariantProps<
        HTMLAttributes<HTMLDivElement>,
        typeof variants,
        "class",
        {
            icon: MaterialSymbol;
            href: string;
            active?: boolean;
        }
    > = $props();

    let classes = $derived(variants({ active }));

    let target: HTMLElement | null = $state(null);
</script>

<div class={classes.item({ className })} {...props}>
    <StateLayer {target} class={classes.stateLayer()} />

    <Icon {icon} class={classes.icon()} />

    <a bind:this={target} {href} class={classes.label()}>
        {@render children?.()}
    </a>
</div>
