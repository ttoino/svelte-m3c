import { error } from "@sveltejs/kit";
import { chromium, devices } from "playwright";

import type { RequestHandler } from "./$types.js";

export const prerender = true;

export const GET: RequestHandler = async ({ fetch, params }) => {
    const { component } = params;

    const url = `http://localhost:5173/thumbnail/${component}`;

    const response = await fetch(url);
    if (!response.ok) throw error(404);

    const browser = await chromium.launch();
    const context = await browser.newContext(devices["Desktop Chrome HiDPI"]);
    const page = await context.newPage();
    await page.goto(url);
    await page.waitForTimeout(1000);

    const focus = page.locator("#focus");
    if ((await focus.count()) == 1) await focus.focus().catch(console.error);

    const thumbnail = page.locator("#thumbnail");
    const screenshot = await thumbnail.screenshot({ scale: "device" });

    browser.close();

    return new Response(screenshot.buffer as ArrayBuffer, {
        headers: {
            "Content-Type": "image/png",
        },
    });
};
