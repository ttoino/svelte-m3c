<script module lang="ts">
    import { tv } from "$lib/style.js";

    export const variants = tv({
        slots: {
            icon: "transition-colors",
            item: "group/state-layer text-on-surface group/navigation-rail-item relative -mx-4 flex h-14 flex-row items-center justify-start gap-3 rounded-full pl-4 pr-6",
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

    import { type VariantProps } from "$lib/style.js";

    import Icon from "./Icon.svelte";
    import StateLayer from "./StateLayer.svelte";

    let {
        active = false,
        children,
        class: className,
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
