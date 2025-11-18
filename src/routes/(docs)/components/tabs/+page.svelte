<script lang="ts">
    import { Tab, TabContent, Tabs } from "$lib/index.js";

    import Title from "../../../Title.svelte";
    import Playground, { buttonGroupControl } from "../../Playground.svelte";
    import {
        renderComponentCode,
        renderSnippetCode,
    } from "../../renderCode.js";

    const tabsValues = [
        ["video", "Video", "videocam"],
        ["photos", "Photos", "photo"],
        ["audio", "Audio", "music_note"],
    ] as const;
</script>

<Title content="Tabs" />

<!-- TODO -->

<Playground
    code={({ type, ...props }) =>
        renderComponentCode("Tabs", { value: "video", ...props }, [
            renderSnippetCode(
                "tabs",
                tabsValues.map(([value, label, icon]) =>
                    renderComponentCode(
                        "Tab",
                        {
                            icon: type !== "label" ? icon : undefined,
                            value,
                        },
                        type !== "icon" ? label : undefined,
                    ),
                ),
            ),
            renderSnippetCode(
                "content",
                tabsValues.map(([value]) =>
                    renderComponentCode("TabContent", { value }),
                ),
            ),
        ])}
    controls={{
        /* eslint-disable perfectionist/sort-objects */
        type: buttonGroupControl("Type", {
            label: "Label",
            icon: "Icon",
            both: "Both",
        }),
        /* eslint-enable perfectionist/sort-objects */
    }}
    defaults={{
        type: "label" as "both" | "icon" | "label",
    }}
>
    {#snippet children({ type, ...props })}
        <Tabs
            containerClass="mx-8 flex-1 medium:mx-16"
            value="video"
            {...props}
        >
            {#snippet tabs()}
                {#each tabsValues as [value, label, icon] (value)}
                    <Tab icon={type !== "label" ? icon : undefined} {value}>
                        {#if type !== "icon"}{label}{/if}
                    </Tab>
                {/each}
            {/snippet}
            {#snippet content()}
                {#each tabsValues as [value, label] (value)}
                    <TabContent class="p-4 text-center" {value}>
                        {label} content
                    </TabContent>
                {/each}
            {/snippet}
        </Tabs>
    {/snippet}
</Playground>

<!-- TODO -->
