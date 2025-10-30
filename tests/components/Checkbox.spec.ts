import { Checkbox } from "$lib/index.js";

import { visualTest } from "./index.js";

visualTest(Checkbox, {
    checked: [false, true],
    indeterminate: [false, true],
});
