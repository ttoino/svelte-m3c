<script module lang="ts">
    import { tv } from "$lib/style.js";

    export const variants = tv({
        slots: {
            root: "size-full overflow-hidden",
            viewport: "size-full max-h-full max-w-full",
            scrollbar:
                "ui-vertical:w-2 ui-horizontal:h-2 ui-vertical:hover:w-3 ui-horizontal:hover:h-3 transition-all",
            thumb: "bg-on-surface/38 hover:bg-secondary size-full rounded-full transition-all",
            corner: "",
        },
    });
</script>

<script lang="ts">
    import { ScrollArea } from "bits-ui";
    import type { VariantProps } from "$lib/style.js";

    let {
        children,
        ref = $bindable(null),
        class: className,
        viewportClass,
        scrollbarClass,
        thumbClass,
        cornerClass,
        orientation = "vertical",
        ...props
    }: VariantProps<
        ScrollArea.RootProps,
        typeof variants,
        | "class"
        | "viewportClass"
        | "scrollbarClass"
        | "thumbClass"
        | "cornerClass",
        {
            orientation?: "horizontal" | "vertical" | "both";
        }
    > = $props();

    let { root, viewport, scrollbar, thumb, corner } = $derived(variants());
</script>

<ScrollArea.Root class={root({ className })} bind:ref {...props}>
    <ScrollArea.Viewport
        class={viewport({ class: viewportClass })}
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
