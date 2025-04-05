<script lang="ts">
    import {
        Tooltip,
        type WithChildren,
        type WithoutChildrenOrChild,
    } from "bits-ui";

    let {
        children,
        tooltip,
    }: WithChildren<{
        tooltip?: WithoutChildrenOrChild<Tooltip.ProviderProps>;
    }> = $props();
</script>

<Tooltip.Provider {...tooltip}>
    {@render children?.()}
</Tooltip.Provider>
