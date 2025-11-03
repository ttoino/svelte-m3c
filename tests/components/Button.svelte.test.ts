import { Button } from "$lib/index.js";

import { iconAndLabel } from "./children.js";
import { visualTest } from "./visual.js";

visualTest(Button, {
    children: iconAndLabel,
    variant: ["text", "outlined", "tonal", "filled", "elevated"],
});
