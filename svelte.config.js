import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    extensions: [".svelte", ".svx"],
    kit: {
        adapter: adapter(),
    },
    preprocess: [vitePreprocess(), mdsvex()],
};

export default config;
