import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const BASE_URL = "https://m3.material.io";
const DESIGN_SYSTEM_ID = "20543ce18892f7d9";
const FIXTURES_DIR = join(
    dirname(fileURLToPath(import.meta.url)),
    "..",
    "tests",
    "fixtures",
    "m3-tokens",
    "raw",
);

const GLOBAL_ENTITIES = [
    "COLOR",
    "MEASUREMENT",
    "TYPOGRAPHY",
    "ELEVATION",
    "TOKEN_TYPE_UNSPECIFIED",
];

interface Manifest {
    carbonVersion: string;
    components: { id: string; name: string; slug: string }[];
    dataModuleVersion: string;
    designSystemId: string;
    dsdbVersion: string;
    fetchedAt: string;
}

interface PageContent {
    sections?: {
        contentBlocks?: {
            contentChunks?: {
                contentChunkType?: string;
                libraryModuleType?: string;
                resourceName?: string;
            }[];
        }[];
    }[];
}

const fetchText = async (url: string): Promise<string> => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP ${response.status} for ${url}`);
    }

    return response.text();
};

const fetchJson = async <T>(url: string): Promise<T> => {
    const text = await fetchText(url);

    return JSON.parse(text) as T;
};

const discoverCarbonVersion = async (): Promise<string> => {
    const { bundle } = await fetchMainBundle();
    const versionMatch = bundle.match(/carbonVersion:"([^"]+)"/u);

    if (!versionMatch) {
        throw new Error("Could not extract carbonVersion from bundle");
    }

    return versionMatch[1];
};

const fetchMainBundle = async (): Promise<{ bundle: string; url: string }> => {
    const html = await fetchText(`${BASE_URL}/components/buttons/specs`);
    const scriptMatch = html.match(
        /<script[^>]*src="(\/static\/angular\/main\.[^"]+\.js)"[^>]*type="module"/u,
    );

    if (!scriptMatch) {
        throw new Error("Could not find Angular main.js bundle URL");
    }

    const url = `${BASE_URL}${scriptMatch[1]}`;
    const bundle = await fetchText(url);

    return { bundle, url };
};

const discoverPageIds = async (): Promise<string[]> => {
    const { bundle } = await fetchMainBundle();
    const ids: string[] = [];
    const idPattern = /exportedCarbonFileId[:\\"]+([a-f0-9-]+\.json)/gu;
    let match;

    while ((match = idPattern.exec(bundle)) !== null) {
        ids.push(match[1]);
    }

    return [...new Set(ids)];
};

const discoverComponents = async (
    carbonVersion: string,
    pageIds: string[],
): Promise<Map<string, { id: string; name: string; slug: string }>> => {
    const components = new Map<
        string,
        { id: string; name: string; slug: string }
    >();

    for (const pageId of pageIds) {
        const url = `${BASE_URL}/_dsm/content/m3/${carbonVersion}/${pageId}`;

        try {
            const content = await fetchJson<PageContent>(url);
            const title =
                content.sections?.[0]?.contentBlocks?.[0]?.contentChunks?.find(
                    (c) => c.contentChunkType === "TEXT",
                )?.resourceName ?? pageId;
            const slugMatch = url.match(/\/components\/([^/]+)/u);
            const slug = slugMatch?.[1] ?? pageId;

            for (const section of content.sections ?? []) {
                for (const block of section.contentBlocks ?? []) {
                    for (const chunk of block.contentChunks ?? []) {
                        if (
                            chunk.libraryModuleType === "TOKEN_TABLE" &&
                            chunk.resourceName
                        ) {
                            const componentId = chunk.resourceName
                                .split("components/")
                                .pop();

                            if (componentId) {
                                components.set(componentId, {
                                    id: componentId,
                                    name: title,
                                    slug,
                                });
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.warn(`Skipping page ${pageId}: ${error}`);
        }
    }

    return components;
};

const writeJson = async (path: string, data: unknown): Promise<void> => {
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, `${JSON.stringify(data, null, 2)}\n`);
};

const main = async (): Promise<void> => {
    console.log("Discovering current carbonVersion...");
    const carbonVersion = await discoverCarbonVersion();
    console.log(`  ${carbonVersion}`);

    console.log("Discovering page ids...");
    const pageIds = await discoverPageIds();
    console.log(`  ${pageIds.length} pages`);

    console.log("Discovering component token tables...");
    const components = await discoverComponents(carbonVersion, pageIds);
    console.log(`  ${components.size} components`);

    const manifest: Manifest = {
        carbonVersion,
        components: [...components.values()].sort((a, b) =>
            a.name.localeCompare(b.name),
        ),
        dataModuleVersion: "", // extracted alongside carbonVersion if needed
        designSystemId: DESIGN_SYSTEM_ID,
        dsdbVersion: "",
        fetchedAt: new Date().toISOString(),
    };

    const baseDataUrl = `${BASE_URL}/_dsm/data/dsdb-m3/${carbonVersion}`;

    console.log("Fetching global style tables...");
    for (const entity of GLOBAL_ENTITIES) {
        const url = `${baseDataUrl}/${entity}.${DESIGN_SYSTEM_ID}.json`;
        const file = join(FIXTURES_DIR, `${entity}.${DESIGN_SYSTEM_ID}.json`);

        console.log(`  ${entity}`);
        const data = await fetchJson<unknown>(url);
        await writeJson(file, data);

        if (entity === "TOKEN_TYPE_UNSPECIFIED") {
            const system = (
                data as {
                    system?: {
                        dataModuleVersion?: string;
                        dsdbVersion?: string;
                    };
                }
            ).system;

            if (system) {
                manifest.dsdbVersion = system.dsdbVersion ?? "";
                manifest.dataModuleVersion = system.dataModuleVersion ?? "";
            }
        }
    }

    console.log("Fetching component token tables...");
    for (const [componentId, component] of components) {
        const url = `${baseDataUrl}/TOKEN_TABLE.${componentId}.json`;
        const file = join(FIXTURES_DIR, `TOKEN_TABLE.${componentId}.json`);

        console.log(`  ${component.name} (${componentId})`);
        const data = await fetchJson<unknown>(url);
        await writeJson(file, data);
    }

    await writeJson(join(FIXTURES_DIR, "manifest.json"), manifest);

    console.log(
        `\nDone. Wrote ${components.size + GLOBAL_ENTITIES.length + 1} files to ${FIXTURES_DIR}`,
    );
};

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
