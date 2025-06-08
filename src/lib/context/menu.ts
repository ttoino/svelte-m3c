import type { MenuStrategy } from "$lib/types/menu.js";

import { getContext, setContext } from "svelte";

export const MENU_STRATEGY = "menu.strategy";

export const setMenuStrategy = (strategy: () => MenuStrategy) =>
    setContext(MENU_STRATEGY, strategy);

export const getMenuStrategy = () =>
    getContext<(() => MenuStrategy) | undefined>(MENU_STRATEGY);
