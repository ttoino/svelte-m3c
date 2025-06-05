<script module lang="ts">
    import { tv } from "$lib/style.js";

    export const variants = tv({
        base: "bg-outline-variant h-px w-full border-none",
    });
</script>

<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";

    import { type VariantProps } from "$lib/types/style.js";

    let {
        class: className,
        ...props
    }: VariantProps<HTMLAttributes<HTMLHRElement>, typeof variants> = $props();
</script>

<hr class={variants({ className })} {...props} />
