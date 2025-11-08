<script lang="ts" module>
    import { createHighlighter } from "shiki";

    const highlighter = await createHighlighter({
        langs: ["css", "svelte", "sh"],
        themes: ["material-theme", "material-theme-lighter"],
    });
</script>

<script lang="ts">
    import type { BundledLanguage } from "shiki";

    import dedent from "dedent";

    let {
        code,
        lang = "svelte",
    }: {
        code: string;
        lang?: BundledLanguage;
    } = $props();

    let html = $derived(
        highlighter.codeToHtml(dedent(code), {
            colorReplacements: {
                "material-theme": {
                    "#263238": "invalid color",
                },
            },
            defaultColor: "light-dark()",
            lang,
            themes: {
                dark: "material-theme",
                light: "material-theme-lighter",
            },
        }),
    );
</script>

<!-- eslint-disable-next-line svelte/no-at-html-tags -->
{@html html}
