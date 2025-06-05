<script lang="ts">
    import {
        getMenuBase,
        getMenuType,
        isSubMenu,
        setMenuType,
        setSubMenu,
        setSubMenuTrigger,
    } from "$lib/context/menu.js";
    import type { MenuType } from "$lib/types/menu.js";
    import type { ExtendProps } from "$lib/types/style.js";
    import { ContextMenu, DropdownMenu } from "bits-ui";

    const originalType = getMenuType();
    const sub = isSubMenu();

    let {
        open = $bindable(false),
        type = originalType ?? "dropdown",
        ...props
    }: ExtendProps<
        ContextMenu.RootProps &
            DropdownMenu.RootProps &
            ContextMenu.SubProps &
            DropdownMenu.SubProps,
        {
            type?: MenuType;
        }
    > = $props();

    setMenuType(type);
    setSubMenu();
    setSubMenuTrigger(sub);

    let Base = getMenuBase();

    let Component = $derived(sub ? Base.Sub : Base.Root);
</script>

<Component bind:open {...props} />
