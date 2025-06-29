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
            checkedIcon: "group-ui-unchecked/switch:opacity-0 icon-filled",
            handle: "ui-checked:left-8.5 not-disabled:group-active/switch:!size-7 bg-outline text-surface-container-highest ui-checked:bg-on-primary ui-checked:text-on-primary-container disabled:bg-on-surface/12 disabled:text-surface-container-highest/38 disabled:ui-checked:bg-surface disabled:ui-checked:text-on-surface/38 ui-checked:size-6 absolute left-3.5 inline-flex size-4 -translate-x-1/2 items-center justify-center rounded-full transition-[background-color,color,left,width,height]",
            stateLayer: "absolute size-10 rounded-full",
            track: "w-13 group/state-layer group/switch border-outline bg-surface-container-highest ui-checked:bg-primary ui-checked:border-primary disabled:bg-surface-container-highest/12 disabled:ui-checked:bg-on-surface/12 disabled:border-on-surface/12 disabled:ui-checked:border-transparent group/switch focus-visible:outline-secondary relative inline-flex h-8 cursor-pointer items-center rounded-full border-2 transition-colors focus-visible:outline focus-visible:outline-offset-2 disabled:cursor-default",
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
    import type { MaterialSymbol } from "material-symbols";

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
            checkedIcon?: MaterialSymbol;
            uncheckedIcon?: MaterialSymbol;
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
