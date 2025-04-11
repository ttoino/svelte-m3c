<script module lang="ts">
    // TODO: Outlined variant, error state, prefix, suffix, leading, trailing, supporting text, error text, character counter
    import { tv } from "$lib/style.js";

    export const variants = tv({
        slots: {
            container:
                "group/state-layer caret-primary group/text-field has-disabled:cursor-auto relative inline-flex cursor-text flex-col px-4 py-2",
            dummyLabel: "text-body-s text-transparent",
            input: "text-on-surface text-body-l peer/text-field-input peer/state-layer focus:placeholder:text-on-surface-variant disabled:text-on-surface/38 z-10 outline-none transition-all placeholder:text-transparent placeholder:transition-colors",
            visualLabel: [
                "text-on-surface-variant text-body-l peer-disabled/text-field-input:text-on-surface/38 absolute top-1/2 -translate-y-1/2 transition-all",
                "group-focus-within/text-field:text-primary group-focus-within/text-field:text-body-s group-focus-within/text-field:top-2 group-focus-within/text-field:translate-y-0",
                "peer-not-placeholder-shown/text-field-input:text-body-s peer-not-placeholder-shown/text-field-input:top-2 peer-not-placeholder-shown/text-field-input:translate-y-0",
            ],
            stateLayer: "absolute inset-0",
            activeIndicator:
                "group-focus-within/text-field:!border-primary group-hover/text-field:border-on-surface peer-disabled/text-field-input:!border-on-surface/38 absolute inset-0 transition-all",
        },
        variants: {
            variant: {
                filled: {
                    container:
                        "bg-surface-container-highest has-disabled:bg-on-surface/4 rounded-t-xs",
                    stateLayer: "rounded-t-xs",
                    activeIndicator:
                        "border-on-surface-variant border-b-1 group-focus-within/text-field:border-b-2",
                },
                outlined: {
                    container: "rounded-xs",
                    stateLayer: "rounded-xs",
                    activeIndicator:
                        "border-outline border-1 rounded-xs group-focus-within/text-field:border-2",
                },
            },
        },
        compoundSlots: [
            {
                slots: ["dummyLabel", "visualLabel"],
                class: "select-none",
            },
        ],
        defaultVariants: {
            variant: "filled",
        },
    });
</script>

<script>
    import { type VariantProps } from "$lib/style.js";
    import type { HTMLAttributes } from "svelte/elements";
    import StateLayer from "./StateLayer.svelte";

    let {
        ref = $bindable(null),
        class: className,
        placeholder = "",
        variant,
        ...props
    }: VariantProps<
        HTMLAttributes<HTMLInputElement>,
        typeof variants,
        "class",
        {
            ref?: HTMLLabelElement | null;
        }
    > = $props();

    let classes = $derived(variants({ variant }));
</script>

<label class={classes.container()} bind:this={ref}>
    <span class={classes.dummyLabel()}>Label</span>
    <input class={classes.input()} {placeholder} {...props} />
    <span class={classes.visualLabel()}>Label</span>
    <StateLayer
        class={classes.stateLayer()}
        target={ref}
        disabled="peer"
        focus="none"
        active="none"
    />
    <div class={classes.activeIndicator()}></div>
</label>
