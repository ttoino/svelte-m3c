import { error } from "@sveltejs/kit";
import { type Component } from "svelte";

import type { EntryGenerator, PageLoad } from "./$types.js";

const glob = import.meta.glob<{
    default: Component;
    metadata?: {
        title?: string;
    } & Record<string, unknown>;
}>("/src/routes/**/*.svx");

console.log("glob", glob);

export const entries: EntryGenerator = () =>
    Object.keys(glob).map((path) => ({
        path: path.replace(/^\/src\/routes\//, "").replace(/\.svx$/, ""),
    }));

export const load: PageLoad = async ({ params }) => {
    const { path } = params;

    try {
        const i = await glob[`/src/routes/${path}.svx`]();

        return {
            component: i.default,
            title: i.metadata?.title,
        };
    } catch (e) {
        console.error(e);
        error(404, `Could not find ${path}.svx`);
    }
};
