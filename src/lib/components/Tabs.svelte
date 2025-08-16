<script lang="ts" module>
    import { mergeVariants, tv } from "$lib/style.js";
    import type { WrapperProps } from "$lib/types/style.js";

    export const variantsConfig = mergeVariants({
        slots: {
            container: "flex flex-col items-stretch",
            divider: "absolute bottom-0 left-0 right-0",
            tabs: "overflow-x-auto *:flex-1 flex flex-row relative",
            content: "flex-1",
        },
    });

    export const variants = tv(variantsConfig);
</script>

<script lang="ts">
    import { Tabs, type WithoutChildrenOrChild } from "bits-ui";
    import type { ComponentProps, Snippet } from "svelte";
    import Divider from "./Divider.svelte";

    let {
        tabs,
        content,
        dividerProps,
        dividerClass,
        listProps,
        containerClass,
        tabsClass,
        contentClass,
        value = $bindable(undefined),
        ...props
    }: WrapperProps<
        WithoutChildrenOrChild<Tabs.RootProps>,
        typeof variants,
        {
            tabs?: Snippet;
            content?: Snippet;
            listProps?: Omit<WithoutChildrenOrChild<Tabs.ListProps>, "class">;
            dividerProps?: Omit<ComponentProps<typeof Divider>, "class">;
        }
    > = $props();

    let classes = $derived(variants({}));
</script>

<Tabs.Root
    bind:value
    class={classes.container({ class: containerClass })}
    {...props}
>
    <Tabs.List class={classes.tabs({ class: tabsClass })} {...listProps}>
        <Divider
            class={classes.divider({ class: dividerClass })}
            {...dividerProps}
        />

        {@render tabs?.()}
    </Tabs.List>

    <div class={classes.content({ class: contentClass })}>
        {@render content?.()}
    </div>
</Tabs.Root>
