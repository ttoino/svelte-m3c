<script lang="ts" module>
    import { mergeVariants, tv } from "$lib/style.js";

    import { variantsConfig as base } from "./List.svelte";

    export const variantsConfig = mergeVariants(base, {
        base: "z-50 max-h-[min(var(--bits-floating-available-height),50vh)] overflow-y-auto rounded-xs bg-surface-container shadow-2",
    });

    export const variants = tv(variantsConfig);
</script>

<script lang="ts">
    import type { MenuStrategy } from "$lib/types/menu.js";
    import type { WrapperProps } from "$lib/types/style.js";

    import { getMenuStrategy, setMenuStrategy } from "$lib/context/menu.js";
    import {
        ContextMenu,
        DropdownMenu,
        type WithoutChild,
        type WithoutChildrenOrChild,
    } from "bits-ui";

    const parentStrategy = getMenuStrategy();

    let {
        class: className,
        portalProps,
        rootProps,
        strategy: baseStrategy = "context",
        trigger,
        triggerProps,
        ...props
    }: WrapperProps<
        WithoutChild<ContextMenu.ContentProps & DropdownMenu.ContentProps>,
        typeof variants,
        {
            portalProps?: WithoutChildrenOrChild<
                ContextMenu.PortalProps & DropdownMenu.PortalProps
            >;
            rootProps?: WithoutChildrenOrChild<
                ContextMenu.RootProps & DropdownMenu.RootProps
            >;
            strategy?: MenuStrategy;
            trigger: (ContextMenu.TriggerProps &
                DropdownMenu.TriggerProps)["child"];
            triggerProps?: WithoutChildrenOrChild<
                ContextMenu.TriggerProps & DropdownMenu.TriggerProps
            >;
        }
    > = $props();

    let strategy = $derived(parentStrategy?.() ?? baseStrategy);
    let sub = $derived(!!parentStrategy);

    setMenuStrategy(() => strategy);

    let Component = $derived(
        strategy === "context" ? ContextMenu : DropdownMenu,
    );
    let Content = $derived(sub ? Component.SubContent : Component.Content);
    let Root = $derived(sub ? Component.Sub : Component.Root);
    let Trigger = $derived(sub ? Component.SubTrigger : Component.Trigger);
</script>

{#snippet content()}
    <Content class={variants({ className })} {...props} />
{/snippet}

<Root {...rootProps}>
    <Trigger child={trigger} {...triggerProps} />

    {#if !sub}
        <Component.Portal {...portalProps}>
            {@render content()}
        </Component.Portal>
    {:else}
        {@render content()}
    {/if}
</Root>
