<script lang="ts" module>
    import { tv } from "$lib/style.js";

    export const variants = tv({
        slots: {
            container: "size-full overflow-hidden",
            corner: "",
            scrollbar:
                "ui-vertical:w-2 ui-horizontal:h-2 ui-vertical:hover:w-3 ui-horizontal:hover:h-3 transition-all",
            thumb: "bg-on-surface/38 hover:bg-secondary z-40 size-full rounded-full transition-all",
            viewport: "size-full max-h-full max-w-full",
        },
    });
</script>

<script lang="ts">
    import type { WrapperProps } from "$lib/types/style.js";

    import { ScrollArea } from "bits-ui";

    let {
        children,
        containerClass,
        cornerClass,
        orientation = "vertical",
        ref = $bindable(null),
        scrollbarClass,
        thumbClass,
        viewportClass,
        viewportRef = $bindable(null),
        ...props
    }: WrapperProps<
        ScrollArea.RootProps,
        typeof variants,
        {
            orientation?: "both" | "horizontal" | "vertical";
            viewportRef?: HTMLDivElement | null;
        }
    > = $props();

    let classes = $derived(variants());
</script>

<ScrollArea.Root
    class={classes.container({ class: containerClass })}
    bind:ref
    {...props}
>
    <ScrollArea.Viewport
        class={classes.viewport({ class: viewportClass })}
        {children}
        bind:ref={viewportRef}
    />

    {#if orientation === "horizontal" || orientation === "both"}
        <ScrollArea.Scrollbar
            class={classes.scrollbar({ class: scrollbarClass })}
            orientation="horizontal"
        >
            <ScrollArea.Thumb class={classes.thumb({ class: thumbClass })} />
        </ScrollArea.Scrollbar>
    {/if}

    {#if orientation === "vertical" || orientation === "both"}
        <ScrollArea.Scrollbar
            class={classes.scrollbar({ class: scrollbarClass })}
            orientation="vertical"
        >
            <ScrollArea.Thumb class={classes.thumb({ class: thumbClass })} />
        </ScrollArea.Scrollbar>
    {/if}

    <ScrollArea.Corner class={classes.corner({ class: cornerClass })} />
</ScrollArea.Root>
