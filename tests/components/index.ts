import type { Component } from "svelte";

import { cartesian } from "$lib/array.js";
import { expect, test } from "vitest";
import { render } from "vitest-browser-svelte";

type SpecProps<P extends Record<string, unknown>> = {
    [K in keyof P]: P[K] | P[K][];
};

export const visualTest = <P extends Record<string, unknown>>(
    component: Component<P>,
    props: SpecProps<P>,
) => {
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

        const file = label.replaceAll("=", "_").replaceAll(",", "-");

        test(label, async () => {
            const { getByTestId } = render(component, {
                ...props,
                ...dynamicProps,
                "data-testid": "test",
            });

            await expect(getByTestId("test")).toMatchScreenshot(file);
        });
    }
};
