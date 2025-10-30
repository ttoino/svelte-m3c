import { ToggleIconButton } from "$lib/index.js";

import { visualTest } from "./index.js";

visualTest(ToggleIconButton, {
    icon: "edit",
    pressed: [false, true],
    value: "",
    variant: ["text", "outlined", "tonal", "filled", "elevated"],
});
