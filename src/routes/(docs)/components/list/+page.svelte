<script lang="ts">
    import type { Snippet } from "svelte";

    import {
        Checkbox,
        Icon,
        List,
        ListItem,
        Radio,
        RadioGroup,
        Switch,
    } from "$lib/index.js";
    import { constMapValues } from "$lib/object.js";

    import Title from "../../../Title.svelte";
    import Playground, {
        selectControl,
        textfieldControl,
    } from "../../Playground.svelte";
    import {
        renderComponentCode,
        renderSnippetCode,
    } from "../../renderCode.js";

    const checkbox = ["Checkbox", "<Checkbox />", checkboxSnippet] as const;
    const none = ["None", "", undefined] as const;
    const radio = ["Radio", "<Radio />", radioSnippet] as const;

    const leadings = {
        /* eslint-disable perfectionist/sort-objects */
        none,
        checkbox,
        radio,
        icon: ["Icon", '<Icon icon="person" />', iconSnippet],
        avatar: ["Avatar", "<Avatar />", avatarSnippet],
        image: ["Image", "<img>", imageSnippet],
        video: ["Video", "<video></video>", videoSnippet],
        /* eslint-enable perfectionist/sort-objects */
    } as const satisfies Record<
        string,
        readonly [string, string, Snippet | undefined]
    >;
    type Leading = keyof typeof leadings;

    const trailings = {
        /* eslint-disable perfectionist/sort-objects */
        none,
        checkbox,
        radio,
        switch: ["Switch", "<Switch />", switchSnippet],
        text: ["Text", "100+", textSnippet],
        /* eslint-enable perfectionist/sort-objects */
    } as const satisfies Record<
        string,
        readonly [string, string, Snippet | undefined]
    >;
    type Trailing = keyof typeof trailings;
</script>

{#snippet checkboxSnippet()}<Checkbox />{/snippet}

{#snippet radioSnippet()}<Radio value={Math.random().toString()} />{/snippet}

{#snippet iconSnippet()}<Icon icon="person" />{/snippet}

<!-- TODO -->
{#snippet avatarSnippet()}{/snippet}

{#snippet imageSnippet()}
    <img alt="" src="https://picsum.photos/200" />
{/snippet}

{#snippet videoSnippet()}
    <video
        src="https://41900a2b-56ff-46ac-9988-cf8c9aff2c5e.mdnplay.dev/shared-assets/videos/flower.webm"
    >
        <track kind="captions" />
    </video>
{/snippet}

{#snippet switchSnippet()}<Switch />{/snippet}

{#snippet textSnippet()}100+{/snippet}

<Title content="Lists" />

<!-- TODO -->

<Playground
    code={({ label, leading, supporting, trailing, ...props }) =>
        renderComponentCode(
            "List",
            {},
            Array.from({ length: 3 }).map(() =>
                renderComponentCode(
                    "ListItem",
                    {
                        ...props,
                    },
                    [
                        leading !== "none"
                            ? renderSnippetCode("leading", leadings[leading][1])
                            : "",
                        label ? renderSnippetCode("labelText", label) : "",
                        supporting
                            ? renderSnippetCode("supportingText", supporting)
                            : "",
                        trailing !== "none"
                            ? renderSnippetCode(
                                  "trailing",
                                  trailings[trailing][1],
                              )
                            : "",
                    ],
                ),
            ),
        )}
    controls={{
        /* eslint-disable perfectionist/sort-objects */
        leading: selectControl<Leading>(
            "Leading",
            constMapValues(leadings, ([l]) => l),
        ),
        label: textfieldControl("Label text"),
        supporting: textfieldControl("Supporting text"),
        trailing: selectControl<Trailing>(
            "Trailing",
            constMapValues(trailings, ([l]) => l),
        ),
        /* eslint-enable perfectionist/sort-objects */
    }}
    defaults={{
        label: "Headline",
        leading: "none" as Leading,
        supporting: "",
        trailing: "none" as Trailing,
    }}
>
    {#snippet children({ label, leading, supporting, trailing, ...props })}
        <RadioGroup>
            <List>
                {#each [1, 2, 3] as _ (_)}
                    <ListItem
                        containerClass="w-80"
                        leading={leadings[leading][2]}
                        trailing={trailings[trailing][2]}
                        {...props}
                    >
                        {#snippet labelText()}{label}{/snippet}
                        {#snippet supportingText()}{supporting}{/snippet}
                    </ListItem>
                {/each}
            </List>
        </RadioGroup>
    {/snippet}
</Playground>

<!-- TODO -->
