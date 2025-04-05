<script lang="ts">
    import { twMerge, type ClassProps } from "$lib/style.js";
    import { Tooltip } from "bits-ui";

    let {
        ref = $bindable(null),
        class: className,
        ...props
    }: ClassProps<Tooltip.ContentProps> = $props();
</script>

<Tooltip.Content
    class={twMerge(
        "bg-inverse-surface rounded-xs text-body-s text-inverse-on-surface starting:opacity-0 z-50 m-2 inline-flex min-h-6 items-center px-2 transition-opacity",
        className,
    )}
    bind:ref
    {...props}
/>
