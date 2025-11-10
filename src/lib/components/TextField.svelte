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
                "absolute inset-0 transition-all group-focus-within/text-field:!border-primary group-hover/text-field:border-on-surface peer-disabled/text-field-input:!border-on-surface/38",
            container:
                "group/state-layer group/text-field relative inline-flex cursor-text flex-col px-4 caret-primary has-disabled:cursor-auto",
            dummyLabel: "text-body-s text-transparent",
            dummyWrapper: "",
            input: "peer/text-field-input peer/state-layer z-10 text-start text-body-l text-on-surface transition-all outline-none placeholder:text-transparent placeholder:transition-colors focus:placeholder:text-on-surface-variant disabled:text-on-surface/38",
            stateLayer: "absolute inset-0",
            visualLabel: [
                "absolute top-1/2 -translate-y-1/2 text-body-l text-on-surface-variant transition-all peer-disabled/text-field-input:text-on-surface/38",
                "group-focus-within/text-field:translate-y-0 group-focus-within/text-field:text-body-s group-focus-within/text-field:text-primary",
                "peer-not-placeholder-shown/text-field-input:translate-y-0 peer-not-placeholder-shown/text-field-input:text-body-s",
            ],
        },
        variants: {
            variant: {
                filled: {
                    activeIndicator:
                        "border-b-1 border-on-surface-variant group-focus-within/text-field:border-b-2",
                    container:
                        "rounded-t-xs bg-surface-container-highest py-2 has-disabled:bg-on-surface/4",
                    dummyWrapper: "-order-1",
                    stateLayer: "rounded-t-xs",
                    visualLabel:
                        "group-focus-within/text-field:top-2 peer-not-placeholder-shown/text-field-input:top-2",
                },
                outlined: {
                    activeIndicator:
                        "top-3 rounded-b-xs border-1 !border-t-0 border-outline group-focus-within/text-field:border-2",
                    container: "rounded-xs py-4",
                    dummyLabel: [
                        "relative flex flex-row px-2",
                        "before:absolute before:left-0 before:h-px before:w-1 before:rounded-r-full before:bg-outline",
                        "group-focus-within/text-field:before:h-[2px] group-focus-within/text-field:before:!bg-primary group-hover/text-field:before:bg-on-surface peer-disabled/text-field-input:before:!bg-on-surface/38",
                        "",
                        "after:absolute after:right-0 after:h-px after:w-1 after:rounded-l-full after:bg-outline",
                        "group-focus-within/text-field:after:h-[2px] group-focus-within/text-field:after:!bg-primary group-hover/text-field:after:bg-on-surface peer-disabled/text-field-input:after:!bg-on-surface/38",
                    ],
                    dummyWrapper: [
                        "absolute top-0 right-0 left-0 flex h-3 flex-row",
                        "before:h-full before:w-2 before:rounded-tl-xs before:border-t-1 before:border-l-1 before:border-outline",
                        "group-focus-within/text-field:before:border-t-2 group-focus-within/text-field:before:border-l-2 group-focus-within/text-field:before:!border-primary group-hover/text-field:before:border-on-surface peer-disabled/text-field-input:before:!border-on-surface/38",
                        "after:h-full after:grow after:rounded-tr-xs after:border-t-1 after:border-r-1 after:border-outline",
                        "group-focus-within/text-field:after:border-t-2 group-focus-within/text-field:after:border-r-2 group-focus-within/text-field:after:!border-primary group-hover/text-field:after:border-on-surface peer-disabled/text-field-input:after:!border-on-surface/38",
                    ],
                    stateLayer: "rounded-xs",
                    visualLabel:
                        "group-focus-within/text-field:-top-2 peer-not-placeholder-shown/text-field-input:-top-2",
                },
            },
        },
    });

    export const variants = tv(variantsConfig);
</script>

<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    import { type WrapperProps } from "$lib/types/style.js";

    import StateLayer from "./StateLayer.svelte";

    let {
        activeIndicatorClass,
        containerClass,
        dummyLabelClass,
        dummyWrapperClass,
        inputClass,
        label,
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
            label?: Snippet;
            ref?: HTMLLabelElement | null;
            value?: string;
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
        <span class={classes.dummyLabel({ class: dummyLabelClass })}>
            {@render label?.()}
        </span>
    </div>
    <span class={classes.visualLabel({ class: visualLabelClass })}>
        {@render label?.()}
    </span>
    <StateLayer
        active="none"
        containerClass={classes.stateLayer({ class: stateLayerClass })}
        disabled="peer"
        focus="none"
        target={ref}
    />
    <div class={classes.activeIndicator({ class: activeIndicatorClass })}></div>
</label>
