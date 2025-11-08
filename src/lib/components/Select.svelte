<script lang="ts" module>
    import { mergeVariants, tv } from "$lib/style.js";

    import { variants as menu } from "./Menu.svelte";
    import { variantsConfig as base } from "./TextField.svelte";

    export const variantsConfig = mergeVariants(base, {
        slots: {
            container: "cursor-pointer",
            list: [menu(), "w-(--bits-floating-anchor-width)"],
        },
    });

    export const variants = tv(variantsConfig);
</script>

<script lang="ts">
    import type { WrapperProps } from "$lib/types/style.js";
    import type { Snippet } from "svelte";

    import { Select } from "bits-ui";

    import StateLayer from "./StateLayer.svelte";

    let {
        activeIndicatorClass,
        children,
        containerClass,
        dummyLabelClass,
        dummyWrapperClass,
        input,
        inputClass,
        label,
        onValueChange,
        stateLayerClass,
        value = $bindable(),
        variant,
        visualLabelClass,
        ...props
    }: WrapperProps<
        Select.RootProps,
        typeof variants,
        {
            input?: Snippet<[string | string[] | undefined]>;
            label?: Snippet;
        }
    > = $props();

    let classes = $derived(variants({ variant }));
</script>

<Select.Root
    onValueChange={onValueChange as never}
    bind:value={value as never}
    {...props}
>
    <Select.Trigger class={classes.container({ class: containerClass })}>
        <span class={classes.input({ class: inputClass })}>
            {@render input?.(value)}
        </span>
        <div class={classes.dummyWrapper({ class: dummyWrapperClass })}>
            <span class={classes.dummyLabel({ class: dummyLabelClass })}>
                {@render label?.()}
            </span>
        </div>
        <span class={classes.visualLabel({ class: visualLabelClass })}>
            {@render label?.()}
        </span>
        <StateLayer
            containerClass={classes.stateLayer({ class: stateLayerClass })}
        />
        <div
            class={classes.activeIndicator({ class: activeIndicatorClass })}
        ></div>
    </Select.Trigger>
    <Select.Portal>
        <Select.Content class={classes.list()}>
            {@render children?.()}
        </Select.Content>
    </Select.Portal>
</Select.Root>
