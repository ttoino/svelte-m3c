<script module lang="ts">
    import { tv } from "$lib/style.js";

    export const variants = tv({
        slots: {
            corner: "",
            root: "size-full overflow-hidden",
            scrollbar:
                "ui-vertical:w-2 ui-horizontal:h-2 ui-vertical:hover:w-3 ui-horizontal:hover:h-3 transition-all",
            thumb: "bg-on-surface/38 hover:bg-secondary size-full rounded-full transition-all",
            viewport: "size-full max-h-full max-w-full",
        },
    });
</script>

<script lang="ts">
    import type { VariantProps } from "$lib/style.js";

    import { ScrollArea } from "bits-ui";

    let {
        children,
        class: className,
        cornerClass,
        orientation = "vertical",
        ref = $bindable(null),
        scrollbarClass,
        thumbClass,
        viewportClass,
        viewportRef = $bindable(null),
        ...props
    }: VariantProps<
        ScrollArea.RootProps,
        typeof variants,
        | "class"
        | "cornerClass"
        | "scrollbarClass"
        | "thumbClass"
        | "viewportClass",
        {
            orientation?: "both" | "horizontal" | "vertical";
            viewportRef?: HTMLDivElement | null;
        }
    > = $props();

    let { corner, root, scrollbar, thumb, viewport } = $derived(variants());
</script>

<ScrollArea.Root class={root({ className })} bind:ref {...props}>
    <ScrollArea.Viewport
        class={viewport({ class: viewportClass })}
        bind:ref={viewportRef}
        {children}
    />

    {#if orientation === "horizontal" || orientation === "both"}
        <ScrollArea.Scrollbar
            class={scrollbar({ class: scrollbarClass })}
            orientation="horizontal"
        >
            <ScrollArea.Thumb class={thumb({ class: thumbClass })} />
        </ScrollArea.Scrollbar>
    {/if}

    {#if orientation === "vertical" || orientation === "both"}
        <ScrollArea.Scrollbar
            class={scrollbar({ class: scrollbarClass })}
            orientation="vertical"
        >
            <ScrollArea.Thumb class={thumb({ class: thumbClass })} />
        </ScrollArea.Scrollbar>
    {/if}

    <ScrollArea.Corner class={corner({ class: cornerClass })} />
</ScrollArea.Root>
