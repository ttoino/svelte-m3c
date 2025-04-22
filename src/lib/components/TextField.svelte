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
                "group/state-layer caret-primary group/text-field has-disabled:cursor-auto relative inline-flex cursor-text flex-col px-4 py-2",
            dummyLabel: "text-body-s text-transparent",
            input: "text-on-surface text-body-l peer/text-field-input peer/state-layer focus:placeholder:text-on-surface-variant disabled:text-on-surface/38 z-10 outline-none transition-all placeholder:text-transparent placeholder:transition-colors",
            stateLayer: "absolute inset-0",
            visualLabel: [
                "text-on-surface-variant text-body-l peer-disabled/text-field-input:text-on-surface/38 absolute top-1/2 -translate-y-1/2 transition-all",
                "group-focus-within/text-field:text-primary group-focus-within/text-field:text-body-s group-focus-within/text-field:top-2 group-focus-within/text-field:translate-y-0",
                "peer-not-placeholder-shown/text-field-input:text-body-s peer-not-placeholder-shown/text-field-input:top-2 peer-not-placeholder-shown/text-field-input:translate-y-0",
            ],
        },
        variants: {
            variant: {
                filled: {
                    activeIndicator:
                        "border-on-surface-variant border-b-1 group-focus-within/text-field:border-b-2",
                    container:
                        "bg-surface-container-highest has-disabled:bg-on-surface/4 rounded-t-xs",
                    stateLayer: "rounded-t-xs",
                },
                outlined: {
                    activeIndicator:
                        "border-outline border-1 rounded-xs group-focus-within/text-field:border-2",
                    container: "rounded-xs",
                    stateLayer: "rounded-xs",
                },
            },
        },
    });
</script>

<script>
    import type { HTMLAttributes } from "svelte/elements";

    import { type VariantProps } from "$lib/style.js";

    import StateLayer from "./StateLayer.svelte";

    let {
        activeIndicatorClass,
        containerClass,
        dummyLabelClass,
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
    <span class={classes.dummyLabel({ class: dummyLabelClass })}>Label</span>
    <input
        class={classes.input({ class: inputClass })}
        {placeholder}
        {...props}
    />
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
