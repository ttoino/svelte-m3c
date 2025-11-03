<script lang="ts">
    import { Radio, RadioGroup } from "$lib/index.js";

    let {
        value,
        ...props
    }: {
        value?: "a" | "b" | "c";
    } = $props();
</script>

<RadioGroup {value} {...props}>
    <Radio value="a" />
    <Radio value="b" />
    <Radio value="c" />
</RadioGroup>
