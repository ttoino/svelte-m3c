import { visualTest } from "./index.js";
import Radio from "./Radio.svelte";

visualTest(Radio, {
    value: [undefined, "a", "b", "c"],
});
