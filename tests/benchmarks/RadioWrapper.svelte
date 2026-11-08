<script lang="ts">
    import { Radio, RadioGroup } from "$lib/index.js";

    let {
        "data-testid": testid,
        checked,
        disabled,
        value,
    }: {
        checked?: boolean;
        "data-testid"?: string;
        disabled?: boolean;
        value: string;
    } = $props();
</script>

<RadioGroup value={checked ? value : undefined}>
    <Radio {disabled} {value} data-testid={testid} />
</RadioGroup>
