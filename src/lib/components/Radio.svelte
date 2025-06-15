<script lang="ts" module>
    import { mergeVariants, tv } from "$lib/style.js";

    export const variantsConfig = mergeVariants({
        slots: {
            container:
                "disabled:border-on-surface/38 group/radio group/state-layer border-on-surface-variant ui-checked:border-primary relative inline-flex size-5 cursor-pointer items-center justify-center rounded-full border-2 transition-colors disabled:cursor-default",
            icon: "bg-on-surface-variant group-ui-checked/radio:bg-primary group-ui-checked/radio:size-2.5 group-disabled/radio:bg-on-surface/38 absolute inline-flex size-0 rounded-full transition-[background-color,width,height]",
            stateLayer:
                "group-ui-checked/state-layer:text-primary absolute size-10 rounded-full",
        },
    });

    export const variants = tv(variantsConfig);
</script>

<script lang="ts">
    import { type WrapperProps } from "$lib/types/style.js";
    import { RadioGroup } from "bits-ui";

    import StateLayer from "./StateLayer.svelte";

    let {
        containerClass,
        iconClass,
        ref = $bindable(null),
        stateLayerClass,
        ...props
    }: WrapperProps<RadioGroup.ItemProps, typeof variants> = $props();

    let classes = $derived(variants({}));
</script>

<RadioGroup.Item
    class={classes.container({ class: containerClass })}
    bind:ref
    {...props}
>
    <StateLayer
        containerClass={classes.stateLayer({ class: stateLayerClass })}
        target={ref}
    />

    <span class={classes.icon({ class: iconClass })}></span>
</RadioGroup.Item>
