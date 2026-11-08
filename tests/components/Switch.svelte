<script lang="ts">
    import { Switch } from "$lib/index.js";

    let { checked, icons }: { checked: boolean; icons: boolean } = $props();

    let checkedIcon = $derived(icons ? ("check" as const) : undefined);
    let uncheckedIcon = $derived(icons ? ("close" as const) : undefined);
</script>

<Switch {checked} {checkedIcon} {uncheckedIcon} />
