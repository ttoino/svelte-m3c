<script module lang="ts">
    import { tv } from "$lib/style.js";

    const variants = tv({
        slots: {
            track: "w-13 group/state-layer group/switch border-outline bg-surface-container-highest ui-checked:bg-primary ui-checked:border-primary disabled:bg-surface-container-highest/12 disabled:ui-checked:bg-on-surface/12 disabled:border-on-surface/12 disabled:ui-checked:border-transparent group/switch focus-visible:outline-secondary relative inline-flex h-8 cursor-pointer items-center rounded-full border-2 transition-colors focus-visible:outline focus-visible:outline-offset-2 disabled:cursor-default",
            handle: "ui-checked:left-8.5 not-disabled:group-active/switch:!size-7 bg-outline text-surface-container-highest ui-checked:bg-on-primary ui-checked:text-on-primary-container disabled:bg-on-surface/12 disabled:text-surface-container-highest/38 disabled:ui-checked:bg-surface disabled:ui-checked:text-on-surface/38 ui-checked:size-6 absolute left-3.5 inline-flex size-4 -translate-x-1/2 items-center justify-center rounded-full transition-[background-color,color,left,width,height]",
            stateLayer: "absolute size-10 rounded-full",
            uncheckedIcon: "group-ui-checked/switch:opacity-0",
            checkedIcon: "group-ui-unchecked/switch:opacity-0 icon-filled",
        },
        compoundSlots: [
            {
                slots: ["uncheckedIcon", "checkedIcon"],
                class: "absolute size-4 text-[1rem] transition-opacity",
            },
        ],
        variants: {
            withUncheckedIcon: {
                true: {
                    handle: "size-6",
                },
            },
        },
    });
</script>

<script lang="ts">
    import { type ClassProps } from "$lib/style.js";
    import { Switch } from "bits-ui";
    import StateLayer from "./StateLayer.svelte";
    import type { MaterialSymbol } from "material-symbols";
    import Icon from "./Icon.svelte";

    let {
        ref = $bindable(null),
        checked = $bindable(false),
        class: className,
        handleClass,
        uncheckedIcon,
        checkedIcon,
        ...props
    }: ClassProps<
        Switch.RootProps,
        "class" | "handleClass",
        {
            uncheckedIcon?: MaterialSymbol;
            checkedIcon?: MaterialSymbol;
        }
    > = $props();

    let {
        track,
        handle,
        stateLayer,
        uncheckedIcon: uncheckedIconClass,
        checkedIcon: checkedIconClass,
    } = $derived(variants({ withUncheckedIcon: !!uncheckedIcon }));
</script>

<Switch.Root class={track({ className })} bind:ref bind:checked {...props}>
    <Switch.Thumb class={handle({ class: handleClass })}>
        <StateLayer target={ref} class={stateLayer()} />

        {#if uncheckedIcon}
            <Icon class={uncheckedIconClass()} icon={uncheckedIcon} />
        {/if}
        {#if checkedIcon}
            <Icon class={checkedIconClass()} icon={checkedIcon} />
        {/if}
    </Switch.Thumb>
</Switch.Root>
