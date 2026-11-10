import { enhancedImages } from "@sveltejs/enhanced-img";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

const includeBenchmarks = process.env.RUN_BENCHMARKS === "1";

export default defineConfig({
    plugins: [enhancedImages(), tailwindcss(), sveltekit()],
    test: {
        projects: [
            {
                extends: "./vite.config.ts",
                resolve: { conditions: ["browser"] },
                test: {
                    exclude: [
                        "**/*.svelte.test.ts",
                        "**/node_modules/**",
                        ".opencode/**",
                        ".direnv/**",
                        ...(includeBenchmarks ? [] : ["tests/benchmarks/**"]),
                    ],
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
                        expect: {
                            toMatchScreenshot: {
                                comparatorName: "pixelmatch",
                                comparatorOptions: {
                                    allowedMismatchedPixelRatio: 0.05,
                                },
                                screenshotOptions: {
                                    animations: "disabled",
                                },
                            },
                        },
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
                    exclude: [
                        "**/node_modules/**",
                        ".opencode/**",
                        ".direnv/**",
                        ...(includeBenchmarks ? [] : ["tests/benchmarks/**"]),
                    ],
                    include: ["**/*.svelte.test.ts"],
                    name: "browser",
                },
            },
        ],
        setupFiles: "tests/setup.ts",
    },
});
