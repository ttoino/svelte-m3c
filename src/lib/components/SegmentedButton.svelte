<script lang="ts" module>
    import { tv } from "$lib/style.js";

    import { variants as baseButton } from "./Button.svelte";

    const base = baseButton({ variant: "outlined" });
    export const variants = tv({
        compoundSlots: [
            {
                class: "col-start-1 row-start-1 transition-opacity",
                slots: ["unselectedIcon", "selectedIcon"],
            },
        ],
        slots: {
            container: [
                base.container(),
                "group/segmented-button not-first:-ml-px text-on-surface ui-on:bg-secondary-container !border-outline ui-on:text-on-secondary-container rounded-none px-4 first:rounded-l-full last:rounded-r-full disabled:-z-10",
            ],
            iconWrapper: "grid place-items-center",
            selectedIcon: "group-ui-off/segmented-button:opacity-0 icon-filled",
            stateLayer: base.stateLayer(),
            unselectedIcon: "group-ui-on/segmented-button:opacity-0",
        },
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
    import type { ClassProps } from "$lib/types/style.js";
    import type { MaterialSymbol } from "material-symbols";

    import { ToggleGroup } from "bits-ui";

    import Icon from "./Icon.svelte";
    import StateLayer from "./StateLayer.svelte";

    let {
        children: originalChildren,
        containerClass,
        icon,
        iconClass,
        iconWrapperClass,
        ref = $bindable(null),
        stateLayerClass,
        ...props
    }: ClassProps<
        ToggleGroup.ItemProps,
        "containerClass" | "iconClass" | "iconWrapperClass" | "stateLayerClass",
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
            class={classes.stateLayer({ class: stateLayerClass })}
            target={ref}
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
