import type { Component } from "svelte";

import { expect, test } from "vitest";
import { render } from "vitest-browser-svelte";

export interface ComponentSpec<P extends Record<string, unknown>> {
    axes: Record<string, string[]>;
    buildProps: (caseValues: Record<string, string>) => Record<string, unknown>;
    component: Component<P>;
    defineAssertions: (caseValues: Record<string, string>) => StyleAssertion[];
    prepare?: (
        caseValues: Record<string, string>,
        rootElement: Element,
    ) => Promise<void> | void;
}

export interface SpecCase<P extends Record<string, unknown>> {
    assertions: StyleAssertion[];
    caseValues: Record<string, string>;
    name: string;
    props: P;
}

export interface StyleAssertion {
    expected: (() => string) | string;
    kind?: "rect" | "style" | "svg";
    name: string;
    property: string;
    selector?: string;
    tolerance?: number;
}

let colorCanvas: HTMLCanvasElement | null = null;

const getColorCanvas = (): HTMLCanvasElement => {
    if (!colorCanvas) {
        colorCanvas = document.createElement("canvas");
        colorCanvas.width = 1;
        colorCanvas.height = 1;
    }

    return colorCanvas;
};

const normalizeColor = (color: string): string => {
    const canvas = getColorCanvas();
    const context = canvas.getContext("2d", { willReadFrequently: true });

    if (!context) {
        throw new Error("Could not get 2D canvas context");
    }

    context.fillStyle = color;
    context.clearRect(0, 0, 1, 1);
    context.fillRect(0, 0, 1, 1);

    const [r, g, b, a] = context.getImageData(0, 0, 1, 1).data;

    return `rgba(${r}, ${g}, ${b}, ${(a / 255).toFixed(3)})`;
};

const isColorProperty = (property: string): boolean =>
    property.toLowerCase().endsWith("color") ||
    ["background", "border", "outline", "fill", "stroke"].some((prefix) =>
        property.toLowerCase().startsWith(prefix),
    );

const parseNumeric = (value: string): number => {
    const match = /-?\d+(?:\.\d+)?/u.exec(value);

    if (!match) {
        return Number.NaN;
    }

    return Number.parseFloat(match[0]);
};

const compareValues = (
    actual: string,
    expected: string,
    tolerance: number | undefined,
): { actual: string; expected: string; pass: boolean } => {
    if (tolerance === undefined || tolerance < 0) {
        return { actual, expected, pass: actual === expected };
    }

    const actualNum = parseNumeric(actual);
    const expectedNum = parseNumeric(expected);

    if (Number.isNaN(actualNum) || Number.isNaN(expectedNum)) {
        return { actual, expected, pass: actual === expected };
    }

    return {
        actual,
        expected,
        pass: Math.abs(actualNum - expectedNum) <= tolerance,
    };
};

const tokenCache = new Map<string, string>();

export const resolveToken = (token: string): string => {
    const cached = tokenCache.get(token);

    if (cached && cached !== "rgba(0, 0, 0, 0)") {
        return cached;
    }

    const probe = document.createElement("div");

    probe.style.cssText = `
        background-color: var(${token});
        color-scheme: light;
        height: 0;
        position: absolute;
        visibility: hidden;
        width: 0;
    `;
    document.body.appendChild(probe);

    const value = window.getComputedStyle(probe).backgroundColor;

    probe.remove();
    tokenCache.set(token, value);

    return value;
};

export const withOpacity = (rgb: string, opacity: number): string => {
    if (opacity === 1) {
        return rgb;
    }

    const normalized = normalizeColor(rgb);
    const match = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/u.exec(
        normalized,
    );

    if (!match) {
        throw new Error(`Cannot apply opacity to color: ${rgb}`);
    }

    const [, r, g, b] = match;

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const cartesianProduct = (
    axes: Record<string, string[]>,
): Record<string, string>[] => {
    const entries = Object.entries(axes);

    if (entries.length === 0) {
        return [{}];
    }

    const [firstKey, firstValues] = entries[0];
    const rest = Object.fromEntries(entries.slice(1));
    const restProducts = cartesianProduct(rest);

    return firstValues.flatMap((value) =>
        restProducts.map((product) => ({
            ...product,
            [firstKey]: value,
        })),
    );
};

export const defineComponentSpec = <P extends Record<string, unknown>>(
    spec: ComponentSpec<P>,
): SpecCase<P>[] => {
    const combinations = cartesianProduct(spec.axes);

    return combinations.map((caseValues) => ({
        assertions: spec.defineAssertions(caseValues),
        caseValues,
        name: Object.entries(caseValues)
            .map(([key, value]) => `${key}=${value}`)
            .join(","),
        props: spec.buildProps(caseValues) as unknown as P,
    }));
};

export const runSpecBenchmark = <P extends Record<string, unknown>>(
    spec: ComponentSpec<P>,
) => {
    const cases = defineComponentSpec(spec);

    for (const { assertions, caseValues, name, props } of cases) {
        test(name, async () => {
            const { getByTestId } = render(spec.component, {
                ...props,
                "data-testid": "spec-benchmark-target",
            } as unknown as P);

            const rootElement = getByTestId("spec-benchmark-target").element();

            await spec.prepare?.(caseValues, rootElement);

            for (const assertion of assertions) {
                const element = assertion.selector
                    ? rootElement.querySelector(assertion.selector)
                    : rootElement;

                if (!element) {
                    throw new Error(
                        `Assertion target not found: ${assertion.selector ?? "root"}`,
                    );
                }

                let rawActual: string;

                if (assertion.kind === "rect") {
                    rawActual = String(
                        element.getBoundingClientRect()[
                            assertion.property as keyof DOMRect
                        ],
                    );
                } else if (assertion.kind === "svg") {
                    rawActual = String(
                        element.getAttribute(assertion.property),
                    );
                } else {
                    rawActual = String(
                        window.getComputedStyle(element)[
                            assertion.property as keyof CSSStyleDeclaration
                        ],
                    );
                }

                const isColor = isColorProperty(assertion.property);
                const actual = isColor ? normalizeColor(rawActual) : rawActual;
                const rawExpected =
                    typeof assertion.expected === "function"
                        ? assertion.expected()
                        : assertion.expected;
                const expected = isColor
                    ? normalizeColor(rawExpected)
                    : rawExpected;
                const comparison = compareValues(
                    actual,
                    expected,
                    assertion.tolerance,
                );

                expect
                    .soft(
                        comparison.pass,
                        `${assertion.name}: expected ${expected}${assertion.tolerance !== undefined ? ` (±${assertion.tolerance})` : ""}, got ${actual}`,
                    )
                    .toBe(true);
            }
        });
    }
};
