<script lang="ts">
    import { Checkbox } from "$lib/index.js";

    import Device from "../Device.svelte";
    import Thumbnail from "../Thumbnail.svelte";
</script>

<Thumbnail>
    <Device containerClass="gap-8 py-48 -m-32 ml-32 w-full px-8">
        <h2 class="text-title-l">Appearance</h2>

        <div class="flex flex-row items-center gap-12 text-body-l">
            <Checkbox />
            Dark mode
        </div>
        <div class="flex flex-row items-center gap-12 text-body-l">
            <Checkbox checked />
            Large text mode
        </div>
    </Device>
</Thumbnail>
