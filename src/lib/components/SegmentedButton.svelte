<script module lang="ts">
    import { tv } from "$lib/style.js";
    import { variants as baseButton } from "./Button.svelte";

    const base = baseButton({ variant: "outlined" });
    export const variants = tv({
        slots: {
            container: [
                base.container(),
                "group/segmented-button not-first:-ml-px text-on-surface ui-on:bg-secondary-container !border-outline ui-on:text-on-secondary-container rounded-none px-4 first:rounded-l-full last:rounded-r-full disabled:-z-10",
            ],
            iconWrapper: "grid place-items-center",
            unselectedIcon: "group-ui-on/segmented-button:opacity-0",
            selectedIcon: "group-ui-off/segmented-button:opacity-0 icon-filled",
            stateLayer: base.stateLayer(),
        },
        compoundSlots: [
            {
                slots: ["unselectedIcon", "selectedIcon"],
                class: "col-start-1 row-start-1 transition-opacity",
            },
        ],
        variants: {
            icon: {
                false: {
                    iconWrapper:
                        "group-ui-off/segmented-button:-mr-2 group-ui-off/segmented-button:w-0 overflow-hidden transition-[width,margin]",
                },
            },
        },
    });
</script>

<script lang="ts">
    import { ToggleGroup } from "bits-ui";
    import Icon from "./Icon.svelte";
    import StateLayer from "./StateLayer.svelte";
    import type { MaterialSymbol } from "material-symbols";
    import type { ClassProps } from "$lib/style.js";

    let {
        containerClass,
        iconWrapperClass,
        iconClass,
        stateLayerClass,
        children: originalChildren,
        ref = $bindable(null),
        icon,
        ...props
    }: ClassProps<
        ToggleGroup.ItemProps,
        "containerClass" | "iconWrapperClass" | "iconClass" | "stateLayerClass",
        {
            icon?: MaterialSymbol;
        }
    > = $props();

    let classes = $derived(variants({ icon: icon !== undefined }));
</script>

<ToggleGroup.Item
    class={classes.container({ class: containerClass })}
    bind:ref
    {...props}
>
    {#snippet children(childrenProps)}
        <StateLayer
            target={ref}
            class={classes.stateLayer({ class: stateLayerClass })}
        />

        <span class={classes.iconWrapper({ class: iconWrapperClass })}>
            <Icon
                class={classes.selectedIcon({ class: iconClass })}
                icon="check"
            />
            {#if icon !== undefined}
                <Icon
                    class={classes.unselectedIcon({ class: iconClass })}
                    {icon}
                />
            {/if}
        </span>

        {@render originalChildren?.(childrenProps)}
    {/snippet}
</ToggleGroup.Item>
