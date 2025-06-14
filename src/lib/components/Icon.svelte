<script lang="ts" module>
    import { tv } from "$lib/style.js";

    export const variants = tv({
        base: "icon inline-block select-none align-middle",
    });
</script>

<script lang="ts">
    import type { WrapperProps } from "$lib/types/style.js";
    import type { MaterialSymbol } from "material-symbols";
    import type { HTMLAttributes } from "svelte/elements";

    let {
        class: className,
        icon,
        ...props
    }: WrapperProps<
        HTMLAttributes<HTMLSpanElement>,
        typeof variants,
        {
            icon: MaterialSymbol;
        }
    > = $props();
</script>

<span class={variants({ className })} {...props}>{icon}</span>
