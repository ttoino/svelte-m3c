<script lang="ts" module>
    import { mergeVariants, tv } from "$lib/style.js";

    export const variantsConfig = mergeVariants({
        base: "h-px w-full border-none bg-outline-variant",
    });

    export const variants = tv(variantsConfig);
</script>

<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";

    import { type WrapperProps } from "$lib/types/style.js";

    let {
        class: className,
        ...props
    }: WrapperProps<HTMLAttributes<HTMLHRElement>, typeof variants> = $props();
</script>

<hr class={variants({ className })} {...props} />
