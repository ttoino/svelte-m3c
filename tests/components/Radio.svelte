<script lang="ts">
    import { Radio, RadioGroup } from "$lib/index.js";

    let {
        value,
    }: {
        value?: "a" | "b" | "c";
    } = $props();
</script>

<RadioGroup {value}>
    <Radio value="a" />
    <Radio value="b" />
    <Radio value="c" />
</RadioGroup>
