<script lang="ts">
    import { Radio, RadioGroup } from "$lib/index.js";

    import Device from "../Device.svelte";
    import Thumbnail from "../Thumbnail.svelte";
</script>

<Thumbnail>
    <Device containerClass="gap-8 py-48 -m-32 ml-32 w-full px-8">
        <h2 class="text-title-l">Language</h2>

        <RadioGroup class="contents" value="en">
            <div class="flex flex-row items-center gap-12 text-body-l">
                <Radio id="focus" value="en" />
                English
            </div>
            <div class="flex flex-row items-center gap-12 text-body-l">
                <Radio value="cn" />
                Chinese (Mandarin)
            </div>
        </RadioGroup>
    </Device>
</Thumbnail>
