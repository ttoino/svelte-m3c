<script lang="ts" module>
    import { tv } from "$lib/style.js";

    import { variants as base } from "./List.svelte";

    export const variants = tv({
        base: "shadow-2 rounded-xs bg-surface-container z-50",
        extend: base,
    });
</script>

<script lang="ts">
    import type { MenuStrategy } from "$lib/types/menu.js";
    import type { VariantProps } from "$lib/types/style.js";

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
        portal = true,
        portalProps,
        rootProps,
        strategy: baseStrategy = "context",
        trigger,
        triggerProps,
        ...props
    }: VariantProps<
        WithoutChild<ContextMenu.ContentProps & DropdownMenu.ContentProps>,
        typeof variants,
        "class",
        {
            portal?: boolean;
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

    {#if portal && !sub}
        <Component.Portal {...portalProps}>
            {@render content()}
        </Component.Portal>
    {:else}
        {@render content()}
    {/if}
</Root>
