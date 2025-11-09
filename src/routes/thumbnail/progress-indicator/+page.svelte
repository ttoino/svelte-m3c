<script lang="ts">
    import { Progress } from "$lib/index.js";

    import Thumbnail from "../Thumbnail.svelte";
</script>

<Thumbnail class="flex-col gap-3 px-12">
    <div class="ml-0 mr-20 flex flex-row items-center justify-center gap-12">
        <Progress containerClass="w-50" value={30} />
        <Progress circular value={30} />
    </div>
    <div class="ml-20 mr-0 flex flex-row items-center justify-center gap-12">
        <Progress containerClass="w-50" shape="wavy" value={30} />
        <Progress circular shape="wavy" value={30} />
    </div>
    <!-- TODO: Wider variant -->
    <!-- <div class="ml-40 mr-20 flex flex-row items-center justify-center gap-12">
        <Progress containerClass="w-80" value={30} />
        <Progress circular value={30} />
    </div>
    <div class="ml-60 mr-0 flex flex-row items-center justify-center gap-12">
        <Progress containerClass="w-80" shape="wavy" value={30} />
        <Progress circular shape="wavy" value={30} />
    </div> -->
</Thumbnail>
