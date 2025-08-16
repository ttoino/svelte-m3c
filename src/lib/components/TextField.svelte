<script lang="ts" module>
    // TODO: Outlined variant, error state, prefix, suffix, leading, trailing, supporting text, error text, character counter
    import { mergeVariants, tv } from "$lib/style.js";

    export const variantsConfig = mergeVariants({
        compoundSlots: [
            {
                class: "select-none",
                slots: ["dummyLabel", "visualLabel"],
            },
        ],
        defaultVariants: {
            variant: "filled",
        },
        slots: {
            activeIndicator:
                "group-focus-within/text-field:!border-primary group-hover/text-field:border-on-surface peer-disabled/text-field-input:!border-on-surface/38 absolute inset-0 transition-all",
            container:
                "group/state-layer caret-primary group/text-field has-disabled:cursor-auto relative inline-flex cursor-text flex-col px-4",
            dummyLabel: "text-body-s text-transparent",
            dummyWrapper: "",
            input: "text-on-surface text-body-l peer/text-field-input peer/state-layer focus:placeholder:text-on-surface-variant disabled:text-on-surface/38 z-10 outline-none transition-all placeholder:text-transparent placeholder:transition-colors",
            stateLayer: "absolute inset-0",
            visualLabel: [
                "text-on-surface-variant text-body-l peer-disabled/text-field-input:text-on-surface/38 absolute top-1/2 -translate-y-1/2 transition-all",
                "group-focus-within/text-field:text-primary group-focus-within/text-field:text-body-s group-focus-within/text-field:translate-y-0",
                "peer-not-placeholder-shown/text-field-input:text-body-s peer-not-placeholder-shown/text-field-input:translate-y-0",
            ],
        },
        variants: {
            variant: {
                filled: {
                    activeIndicator:
                        "border-on-surface-variant border-b-1 group-focus-within/text-field:border-b-2",
                    container:
                        "bg-surface-container-highest has-disabled:bg-on-surface/4 rounded-t-xs py-2",
                    dummyWrapper: "-order-1",
                    stateLayer: "rounded-t-xs",
                    visualLabel:
                        "peer-not-placeholder-shown/text-field-input:top-2 group-focus-within/text-field:top-2",
                },
                outlined: {
                    activeIndicator:
                        "border-outline border-1 rounded-b-xs top-3 !border-t-0 group-focus-within/text-field:border-2",
                    container: "rounded-xs py-4",
                    dummyLabel: [
                        "relative flex flex-row px-2",
                        "before:bg-outline before:absolute before:left-0 before:h-px before:w-1 before:rounded-r-full",
                        "group-focus-within/text-field:before:!bg-primary group-hover/text-field:before:bg-on-surface peer-disabled/text-field-input:before:!bg-on-surface/38 group-focus-within/text-field:before:h-[2px]",
                        "",
                        "after:bg-outline after:absolute after:right-0 after:h-px after:w-1 after:rounded-l-full",
                        "group-focus-within/text-field:after:!bg-primary group-hover/text-field:after:bg-on-surface peer-disabled/text-field-input:after:!bg-on-surface/38 group-focus-within/text-field:after:h-[2px]",
                    ],
                    dummyWrapper: [
                        "absolute left-0 right-0 top-0 flex h-3 flex-row",
                        "before:border-t-1 before:border-l-1 before:rounded-tl-xs before:border-outline before:h-full before:w-2",
                        "group-focus-within/text-field:before:!border-primary group-hover/text-field:before:border-on-surface peer-disabled/text-field-input:before:!border-on-surface/38 group-focus-within/text-field:before:border-l-2 group-focus-within/text-field:before:border-t-2",
                        "after:border-t-1 after:border-r-1 after:rounded-tr-xs after:border-outline after:h-full after:grow",
                        "group-focus-within/text-field:after:!border-primary group-hover/text-field:after:border-on-surface peer-disabled/text-field-input:after:!border-on-surface/38 group-focus-within/text-field:after:border-r-2 group-focus-within/text-field:after:border-t-2",
                    ],
                    stateLayer: "rounded-xs",
                    visualLabel:
                        "peer-not-placeholder-shown/text-field-input:-top-2 group-focus-within/text-field:-top-2",
                },
            },
        },
    });

    export const variants = tv(variantsConfig);
</script>

<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";

    import { type WrapperProps } from "$lib/types/style.js";

    import StateLayer from "./StateLayer.svelte";

    let {
        activeIndicatorClass,
        containerClass,
        dummyLabelClass,
        dummyWrapperClass,
        inputClass,
        placeholder = "",
        ref = $bindable(null),
        stateLayerClass,
        value = $bindable(""),
        variant,
        visualLabelClass,
        ...props
    }: WrapperProps<
        HTMLAttributes<HTMLInputElement>,
        typeof variants,
        {
            ref?: HTMLLabelElement | null;
        }
    > = $props();

    let classes = $derived(variants({ variant }));
</script>

<label bind:this={ref} class={classes.container({ class: containerClass })}>
    <input
        class={classes.input({ class: inputClass })}
        {placeholder}
        bind:value
        {...props}
    />
    <div class={classes.dummyWrapper({ class: dummyWrapperClass })}>
        <span class={classes.dummyLabel({ class: dummyLabelClass })}>Label</span
        >
    </div>
    <span class={classes.visualLabel({ class: visualLabelClass })}>Label</span>
    <StateLayer
        active="none"
        containerClass={classes.stateLayer({ class: stateLayerClass })}
        disabled="peer"
        focus="none"
        target={ref}
    />
    <div class={classes.activeIndicator({ class: activeIndicatorClass })}></div>
</label>
