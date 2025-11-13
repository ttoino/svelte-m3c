import type { IconName } from "$lib/index.js";

/* eslint-disable perfectionist/sort-objects */
export const components = {
    Buttons: {
        "button-group": {
            icon: "steppers",
            title: "Button groups",
            description:
                "Button groups organize buttons and add interactions between them",
        },
        button: {
            icon: "buttons_alt",
            title: "Common buttons",
            description: "Buttons prompt most actions in a UI",
        },
        // "fab-menu": {
        //     icon: "more_vert",
        //     title: "FAB menu",
        //     description:
        //         "The floating action button (FAB) menu opens from a FAB to display multiple related actions",
        // },
        // fab: {
        //     icon: "add_circle",
        //     title: "Floating action buttons (FABs)",
        //     description:
        //         "Floating action buttons (FABs) help people take primary actions",
        // },
        "icon-button": {
            icon: "add",
            title: "Icon buttons",
            description:
                "Icon buttons help people take actions with a single tap",
        },
        // "split-button": {
        //     icon: "unknown_med",
        //     title: "Split buttons",
        //     description:
        //         "Split buttons open a menu to give people more options related to an action",
        // },
    },
    "Form elements": {
        checkbox: {
            icon: "check_box",
            title: "Checkbox",
            description:
                "Checkboxes let users select one or more items from a list, or turn an item on or off",
        },
        // "date-picker": {
        //     icon: "calendar_month",
        //     title: "Date pickers",
        //     description:
        //         "Date pickers let people select a date, or a range of dates",
        // },
        radio: {
            icon: "radio_button_checked",
            title: "Radio button",
            description:
                "Radio buttons let people select one option from a set of options",
        },
        slider: {
            icon: "sliders",
            title: "Sliders",
            description:
                "Sliders allow users to make selections from a range of values",
        },
        switch: {
            icon: "toggle_on",
            title: "Switch",
            description: "Switches toggle the selection of an item on and off",
        },
        // "text-field": {
        //     icon: "password_2",
        //     title: "Text fields",
        //     description: "Text fields let users enter text into a UI",
        // },
        // "time-picker": {
        //     icon: "schedule",
        //     title: "Time pickers",
        //     description:
        //         "Time pickers help people select and set a specific time",
        // },
    },
    Informational: {
        // badge: {
        //     icon: "app_badging",
        //     title: "Badges",
        //     description:
        //         "Badges show notifications, counts, or status information on navigation items and icons",
        // },
        // carousel: {
        //     icon: "view_carousel",
        //     title: "Carousel",
        //     description:
        //         "Carousels show a collection of items that can be scrolled on and off the screen",
        // },
        // chip: {
        //     icon: "location_chip",
        //     title: "Chips",
        //     description:
        //         "Chips help people enter information, make selections, filter content, or trigger actions",
        // },
        // menu: {
        //     icon: "dropdown",
        //     title: "Menus",
        //     description:
        //         "Menus display a list of choices on a temporary surface",
        // },
        // snackbar: {
        //     icon: "toast",
        //     title: "Snackbar",
        //     description:
        //         "Snackbars show short updates about app processes at the bottom of the screen",
        // },
        // tooltip: {
        //     icon: "tooltip_2",
        //     title: "Tooltips",
        //     description: "Tooltips display brief labels or messages",
        // },
    },
    "Loading & progress": {
        // "loading-indicator": {
        //     icon: "stars",
        //     title: "Loading indicator",
        //     description:
        //         "Loading indicators show the progress of a process for a short wait time",
        // },
        "progress-indicator": {
            icon: "progress_activity",
            title: "Progress indicators",
            description:
                "Progress indicators show the status of a process in real time",
        },
    },
    Navigation: {
        // "app-bar": {
        //     icon: "toolbar",
        //     title: "App bars",
        //     description:
        //         "App bars are placed at the top of the screen to help people navigate through a product ",
        // },
        // "navigation-bar": {
        //     icon: "bottom_navigation",
        //     title: "Navigation bar",
        //     description:
        //         "Navigation bars let people switch between UI views on smaller devices",
        // },
        // "navigation-rail": {
        //     icon: "side_navigation",
        //     title: "Navigation rail",
        //     description:
        //         "Navigation rails let people switch between UI views on mid-sized and larger devices",
        // },
        // search: {
        //     icon: "pageview",
        //     title: "Search",
        //     description:
        //         "Search lets people enter a keyword or phrase to get relevant information",
        // },
        // tabs: {
        //     icon: "tabs",
        //     title: "Tabs",
        //     description:
        //         "Tabs organize content across different screens and views",
        // },
    },
    Structural: {
        // card: {
        //     icon: "cards",
        //     title: "Cards",
        //     description:
        //         "Cards display content and actions about a single subject",
        // },
        // dialog: {
        //     icon: "dialogs",
        //     title: "Dialogs",
        //     description: "Dialogs provide important prompts in a user flow",
        // },
        // divider: {
        //     icon: "horizontal_rule",
        //     title: "Dividers",
        //     description:
        //         "Dividers are thin lines that group content in lists or other containers",
        // },
        list: {
            icon: "list",
            title: "Lists",
            description:
                "Lists are continuous, vertical indexes of text and images",
        },
        // toolbar: {
        //     icon: "bottom_app_bar",
        //     title: "Toolbars",
        //     description:
        //         "Toolbars display frequently used actions relevant to the current page",
        // },
    },
    Utility: {
        // avatar: {
        //     icon: "account_circle",
        //     title: "Avatar",
        //     description: "Avatars represent users graphically",
        // },
        // icon: { icon: "interests", title: "Icons", description: "" },
        // "state-layer": {
        //     icon: "ripples",
        //     title: "State layer",
        //     description: "",
        // },
    },
} as const satisfies Record<
    string,
    Record<
        string,
        {
            description: string;
            icon: IconName;
            title: string;
        }
    >
>;
/* eslint-enable perfectionist/sort-objects */
