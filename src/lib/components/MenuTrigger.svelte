<script lang="ts">
    import { ContextMenu, DropdownMenu } from "bits-ui";
    import { getContext } from "svelte";

    let props: ContextMenu.TriggerProps & DropdownMenu.TriggerProps = $props();

    let type = getContext("menu.type");

    let Base = $derived(type === "context" ? ContextMenu : DropdownMenu);
</script>

<Base.Trigger {...props} />
