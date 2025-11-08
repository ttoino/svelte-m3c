<script lang="ts">
    import type { Snippet } from "svelte";
    import type { ClassNameValue } from "tailwind-merge";

    import { Tab, TabContent, Tabs } from "$lib/index.js";

    import Code from "./Code.svelte";

    let {
        children,
        class: className,
        code,
    }: {
        children: Snippet;
        class?: ClassNameValue;
        code: string;
    } = $props();
</script>

<Tabs
    containerClass={[
        "border border-outline-variant rounded-lg overflow-hidden my-4 not-prose",
        className,
    ]}
    value="preview"
>
    {#snippet tabs()}
        <Tab value="preview">Preview</Tab>
        <Tab value="code">Code</Tab>
    {/snippet}
    {#snippet content()}
        <TabContent
            class="flex min-h-full flex-row flex-wrap items-center justify-center gap-4 py-8"
            value="preview"
        >
            {@render children?.()}
        </TabContent>
        <TabContent
            class="overflow-x-auto px-4 py-3 *:inline-block"
            value="code"
        >
            <Code {code} />
        </TabContent>
    {/snippet}
</Tabs>
