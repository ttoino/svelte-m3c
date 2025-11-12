import { getContext, setContext } from "svelte";

export const NAVIGATION_RAIL_EXPANDED = "navigation-rail.expanded";

export const setNavigationRailExpanded = (expanded: () => boolean) =>
    setContext(NAVIGATION_RAIL_EXPANDED, expanded);

export const isNavigationRailExpanded = () =>
    getContext<(() => boolean) | undefined>(NAVIGATION_RAIL_EXPANDED);
