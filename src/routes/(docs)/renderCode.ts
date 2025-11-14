import baseDedent from "dedent";

const dedent = baseDedent.withOptions({
    alignValues: true,
});

export const renderComponentCode = (
    component: string,
    props: Record<string, unknown> = {},
    children?: (string | undefined)[] | string,
) => {
    const p = Object.entries(props)
        .map(([k, v]) => {
            if (v === false || v === undefined) return;

            if (v === true) return k;

            const value = typeof v === "string" ? `"${v}"` : `{${v}}`;

            return `${k}=${value}`;
        })
        .filter((v) => !!v)
        .toSorted()
        .join("\n");

    if (Array.isArray(children))
        children = children.filter((s) => !!s).join("\n");

    const startTag = p
        ? dedent`
            <${component}
                ${p}
            >
        `
        : `<${component}>`;

    return children
        ? dedent`
            ${startTag}
                ${children}
            </${component}>
        `
        : startTag.replace(">", p ? "/>" : " />");
};

export const renderSnippetCode = (
    snippet: string,
    children?: (string | undefined)[] | string,
    args?: string,
) => {
    const startTag = `{#snippet ${snippet}(${args ?? ""})}`;
    const endTag = "{/snippet}";

    if (Array.isArray(children))
        children = children.filter((s) => !!s).join("\n");

    return children
        ? dedent`
            ${startTag}
                ${children}
            ${endTag}
        `
        : startTag + endTag;
};
