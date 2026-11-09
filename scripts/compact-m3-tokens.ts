import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const RAW_DIR = join(ROOT, "tests", "fixtures", "m3-tokens", "raw");
const COMPACT_DIR = join(ROOT, "tests", "fixtures", "m3-tokens");
const DESIGN_SYSTEM_ID = "20543ce18892f7d9";

interface CompactFile {
    componentId: string;
    componentName: string;
    dsdbVersion: string;
    tokens: Record<string, ResolvedValue>;
}

interface CompactManifest {
    carbonVersion: string;
    components: { file: string; id: string; name: string }[];
    designSystemId: string;
    dsdbVersion: string;
    generatedAt: string;
}

interface DsdbSystem {
    components?: unknown[];
    dsdbVersion?: string;
    name?: string;
    revisionId?: string;
    tokens?: DsdbToken[];
    tokenSets?: {
        name: string;
        tokenSetName: string;
    }[];
    values?: DsdbValue[];
}

interface DsdbToken {
    name: string;
    tokenName: string;
    tokenValueType: string;
}

interface DsdbValue {
    color?: {
        alpha?: number;
        blue?: number;
        green?: number;
        red?: number;
    };
    fontSize?: {
        unit: string;
        value: number;
    };
    fontWeight?: number;
    length?: {
        unit: string;
        value: number;
    };
    lineHeight?: {
        unit: string;
        value: number;
    };
    name: string;
    opacity?: number;
    shape?: {
        defaultSize?: {
            unit: string;
            value: number;
        };
        family: string;
    };
    tokenName?: string;
    type?: {
        fontNameTokenName?: string;
        fontSizeTokenName?: string;
        fontWeightTokenName?: string;
        lineHeightTokenName?: string;
    };
}

interface ResolvedValue {
    fontSize?: number;
    fontWeight?: number;
    lineHeight?: number;
    ref?: string;
    type: string;
    unit?: string;
    value?: number | string;
}

const loadJson = async <T>(path: string): Promise<T> =>
    JSON.parse(await readFile(path, "utf8")) as T;

const buildTokenIndex = (
    systems: DsdbSystem[],
): Map<string, { system: DsdbSystem; token: DsdbToken }> => {
    const index = new Map<string, { system: DsdbSystem; token: DsdbToken }>();

    for (const system of systems) {
        for (const token of system.tokens ?? []) {
            index.set(token.tokenName, { system, token });
        }
    }

    return index;
};

const getValues = (token: DsdbToken, system: DsdbSystem): DsdbValue[] => {
    const prefix = `${token.name}/values`;

    return (system.values ?? []).filter((value) =>
        value.name.startsWith(prefix),
    );
};

const pickDefaultValue = (values: DsdbValue[]): DsdbValue | undefined => {
    // Prefer values without context tags (i.e. the default/non-contextual value).
    const untagged = values.filter(
        (value) =>
            !(value as unknown as { contextTags?: unknown[] }).contextTags,
    );

    if (untagged.length > 0) {
        return untagged[0];
    }

    // Fall back to the first value that is not explicitly undefined.
    return values.find(
        (value) => !(value as unknown as { undefined?: boolean }).undefined,
    );
};

const resolveValue = (
    tokenName: string,
    index: Map<string, { system: DsdbSystem; token: DsdbToken }>,
    visited = new Set<string>(),
): ResolvedValue | undefined => {
    if (visited.has(tokenName)) {
        return { type: "ERROR", value: `circular: ${tokenName}` };
    }

    visited.add(tokenName);

    const entry = index.get(tokenName);

    if (!entry) {
        return { type: "ERROR", value: `missing: ${tokenName}` };
    }

    const { system, token } = entry;
    const values = getValues(token, system);
    const value = pickDefaultValue(values);

    if (!value) {
        return { type: "ERROR", value: `no value: ${tokenName}` };
    }

    // Reference to another token.
    if (value.tokenName) {
        const resolved = resolveValue(value.tokenName, index, visited);

        if (
            resolved?.type === "COLOR" &&
            value.tokenName.startsWith("md.sys.color.")
        ) {
            // Component colors reference system colors. Keep the system color
            // token name so the benchmark can map it to a CSS custom property.
            return { ref: value.tokenName, type: "COLOR" };
        }

        return resolved;
    }

    // Concrete values.
    if (value.length) {
        return {
            type: token.tokenValueType,
            unit: value.length.unit,
            value: value.length.value,
        };
    }

    if (value.fontSize) {
        return {
            type: token.tokenValueType,
            unit: value.fontSize.unit,
            value: value.fontSize.value,
        };
    }

    if (value.fontWeight !== undefined) {
        return {
            type: token.tokenValueType,
            value: value.fontWeight,
        };
    }

    if (value.lineHeight) {
        return {
            type: token.tokenValueType,
            unit: value.lineHeight.unit,
            value: value.lineHeight.value,
        };
    }

    if (value.opacity !== undefined) {
        return {
            type: token.tokenValueType,
            value: value.opacity,
        };
    }

    if (value.shape) {
        if (value.shape.family === "SHAPE_FAMILY_CIRCULAR") {
            return { type: "SHAPE", value: "circular" };
        }

        return {
            type: "SHAPE",
            unit: value.shape.defaultSize?.unit,
            value: value.shape.defaultSize?.value ?? "rounded",
        };
    }

    if (value.type) {
        // Typography reference: resolve the constituent tokens.
        const result: ResolvedValue = { type: "TYPOGRAPHY" };
        const childVisited = new Set(visited);
        const fontSize = value.type.fontSizeTokenName
            ? resolveValue(value.type.fontSizeTokenName, index, childVisited)
            : undefined;
        const fontWeight = value.type.fontWeightTokenName
            ? resolveValue(value.type.fontWeightTokenName, index, childVisited)
            : undefined;
        const lineHeight = value.type.lineHeightTokenName
            ? resolveValue(value.type.lineHeightTokenName, index, childVisited)
            : undefined;

        if (fontSize?.value !== undefined) {
            result.fontSize = fontSize.value as number;
            result.unit = fontSize.unit;
        }

        if (fontWeight?.value !== undefined) {
            result.fontWeight = fontWeight.value as number;
        }

        if (lineHeight?.value !== undefined) {
            result.lineHeight = lineHeight.value as number;
        }

        return result;
    }

    if (value.color) {
        const { alpha = 1, blue = 0, green = 0, red = 0 } = value.color;

        return {
            type: "COLOR",
            value: `rgba(${Math.round(red * 255)}, ${Math.round(green * 255)}, ${Math.round(blue * 255)}, ${alpha})`,
        };
    }

    return { type: "ERROR", value: `unhandled: ${tokenName}` };
};

const compactComponent = (
    file: string,
    rawByFile: Map<string, { system: DsdbSystem }>,
    index: Map<string, { system: DsdbSystem; token: DsdbToken }>,
): CompactFile => {
    const data = rawByFile.get(file);

    if (!data) {
        throw new Error(`Missing raw data for ${file}`);
    }

    const dsdb = data.system;
    const componentId = file.replace("TOKEN_TABLE.", "").replace(".json", "");
    const component = dsdb.components?.[0] as
        { displayName?: string } | undefined;
    const tokens: Record<string, ResolvedValue> = {};

    for (const token of dsdb.tokens ?? []) {
        const resolved = resolveValue(token.tokenName, index);

        if (resolved) {
            tokens[token.tokenName] = resolved;
        }
    }

    return {
        componentId,
        componentName: component?.displayName ?? componentId,
        dsdbVersion: dsdb.dsdbVersion ?? "",
        tokens,
    };
};

const writeJson = async (path: string, data: unknown): Promise<void> => {
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, `${JSON.stringify(data, null, 2)}\n`);
};

const main = async (): Promise<void> => {
    const manifest = await loadJson<{
        carbonVersion: string;
        components: { id: string; name: string; slug: string }[];
        designSystemId: string;
        dsdbVersion: string;
    }>(join(RAW_DIR, "manifest.json"));

    const globalFiles = [
        `COLOR.${DESIGN_SYSTEM_ID}.json`,
        `MEASUREMENT.${DESIGN_SYSTEM_ID}.json`,
        `TYPOGRAPHY.${DESIGN_SYSTEM_ID}.json`,
        `ELEVATION.${DESIGN_SYSTEM_ID}.json`,
        `TOKEN_TYPE_UNSPECIFIED.${DESIGN_SYSTEM_ID}.json`,
    ];

    const rawByFile = new Map<string, { system: DsdbSystem }>();

    for (const file of globalFiles) {
        const data = await loadJson<{ system: DsdbSystem }>(
            join(RAW_DIR, file),
        );

        rawByFile.set(file, data);
    }

    const componentFiles = (await readdir(RAW_DIR)).filter(
        (file) => file.startsWith("TOKEN_TABLE.") && file.endsWith(".json"),
    );

    for (const file of componentFiles) {
        const data = await loadJson<{ system: DsdbSystem }>(
            join(RAW_DIR, file),
        );

        rawByFile.set(file, data);
    }

    const systems = [...rawByFile.values()].map((data) => data.system);
    const index = buildTokenIndex(systems);

    await mkdir(COMPACT_DIR, { recursive: true });

    const compactManifest: CompactManifest = {
        carbonVersion: manifest.carbonVersion,
        components: [],
        designSystemId: manifest.designSystemId,
        dsdbVersion: manifest.dsdbVersion,
        generatedAt: new Date().toISOString(),
    };

    for (const file of componentFiles) {
        const compact = compactComponent(file, rawByFile, index);
        const outFile = file
            .replace("TOKEN_TABLE.", "")
            .replace(".json", ".tokens.json");
        const outPath = join(COMPACT_DIR, outFile);

        await writeJson(outPath, compact);

        compactManifest.components.push({
            file: outFile,
            id: compact.componentId,
            name: compact.componentName,
        });
    }

    // Emit a global system tokens file for cross-component references.
    const globalTokens: Record<string, ResolvedValue> = {};

    for (const file of globalFiles) {
        const data = rawByFile.get(file);

        if (!data) continue;

        for (const token of data.system.tokens ?? []) {
            const resolved = resolveValue(token.tokenName, index);

            if (resolved) {
                globalTokens[token.tokenName] = resolved;
            }
        }
    }

    await writeJson(join(COMPACT_DIR, "system.tokens.json"), {
        designSystemId: manifest.designSystemId,
        dsdbVersion: manifest.dsdbVersion,
        tokens: globalTokens,
    });

    await writeJson(join(COMPACT_DIR, "manifest.json"), compactManifest);

    console.log(
        `Compacted ${componentFiles.length} component tables and ${globalFiles.length} global tables.`,
    );
};

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
