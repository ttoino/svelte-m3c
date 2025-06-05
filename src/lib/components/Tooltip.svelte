<script module lang="ts">
    import { tv } from "$lib/style.js";

    export const variants = tv({
        base: "bg-inverse-surface rounded-xs text-body-s text-inverse-on-surface starting:opacity-0 z-50 m-2 inline-flex min-h-6 items-center px-2 transition-opacity",
    });
</script>

<script lang="ts">
    import { type VariantProps } from "$lib/types/style.js";
    import { Tooltip } from "bits-ui";

    let {
        class: className,
        ref = $bindable(null),
        ...props
    }: VariantProps<Tooltip.ContentProps, typeof variants> = $props();
</script>

<Tooltip.Content class={variants({ className })} bind:ref {...props} />
