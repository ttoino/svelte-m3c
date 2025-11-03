import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

export default defineConfig({
    plugins: [tailwindcss(), sveltekit()],
    test: {
        projects: [
            {
                extends: "./vite.config.ts",
                resolve: { conditions: ["browser"] },
                test: {
                    exclude: ["**/*.svelte.test.ts"],
                    include: ["**/*.test.ts"],
                    name: "unit",
                    sequence: {
                        concurrent: true,
                    },
                },
            },
            {
                extends: "./vite.config.ts",
                resolve: { conditions: ["browser"] },
                test: {
                    browser: {
                        enabled: true,
                        instances: [
                            { browser: "chromium" },
                            { browser: "firefox" },
                            { browser: "webkit" },
                        ],
                        provider: playwright(),
                        viewport: {
                            height: 512,
                            width: 512,
                        },
                    },
                    css: true,
                    include: ["**/*.svelte.test.ts"],
                    name: "browser",
                },
            },
        ],
        setupFiles: "tests/setup.ts",
    },
});
