import { Icon } from "$lib/index.js";
import { createRawSnippet, mount, unmount } from "svelte";

export const label = createRawSnippet(() => ({
    render: () => "Edit",
    setup() {},
}));

export const iconAndLabel = createRawSnippet(() => ({
    render: () => "<span class='contents'>Edit</span>",
    setup(target) {
        const icon = mount(Icon, {
            anchor: target.firstChild ?? undefined,
            props: {
                icon: "edit",
            },
            target,
        });

        return () => unmount(icon);
    },
}));
