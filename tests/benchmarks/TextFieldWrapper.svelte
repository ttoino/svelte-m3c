<script lang="ts">
    import type { Snippet } from "svelte";

    import { TextField } from "$lib/index.js";

    let {
        "data-testid": testid,
        ...props
    }: {
        "data-testid"?: string;
        disabled?: boolean;
        label?: Snippet;
        placeholder?: string;
        value?: string;
        variant?: "filled" | "outlined";
    } = $props();
</script>

<div data-testid={testid}>
    <TextField {...props} />
</div>
