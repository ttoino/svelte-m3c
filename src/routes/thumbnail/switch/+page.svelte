<script lang="ts">
    import { Divider, Switch } from "$lib/index.js";

    import Device from "../Device.svelte";
    import Thumbnail from "../Thumbnail.svelte";
</script>

<Thumbnail class="flex-col gap-12 py-12">
    <Device containerClass="absolute -inset-10 right-28 justify-center"
    ></Device>

    <Divider class="absolute w-14" />
    <Divider class="absolute left-0 w-1/2" />

    <Switch />

    <Switch checked checkedIcon="check" />
</Thumbnail>
