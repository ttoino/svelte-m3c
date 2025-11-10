<script lang="ts" module>
    /* eslint-disable perfectionist/sort-objects */
    const components = {
        Buttons: {
            // "button-group": {
            //     title: "Button groups",
            //     description:
            //         "Button groups organize buttons and add interactions between them",
            // },
            button: {
                title: "Common buttons",
                description: "Buttons prompt most actions in a UI",
            },
            // "fab-menu": {
            //     title: "FAB menu",
            //     description:
            //         "The floating action button (FAB) menu opens from a FAB to display multiple related actions",
            // },
            // fab: {
            //     title: "Floating action buttons (FABs)",
            //     description:
            //         "Floating action buttons (FABs) help people take primary actions",
            // },
            "icon-button": {
                title: "Icon buttons",
                description:
                    "Icon buttons help people take actions with a single tap",
            },
            // "split-button": {
            //     title: "Split buttons",
            //     description:
            //         "Split buttons open a menu to give people more options related to an action",
            // },
        },
        "Form elements": {
            // checkbox: {
            //     title: "Checkbox",
            //     description:
            //         "Checkboxes let users select one or more items from a list, or turn an item on or off",
            // },
            // "date-picker": {
            //     title: "Date pickers",
            //     description:
            //         "Date pickers let people select a date, or a range of dates",
            // },
            // radio: {
            //     title: "Radio button",
            //     description:
            //         "Radio buttons let people select one option from a set of options",
            // },
            slider: {
                title: "Sliders",
                description:
                    "Sliders allow users to make selections from a range of values",
            },
            switch: {
                title: "Switch",
                description:
                    "Switches toggle the selection of an item on and off",
            },
            // "text-field": {
            //     title: "Text fields",
            //     description: "Text fields let users enter text into a UI",
            // },
            // "time-picker": {
            //     title: "Time pickers",
            //     description:
            //         "Time pickers help people select and set a specific time",
            // },
        },
        Informational: {
            // badge: {
            //     title: "Badges",
            //     description:
            //         "Badges show notifications, counts, or status information on navigation items and icons",
            // },
            // carousel: {
            //     title: "Carousel",
            //     description:
            //         "Carousels show a collection of items that can be scrolled on and off the screen",
            // },
            // chip: {
            //     title: "Chips",
            //     description:
            //         "Chips help people enter information, make selections, filter content, or trigger actions",
            // },
            // menu: {
            //     title: "Menus",
            //     description:
            //         "Menus display a list of choices on a temporary surface",
            // },
            // snackbar: {
            //     title: "Snackbar",
            //     description:
            //         "Snackbars show short updates about app processes at the bottom of the screen",
            // },
            // tooltip: {
            //     title: "Tooltips",
            //     description: "Tooltips display brief labels or messages",
            // },
        },
        "Loading & progress": {
            // "loading-indicator": {
            //     title: "Loading indicator",
            //     description:
            //         "Loading indicators show the progress of a process for a short wait time",
            // },
            // "progress-indicator": {
            //     title: "Progress indicators",
            //     description:
            //         "Progress indicators show the status of a process in real time",
            // },
        },
        Navigation: {
            // "app-bar": {
            //     title: "App bars",
            //     description:
            //         "App bars are placed at the top of the screen to help people navigate through a product ",
            // },
            // "navigation-bar": {
            //     title: "Navigation bar",
            //     description:
            //         "Navigation bars let people switch between UI views on smaller devices",
            // },
            // "navigation-rail": {
            //     title: "Navigation rail",
            //     description:
            //         "Navigation rails let people switch between UI views on mid-sized and larger devices",
            // },
            // search: {
            //     title: "Search",
            //     description:
            //         "Search lets people enter a keyword or phrase to get relevant information",
            // },
            // tabs: {
            //     title: "Tabs",
            //     description:
            //         "Tabs organize content across different screens and views",
            // },
        },
        Structural: {
            // card: {
            //     title: "Cards",
            //     description:
            //         "Cards display content and actions about a single subject",
            // },
            // dialog: {
            //     title: "Dialogs",
            //     description: "Dialogs provide important prompts in a user flow",
            // },
            // divider: {
            //     title: "Dividers",
            //     description:
            //         "Dividers are thin lines that group content in lists or other containers",
            // },
            // list: {
            //     title: "Lists",
            //     description:
            //         "Lists are continuous, vertical indexes of text and images",
            // },
            // toolbar: {
            //     title: "Toolbars",
            //     description:
            //         "Toolbars display frequently used actions relevant to the current page",
            // },
        },
        Utility: {
            // avatar: { title: "Avatar", description: "Avatars represent users graphically" },
            // icon: { title: "Icons", description: "" },
            // "state-layer": { title: "State layer", description: "" },
        },
    } as const satisfies Record<
        string,
        Record<
            string,
            {
                description: string;
                title: string;
            }
        >
    >;
    /* eslint-enable perfectionist/sort-objects */
</script>

<script lang="ts">
    import { resolve } from "$app/paths";
    import { Card } from "$lib/index.js";
    import { constEntries } from "$lib/object.js";

    import Title from "../../Title.svelte";
</script>

<Title content="Component directory" />

{#each constEntries(components) as [category, c] (category)}
    <h2>{category}</h2>

    <div class="medium:grid-cols-2 not-prose mt-4 grid gap-2">
        {#each constEntries(c) as [id, { description, title }] (id)}
            <Card containerClass="relative" variant="outlined">
                <img
                    class="aspect-video rounded-md object-cover"
                    alt=""
                    src={resolve("/thumbnail/[component].png", {
                        component: id,
                    })}
                />

                <div class="p-4">
                    <h3 class="text-title-l">
                        <a
                            class="after:absolute after:inset-0 hover:underline"
                            href={resolve(`/components/${id}`)}
                        >
                            {title}
                        </a>
                    </h3>
                    <p class="text-body-l">{description}</p>
                </div>
            </Card>
        {/each}
    </div>
{/each}
