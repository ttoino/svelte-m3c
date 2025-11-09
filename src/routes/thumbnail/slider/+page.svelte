<script lang="ts">
    import { Icon, IconButton, Slider } from "$lib/index.js";

    import Device from "../Device.svelte";
    import Thumbnail from "../Thumbnail.svelte";
</script>

<Thumbnail class="px-20">
    <Device
        containerClass="w-120 h-[calc(100%+--spacing(48))] -mt-24 -mb-24"
        statusbar
    >
        <!-- TODO: App bar -->
        <div
            class="bg-surface-container flex h-16 flex-row items-center gap-2 px-2"
        >
            <IconButton color="none" icon="arrow_back" variant="text" />
            <span class="text-title-l flex-1">Sound</span>
            <IconButton color="none" icon="more_vert" variant="text" />
        </div>

        <div class="flex flex-col gap-8 py-10">
            <div class="flex flex-row items-center gap-4 px-4">
                <Icon icon="call" />
                <div class="flex flex-1 flex-col gap-2">
                    <span class="text-title-l">Call volume</span>

                    <Slider value={50} />
                </div>
            </div>

            <div class="flex flex-row items-center gap-4 px-4">
                <Icon icon="alarm" />
                <div class="flex flex-1 flex-col gap-2">
                    <span class="text-title-l">Alarm volume</span>

                    <Slider value={20} />
                </div>
            </div>
            
            <div class="flex flex-row items-center gap-4 px-4">
                <Icon icon="music_note" />
                <div class="flex flex-1 flex-col gap-2">
                    <span class="text-title-l">Media volume</span>

                    <Slider value={70} />
                </div>
            </div>
        </div>
    </Device>
</Thumbnail>
