import { mkdir, readdir, writeFile } from "node:fs/promises";
import { chromium, devices } from "playwright";
import { createServer } from "vite";

const THUMBNAIL_DIR = "src/routes/thumbnail";
const PORT = 5173;
const URL = `http://localhost:${PORT}`;

const ids = (await readdir(THUMBNAIL_DIR, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("["))
    .map((entry) => entry.name);

const server = await createServer({
    configFile: "./vite.config.ts",
    server: {
        host: true,
        port: PORT,
        strictPort: true,
    },
});

try {
    await server.listen();

    const browser = await chromium.launch();
    const context = await browser.newContext(devices["Desktop Chrome HiDPI"]);
    const page = await context.newPage();

    for (const id of ids) {
        const url = `${URL}/thumbnail/${id}/`;
        const response = await fetch(url);
        if (!response.ok) continue;

        await page.goto(url);

        const focus = page.locator("#focus");
        if ((await focus.count()) === 1)
            await focus.focus().catch(console.error);

        await page.waitForTimeout(1000);

        const thumbnail = page.locator("#thumbnail");
        const screenshot = await thumbnail.screenshot({ scale: "device" });

        await mkdir(`${THUMBNAIL_DIR}/${id}`, { recursive: true });
        await writeFile(`${THUMBNAIL_DIR}/${id}/thumbnail.png`, screenshot);
    }

    await browser.close();
} finally {
    await server.close();
}
