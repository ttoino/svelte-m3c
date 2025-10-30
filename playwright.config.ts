import { defineConfig, devices } from "@playwright/experimental-ct-svelte";
import { svelte, vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
    forbidOnly: !!process.env.CI,
    fullyParallel: true,
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },

        {
            name: "firefox",
            use: { ...devices["Desktop Firefox"] },
        },

        {
            name: "webkit",
            use: { ...devices["Desktop Safari"] },
        },
    ],
    reporter: process.env.CI ? "github" : "html",
    retries: process.env.CI ? 2 : 0,
    testDir: "./tests",
    use: {
        ctViteConfig: {
            plugins: [
                tailwindcss(),
                svelte({ preprocess: [vitePreprocess()] }),
            ],
            resolve: {
                alias: {
                    $lib: path.resolve("src/lib"),
                },
            },
        },
        trace: "on-first-retry",
    },
    workers: process.env.CI ? 1 : undefined,
});
