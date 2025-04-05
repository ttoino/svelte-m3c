<script module lang="ts">
    import { tv } from "$lib/style.js";

    export const variants = tv({
        base: "bg-outline-variant h-px w-full",
    });
</script>

<script lang="ts">
    import { type VariantProps } from "$lib/style.js";
    import type { HTMLAttributes } from "svelte/elements";

    let {
        class: className,
        ...props
    }: VariantProps<HTMLAttributes<HTMLHRElement>, typeof variants> = $props();
</script>

<hr class={variants({ className })} {...props} />
