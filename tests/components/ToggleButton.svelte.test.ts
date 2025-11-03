import { ToggleButton } from "$lib/index.js";

import { iconAndLabel } from "./children.js";
import { visualTest } from "./visual.js";

visualTest(ToggleButton, {
    children: iconAndLabel,
    pressed: [false, true],
    value: "",
    variant: ["text", "outlined", "tonal", "filled", "elevated"],
});
