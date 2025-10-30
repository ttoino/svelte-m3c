import { Button } from "$lib/index.js";

import { iconAndLabel } from "./children.svelte";
import { visualTest } from "./index.js";

visualTest(Button, {
    children: iconAndLabel,
    variant: ["text", "outlined", "tonal", "filled", "elevated"],
});
