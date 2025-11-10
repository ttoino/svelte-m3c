export const renderComponentCode = (
    component: string,
    props: Record<string, unknown>,
    children?: string,
) => {
    let p = Object.entries(props)
        .map(([k, v]) => {
            if (v === false || v === undefined) return;

            if (v === true) return k;

            const value = typeof v === "string" ? `"${v}"` : `{${v}}`;

            return `${k}=${value}`;
        })
        .filter((v) => !!v)
        .toSorted().join(`
                `);

    p = p
        ? `
                ${p}
            `
        : p;

    return children
        ? `
            <${component}${p}>
                ${children}
            </${component}>
        `
        : `
            <${component}${p}/>
        `;
};
