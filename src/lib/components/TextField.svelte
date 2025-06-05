<script module lang="ts">
    // TODO: Outlined variant, error state, prefix, suffix, leading, trailing, supporting text, error text, character counter
    import { tv } from "$lib/style.js";

    export const variants = tv({
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
                    visualLabel: "group-focus-within/text-field:top-2 peer-not-placeholder-shown/text-field-input:top-2",
                },
                outlined: {
                    activeIndicator:
                        "border-outline border-1 rounded-b-xs group-focus-within/text-field:border-2 !border-t-0 top-3",
                    container: "rounded-xs py-4",
                    dummyLabel: [
                        "px-2 flex flex-row relative",
                        "before:absolute before:left-0 before:h-px before:rounded-r-full before:bg-outline before:w-1",
                        "group-focus-within/text-field:before:!bg-primary group-hover/text-field:before:bg-on-surface peer-disabled/text-field-input:before:!bg-on-surface/38 group-focus-within/text-field:before:h-[2px]",
                        "",
                        "after:absolute after:right-0 after:h-px after:rounded-l-full after:bg-outline after:w-1",
                        "group-focus-within/text-field:after:!bg-primary group-hover/text-field:after:bg-on-surface peer-disabled/text-field-input:after:!bg-on-surface/38 group-focus-within/text-field:after:h-[2px]",
                    ],
                    dummyWrapper: [
                        "absolute top-0 left-0 right-0 h-3 flex flex-row",
                        "before:w-2 before:h-full before:border-t-1 before:border-l-1 before:rounded-tl-xs before:border-outline",
                        "group-focus-within/text-field:before:!border-primary group-hover/text-field:before:border-on-surface peer-disabled/text-field-input:before:!border-on-surface/38 group-focus-within/text-field:before:border-t-2 group-focus-within/text-field:before:border-l-2",
                        "after:grow after:h-full after:border-t-1 after:border-r-1 after:rounded-tr-xs after:border-outline",
                        "group-focus-within/text-field:after:!border-primary group-hover/text-field:after:border-on-surface peer-disabled/text-field-input:after:!border-on-surface/38 group-focus-within/text-field:after:border-t-2 group-focus-within/text-field:after:border-r-2",
                    ],
                    stateLayer: "rounded-xs",
                    visualLabel: "group-focus-within/text-field:-top-2 peer-not-placeholder-shown/text-field-input:-top-2",
                },
            },
        },
    });
</script>

<script>
    import type { HTMLAttributes } from "svelte/elements";

    import { type VariantProps } from "$lib/types/style.js";

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
        variant,
        visualLabelClass,
        ...props
    }: VariantProps<
        HTMLAttributes<HTMLInputElement>,
        typeof variants,
        | "activeIndicatorClass"
        | "containerClass"
        | "dummyLabelClass"
        | "dummyWrapperClass"
        | "inputClass"
        | "stateLayerClass"
        | "visualLabelClass",
        {
            ref?: HTMLLabelElement | null;
        }
    > = $props();

    let classes = $derived(variants({ variant }));
</script>

<label class={classes.container({ class: containerClass })} bind:this={ref}>
    <input
        class={classes.input({ class: inputClass })}
        {placeholder}
        {...props}
    />
    <div class={classes.dummyWrapper({ class: dummyWrapperClass })}>
        <span class={classes.dummyLabel({ class: dummyLabelClass })}>Label</span>
    </div>
    <span class={classes.visualLabel({ class: visualLabelClass })}>Label</span>
    <StateLayer
        class={classes.stateLayer({ class: stateLayerClass })}
        target={ref}
        disabled="peer"
        focus="none"
        active="none"
    />
    <div class={classes.activeIndicator({ class: activeIndicatorClass })}></div>
</label>
