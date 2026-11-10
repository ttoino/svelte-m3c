import type { Component } from "svelte";

import {
    resolveToken,
    type StyleAssertion,
    withOpacity,
} from "../../benchmarks/specBenchmark.js";

export interface CompactTokenFile {
    componentId: string;
    componentName: string;
    dsdbVersion: string;
    tokens: Record<string, CompactTokenValue>;
}

export interface CompactTokenValue {
    fontSize?: number;
    fontWeight?: number;
    lineHeight?: number;
    ref?: string;
    type: string;
    unit?: string;
    value?: number | string;
}

const systemColorToCssVar = (tokenName: string): string => {
    const suffix = tokenName.replace("md.sys.color.", "");
    const cssName = suffix.replace(/\./gu, "-");

    return `--color-${cssName}`;
};

const toPixelValue = (value: CompactTokenValue): string => {
    const numeric =
        typeof value.value === "number"
            ? value.value
            : Number.parseFloat(value.value as string);

    if (Number.isNaN(numeric)) {
        throw new Error(`Cannot convert token value to pixels: ${value.value}`);
    }

    return `${numeric}px`;
};

export const resolveColor = (token: CompactTokenValue): string => {
    if (token.type !== "COLOR") {
        throw new Error(`Expected color token, got ${token.type}`);
    }

    const ref = token.ref ?? token.value;

    if (typeof ref !== "string") {
        throw new Error("Color token has no reference");
    }

    // Some resolved global tokens are concrete RGBA strings; return as-is.
    if (ref.startsWith("rgba(")) {
        return ref;
    }

    const cssVar = ref.startsWith("md.sys.color.")
        ? systemColorToCssVar(ref)
        : ref;
    const resolved = resolveToken(cssVar);

    if (resolved === "rgba(0, 0, 0, 0)") {
        throw new Error(`resolveColor(${ref}) returned transparent`);
    }

    return resolved;
};

export const colorAssertion = (
    token: CompactTokenValue,
    property: string,
    name: string,
): StyleAssertion => ({
    expected: () => resolveColor(token),
    name,
    property,
});

export const lengthAssertion = (
    token: CompactTokenValue,
    property: string,
    name: string,
    tolerance = 0,
): StyleAssertion => ({
    expected: toPixelValue(token),
    name,
    property,
    tolerance,
});

export const opacityAssertion = (
    token: CompactTokenValue,
    baseColorToken: CompactTokenValue,
    property: string,
    name: string,
): StyleAssertion => {
    if (token.type !== "OPACITY" || typeof token.value !== "number") {
        throw new Error(`Expected opacity token, got ${token.type}`);
    }

    const opacity = token.value;

    return {
        expected: () => withOpacity(resolveColor(baseColorToken), opacity),
        name,
        property,
    };
};

export const typographyAssertions = (
    token: CompactTokenValue,
): StyleAssertion[] => {
    if (token.type !== "TYPOGRAPHY") {
        throw new Error(`Expected typography token, got ${token.type}`);
    }

    const assertions: StyleAssertion[] = [];

    if (token.fontSize !== undefined) {
        assertions.push({
            expected: `${token.fontSize}px`,
            name: "font-size",
            property: "fontSize",
            tolerance: 0,
        });
    }

    if (token.fontWeight !== undefined) {
        assertions.push({
            expected: String(token.fontWeight),
            name: "font-weight",
            property: "fontWeight",
        });
    }

    if (token.lineHeight !== undefined) {
        assertions.push({
            expected: `${token.lineHeight}px`,
            name: "line-height",
            property: "lineHeight",
            tolerance: 0,
        });
    }

    return assertions;
};

export const shapeAssertion = (
    token: CompactTokenValue,
    property: string,
    name: string,
): StyleAssertion => {
    if (token.type !== "SHAPE") {
        throw new Error(`Expected shape token, got ${token.type}`);
    }

    const expected =
        token.value === "circular" ? "9999px" : toPixelValue(token);

    return {
        expected,
        name,
        property,
        tolerance: 0,
    };
};

export const transparentAssertion = (
    property: string,
    name: string,
): StyleAssertion => ({
    expected: "rgba(0, 0, 0, 0)",
    name,
    property,
});

export const loadComponentTokens = async (
    componentId: string,
): Promise<CompactTokenFile> => {
    const module = (await import(`./${componentId}.tokens.json`, {
        with: { type: "json" },
    })) as { default: CompactTokenFile };

    return module.default;
};

export const getToken = (
    tokens: Record<string, CompactTokenValue>,
    name: string,
): CompactTokenValue => {
    const token = tokens[name];

    if (!token) {
        throw new Error(`Missing token: ${name}`);
    }

    return token;
};

export const tryGetToken = (
    tokens: Record<string, CompactTokenValue>,
    name: string,
): CompactTokenValue | undefined => tokens[name];

export const runBenchmarkFromTokens = <P extends Record<string, unknown>>(
    component: Component<P>,
    tokens: CompactTokenFile,
): void => {
    throw new Error(
        `Not implemented for ${component.name} ${tokens.componentId}`,
    );
};
