import type { MenuType } from "$lib/types/menu.js";

import { ContextMenu, DropdownMenu } from "bits-ui";
import { getContext, setContext } from "svelte";

export const MENU_TYPE = "menu.type";
export const MENU_SUB = "menu.sub";
export const MENU_SUB_TRIGGER = "menu.sub.trigger";

export const setMenuType = (type: MenuType) => setContext(MENU_TYPE, type);

export const setSubMenu = () => setContext(MENU_SUB, true);

export const setSubMenuTrigger = (trigger: boolean) =>
    setContext(MENU_SUB_TRIGGER, trigger);

export const getMenuBase = () => {
    const type = getMenuType();
    if (!type) {
        throw new Error("Menu type is not set in context");
    }
    return type === "context" ? ContextMenu : DropdownMenu;
};

export const getMenuType = () => {
    const type = getContext<MenuType | undefined>(MENU_TYPE);
    return type;
};

export const isSubMenu = () => {
    const sub = getContext<boolean>(MENU_SUB);
    return !!sub;
};

export const isSubMenuTrigger = () => {
    const subTrigger = getContext<boolean>(MENU_SUB_TRIGGER);
    return !!subTrigger;
};
