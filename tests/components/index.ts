import type { Component } from "svelte";

import { expect, test } from "@playwright/experimental-ct-svelte";

type SpecProps<P extends Record<string, unknown>> = {
    [K in keyof P]: P[K] | P[K][];
};

// Thank you https://stackoverflow.com/a/43053803/9937109
const cartesian = <T extends unknown[][]>(
    ...a: [...T]
): { [K in keyof T]: T[K][number] }[] =>
    (a.length == 1
        ? a[0].map((b) => [b])
        : a.reduce((a, b) =>
              a.flatMap((d) => b.map((e) => [d, e].flat())),
          )) as {
        [K in keyof T]: T[K][number];
    }[];

export const visualTest = <P extends Record<string, unknown>>(
    component: Component<P>,
    props: SpecProps<P>,
) =>
    test.describe("visual", () => {
        const propKeys = Object.entries(props)
            .filter(([, v]) => Array.isArray(v))
            .map(([k]) => k) as (keyof typeof props)[];

        const specs = cartesian(...propKeys.map((k) => props[k] as unknown[]));

        for (const spec of specs) {
            const dynamicProps = Object.fromEntries(
                propKeys.map((k, i) => [k, spec[i]]),
            ) as P;

            const label = Object.entries(dynamicProps)
                .map(([k, v]) => `${k}=${v}`)
                .join(",");

            test(label, async ({ mount, page }) => {
                const mountedComponent = await mount(component, {
                    props: {
                        ...props,
                        ...dynamicProps,
                    },
                });

                await page.mouse.move(-100, -100);
                await expect(mountedComponent).toHaveScreenshot(`${label}.png`);
            });
        }
    });
