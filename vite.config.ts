import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

export default defineConfig({
    plugins: [tailwindcss(), sveltekit()],
    resolve: process.env.VITEST
        ? {
              conditions: ["browser"],
          }
        : undefined,
    test: {
        projects: [
            {
                extends: "./vite.config.ts",
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
                test: {
                    browser: {
                        enabled: true,
                        headless: true,
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
