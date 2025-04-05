<script lang="ts">
    import { twMerge, type ClassProps } from "$lib/style.js";
    import { ToggleGroup } from "bits-ui";

    let {
        ref = $bindable(null),
        class: className,
        value = $bindable(),
        ...props
    }: ClassProps<ToggleGroup.RootProps> = $props();
</script>

<ToggleGroup.Root
    class={twMerge("inline-flex flex-row", className)}
    bind:ref
    bind:value={value as never}
    {...props}
/>
