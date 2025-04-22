<script lang="ts">
    import { type ExtendProps } from "$lib/style.js";
    import { ContextMenu, DropdownMenu } from "bits-ui";
    import { setContext } from "svelte";

    let {
        open = $bindable(false),
        type,
        ...props
    }: ExtendProps<
        ContextMenu.RootProps & DropdownMenu.RootProps,
        {
            type: "context" | "dropdown";
        }
    > = $props();

    setContext("menu.type", type);

    let Base = $derived(type === "context" ? ContextMenu : DropdownMenu);
</script>

<Base.Root bind:open {...props} />
