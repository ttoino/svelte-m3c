<script lang="ts" module>
    import { mergeVariants, tv } from "$lib/style.js";

    export const variantsConfig = mergeVariants({
        slots: {
            activeIndicator:
                "group-ui-inactive/tab:hidden h-0.75 bg-primary absolute bottom-0 left-0 right-0 mx-0.5 min-w-6 rounded-t-full",
            container:
                "ui-active:text-primary group/state-layer group/tab relative min-h-12 cursor-pointer flex-col items-center px-4",
            content:
                "relative inline-flex h-full min-w-7 flex-col items-center justify-center",
            icon: "",
            label: "text-title-s",
            stateLayer: "absolute inset-0",
        },
        variants: {
            hasIcon: {
                false: {},
                true: {
                    container: "min-h-16",
                },
            },
            hideLabel: {
                false: {},
                true: {
                    container: "min-h-12",
                    label: "sr-only",
                },
            },
        },
    });

    export const variants = tv(variantsConfig);
</script>

<script lang="ts">
    import type { IconName } from "$lib/index.js";
    import type { WrapperProps } from "$lib/types/style.js";

    import { Tabs, type WithoutChild } from "bits-ui";

    import Icon from "./Icon.svelte";
    import StateLayer from "./StateLayer.svelte";

    let {
        activeIndicatorClass,
        children,
        containerClass,
        contentClass,
        hideLabel = false,
        icon,
        iconClass,
        labelClass,
        ref = $bindable(null),
        stateLayerClass,
        ...props
    }: WrapperProps<
        WithoutChild<Tabs.TriggerProps>,
        typeof variants,
        {
            hasIcon?: never;
            icon?: IconName;
        }
    > = $props();

    let classes = $derived(variants({ hasIcon: !!icon, hideLabel }));
</script>

<Tabs.Trigger
    class={classes.container({ class: containerClass })}
    bind:ref
    {...props}
>
    <StateLayer
        containerClass={classes.stateLayer({ class: stateLayerClass })}
        target={ref}
    />
    <div class={classes.content({ class: contentClass })}>
        {#if icon}
            <Icon class={classes.icon({ class: iconClass })} {icon} />
        {/if}

        <span class={classes.label({ class: labelClass })}>
            {@render children?.()}
        </span>

        <span class={classes.activeIndicator({ class: activeIndicatorClass })}
        ></span>
    </div>
</Tabs.Trigger>
