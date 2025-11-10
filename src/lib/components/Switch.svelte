<script lang="ts" module>
    import { mergeVariants, tv } from "$lib/style.js";

    export const variantsConfig = mergeVariants({
        compoundSlots: [
            {
                class: "absolute size-4 text-[1rem] transition-opacity",
                slots: ["uncheckedIcon", "checkedIcon"],
            },
        ],
        slots: {
            checkedIcon: "icon-filled group-ui-unchecked/switch:opacity-0",
            handle: "absolute left-3.5 inline-flex size-4 -translate-x-1/2 items-center justify-center rounded-full bg-outline text-surface-container-highest transition-[background-color,color,left,width,height] not-disabled:group-active/switch:!size-7 disabled:bg-on-surface/12 disabled:text-surface-container-highest/38 ui-checked:left-8.5 ui-checked:size-6 ui-checked:bg-on-primary ui-checked:text-on-primary-container disabled:ui-checked:bg-surface disabled:ui-checked:text-on-surface/38",
            stateLayer: "absolute size-10 rounded-full",
            track: "group/state-layer group/switch group/switch relative inline-flex h-8 w-13 cursor-pointer items-center rounded-full border-2 border-outline bg-surface-container-highest transition-colors focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-secondary disabled:cursor-default disabled:border-on-surface/12 disabled:bg-surface-container-highest/12 ui-checked:border-primary ui-checked:bg-primary disabled:ui-checked:border-transparent disabled:ui-checked:bg-on-surface/12",
            uncheckedIcon: "group-ui-checked/switch:opacity-0",
        },
        variants: {
            withUncheckedIcon: {
                true: {
                    handle: "size-6",
                },
            },
        },
    });

    export const variants = tv(variantsConfig);
</script>

<script lang="ts">
    import type { IconName } from "$lib/index.js";

    import { type WrapperProps } from "$lib/types/style.js";
    import { Switch } from "bits-ui";

    import Icon from "./Icon.svelte";
    import StateLayer from "./StateLayer.svelte";

    let {
        checked = $bindable(false),
        checkedIcon,
        checkedIconClass,
        handleClass,
        ref = $bindable(null),
        stateLayerClass,
        trackClass,
        uncheckedIcon,
        uncheckedIconClass,
        ...props
    }: WrapperProps<
        Switch.RootProps,
        typeof variants,
        {
            checkedIcon?: IconName;
            uncheckedIcon?: IconName;
        }
    > = $props();

    let classes = $derived(variants({ withUncheckedIcon: !!uncheckedIcon }));
</script>

<Switch.Root
    class={classes.track({ class: trackClass })}
    bind:ref
    bind:checked
    {...props}
>
    <Switch.Thumb class={classes.handle({ class: handleClass })}>
        <StateLayer
            containerClass={classes.stateLayer({ class: stateLayerClass })}
            target={ref}
        />

        {#if uncheckedIcon}
            <Icon
                class={classes.uncheckedIcon({ class: uncheckedIconClass })}
                icon={uncheckedIcon}
            />
        {/if}
        {#if checkedIcon}
            <Icon
                class={classes.checkedIcon({ class: checkedIconClass })}
                icon={checkedIcon}
            />
        {/if}
    </Switch.Thumb>
</Switch.Root>
