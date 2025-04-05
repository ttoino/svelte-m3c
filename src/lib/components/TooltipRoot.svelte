<script lang="ts">
    import { Tooltip } from "bits-ui";

    let { open = $bindable(false), ...props }: Tooltip.RootProps = $props();
</script>

<Tooltip.Root bind:open {...props} />
