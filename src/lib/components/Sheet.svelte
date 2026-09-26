<script lang="ts" module>
    import { mergeVariants, tv } from "$lib/style.js";

    export const variantsConfig = mergeVariants({
        compoundVariants: [
            {
                direction: ["left", "right"],
                slots: {
                    container: "max-w-100",
                },
            },
            {
                direction: ["top", "bottom"],
                slots: {
                    container: "max-h-160 medium:mx-14",
                },
            },
        ],
        slots: {
            container: "w-full bg-surface shadow-1",
        },
        variants: {
            direction: {
                bottom: {
                    container: "mt-18 rounded-t-xl",
                },
                left: {
                    container: "rounded-r-lg",
                },
                right: {
                    container: "rounded-l-lg",
                },
                top: {
                    container: "mb-18 rounded-b-xl",
                },
            },
        },
    });

    export const variants = tv(variantsConfig);
</script>

<script lang="ts">
    import type { WrapperProps } from "$lib/types/style.js";
    import type { WithoutChildrenOrChild } from "bits-ui";

    import { Drawer } from "vaul-svelte";

    let {
        containerClass,
        overlayProps,
        portalProps,
        rootProps,
        trigger,
        triggerProps,
        ...props
    }: WrapperProps<
        Drawer.ContentProps,
        typeof variants,
        {
            overlayProps?: WithoutChildrenOrChild<Drawer.OverlayProps>;
            portalProps?: WithoutChildrenOrChild<Drawer.PortalProps>;
            rootProps?: WithoutChildrenOrChild<Drawer.RootProps>;
            trigger?: Drawer.TriggerProps["child"];
            triggerProps?: WithoutChildrenOrChild<Drawer.TriggerProps>;
        }
    > = $props();

    let classes = $derived(variants({}));
</script>

<Drawer.Root {...rootProps}>
    <Drawer.Trigger child={trigger} {...triggerProps} />

    <Drawer.Portal {...portalProps}>
        <Drawer.Overlay {...overlayProps} />
        <Drawer.Content
            class={classes.container({ class: containerClass })}
            {...props}
        />
    </Drawer.Portal>
</Drawer.Root>
