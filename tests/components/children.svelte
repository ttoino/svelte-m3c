<script lang="ts" module>
    export { iconAndLabel, label };
</script>

<script lang="ts">
    import { Icon } from "$lib/index.js";
</script>

{#snippet iconAndLabel()}
    <Icon icon="edit" /> Edit
{/snippet}

{#snippet label()}
    Edit
{/snippet}
