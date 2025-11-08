<script lang="ts" module>
    import type { WrapperProps } from "$lib/types/style.js";

    import { mergeVariants, tv } from "$lib/style.js";

    export const variantsConfig = mergeVariants({
        slots: {
            container: "flex flex-col items-stretch",
            content: "flex-1",
            divider: "absolute bottom-0 left-0 right-0",
            tabs: "relative flex flex-row overflow-x-auto *:flex-1",
        },
    });

    export const variants = tv(variantsConfig);
</script>

<script lang="ts">
    import type { ComponentProps, Snippet } from "svelte";

    import { Tabs, type WithoutChildrenOrChild } from "bits-ui";

    import Divider from "./Divider.svelte";

    let {
        containerClass,
        content,
        contentClass,
        dividerClass,
        dividerProps,
        listProps,
        tabs,
        tabsClass,
        value = $bindable(undefined),
        ...props
    }: WrapperProps<
        WithoutChildrenOrChild<Tabs.RootProps>,
        typeof variants,
        {
            content?: Snippet;
            dividerProps?: Omit<ComponentProps<typeof Divider>, "class">;
            listProps?: Omit<WithoutChildrenOrChild<Tabs.ListProps>, "class">;
            tabs?: Snippet;
        }
    > = $props();

    let classes = $derived(variants({}));
</script>

<Tabs.Root
    class={classes.container({ class: containerClass })}
    bind:value
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
