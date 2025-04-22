<script module lang="ts">
    import { tv } from "$lib/style.js";

    export const variants = tv({
        base: "inline-flex flex-row",
    });
</script>

<script lang="ts">
    import { type ClassProps } from "$lib/style.js";
    import { ToggleGroup } from "bits-ui";

    let {
        class: className,
        ref = $bindable(null),
        value = $bindable(),
        ...props
    }: ClassProps<ToggleGroup.RootProps> = $props();
</script>

<ToggleGroup.Root
    class={variants({ className })}
    bind:ref
    bind:value={value as never}
    {...props}
/>
