import { Checkbox } from "$lib/index.js";

import { visualTest } from "./visual.js";

visualTest(Checkbox, {
    checked: [false, true],
    indeterminate: [false, true],
});
