<script lang="ts" module>
    import { mergeVariants, tv } from "$lib/style.js";

    export const variantsConfig = mergeVariants({
        slots: {
            activeIndicator:
                "group-ui-inactive/tab:hidden absolute left-0 right-0 bottom-0 mx-0.5 h-0.75 rounded-t-full bg-primary min-w-6",
            container:
                "min-h-12 ui-active:text-primary relative group/state-layer group/tab flex-col items-center px-4 cursor-pointer",
            content:
                "inline-flex h-full flex-col items-center justify-center relative min-w-7",
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
                    label: "sr-only",
                    container: "min-h-12",
                },
            },
        },
    });

    export const variants = tv(variantsConfig);
</script>

<script lang="ts">
    import type { WrapperProps } from "$lib/types/style.js";

    import { Tabs, type WithoutChild } from "bits-ui";
    import StateLayer from "./StateLayer.svelte";
    import type { MaterialSymbol } from "material-symbols";
    import Icon from "./Icon.svelte";

    let {
        ref = $bindable(null),
        children,
        containerClass,
        contentClass,
        activeIndicatorClass,
        hideLabel = false,
        iconClass,
        icon,
        labelClass,
        stateLayerClass,
        ...props
    }: WrapperProps<
        WithoutChild<Tabs.TriggerProps>,
        typeof variants,
        {
            icon?: MaterialSymbol;
            hasIcon?: never;
        }
    > = $props();

    let classes = $derived(variants({ hasIcon: !!icon, hideLabel }));
</script>

<Tabs.Trigger
    bind:ref
    class={classes.container({ class: containerClass })}
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
