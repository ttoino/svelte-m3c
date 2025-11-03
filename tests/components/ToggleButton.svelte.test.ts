import { ToggleButton } from "$lib/index.js";

import { iconAndLabel } from "./children.svelte";
import { visualTest } from "./index.js";

visualTest(ToggleButton, {
    children: iconAndLabel,
    pressed: [false, true],
    value: "",
    variant: ["text", "outlined", "tonal", "filled", "elevated"],
});
