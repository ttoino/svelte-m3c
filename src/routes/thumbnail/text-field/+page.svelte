<script lang="ts">
    import { Icon, TextField } from "$lib/index.js";

    import Device from "../Device.svelte";
    import Thumbnail from "../Thumbnail.svelte";
</script>

<Thumbnail class="px-20">
    <Device
        containerClass="-mt-24 -mb-24 h-[calc(100%+--spacing(48))] w-120 justify-center gap-8 px-8"
    >
        <TextField id="focus" value="Sam" variant="outlined">
            {#snippet label()}Username{/snippet}
            {#snippet trailing()}<Icon icon="cancel" />{/snippet}
        </TextField>
        <TextField type="password" variant="outlined">
            {#snippet label()}Password{/snippet}
        </TextField>
    </Device>
</Thumbnail>
