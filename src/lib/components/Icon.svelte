<script lang="ts" module>
    import { mergeVariants, tv } from "$lib/style.js";

    export const variantsConfig = mergeVariants({
        base: "icon inline-block select-none align-middle",
    });

    export const variants = tv(variantsConfig);
</script>

<script lang="ts">
    import type { WrapperProps } from "$lib/types/style.js";
    import type { IconName } from "svelte-m3c";
    import type { HTMLAttributes } from "svelte/elements";

    let {
        class: className,
        icon,
        ...props
    }: WrapperProps<
        HTMLAttributes<HTMLSpanElement>,
        typeof variants,
        {
            icon: IconName;
        }
    > = $props();
</script>

<span class={variants({ className })} {...props}>{icon}</span>
