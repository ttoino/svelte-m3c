<script lang="ts" module>
    // TODO: Linear indeterminate
    import { mergeVariants, tv } from "$lib/style.js";

    export const variantsConfig = mergeVariants({
        compoundVariants: [
            {
                circular: true,
                class: {
                    activeIndicator:
                        "paint-arc [--start-angle:calc(-78deg+var(--offset)*360deg)] [--end-angle:calc(336deg*var(--progress)-78deg+var(--offset)*360deg)]",
                    container: "size-10",
                    track: "[--start-angle:calc(min(336deg*var(--progress)-54deg,258deg)+var(--offset)*360deg)] [--end-angle:calc(258deg+var(--offset)*360deg)]",
                },
                shape: "flat",
            },
            {
                circular: true,
                class: {
                    activeIndicator:
                        "paint-arc-wave wavelength-4 amplitude-0.5 [--start-angle:calc(-80deg+var(--offset)*360deg)] [--end-angle:calc(340deg*var(--progress)-80deg+var(--offset)*360deg)]",
                    container: "size-12",
                    track: "[--start-angle:calc(min(340deg*var(--progress)-60deg,260deg)+var(--offset)*360deg)] [--end-angle:calc(260deg+var(--offset)*360deg)]",
                },
                shape: "wavy",
            },
            {
                circular: false,
                class: {
                    activeIndicator: "h-1 bg-primary",
                },
                shape: "flat",
            },
            {
                circular: false,
                class: {
                    activeIndicator:
                        "h-2.5 wavelength-10 paint-wave animate-wave",
                },
                shape: "wavy",
            },
        ],
        defaultVariants: {
            circular: false,
            shape: "flat",
        },
        slots: {
            activeIndicator:
                "stroke-primary stroke-4 linecap-round linejoin-round",
            container: "relative animate-indeterminate",
            stopIndicator: "",
            track: "stroke-secondary-container stroke-4 linecap-round linejoin-round",
        },
        variants: {
            circular: {
                false: {
                    activeIndicator:
                        "rounded-full w-[calc(var(--spacing)+var(--progress)*(100%-var(--spacing)))] shrink-0",
                    container:
                        "w-full flex items-center justify-center gap-1 group/progress",
                    stopIndicator:
                        "size-1 rounded-full bg-primary absolute end-0 group-ui-indeterminate/progress:hidden",
                    track: "h-1 rounded-full bg-secondary-container grow-1",
                },
                true: {
                    activeIndicator: "absolute inset-0 z-10",
                    stopIndicator: "hidden",
                    track: "absolute inset-0 paint-arc",
                },
            },
            shape: {
                flat: {},
                wavy: {
                    activeIndicator: "animate-wave",
                },
            },
        },
    });

    export const variants = tv(variantsConfig);
</script>

<script lang="ts">
    import arcWavePaintWorklet from "$lib/paints/arc-wave.js?url";
    import arcPaintWorklet from "$lib/paints/arc.js?url";
    import wavePaintWorklet from "$lib/paints/wave.js?url";
    import { type WrapperProps } from "$lib/types/style.js";
    import { Progress } from "bits-ui";
    import { onMount } from "svelte";

    onMount(async () => {
        if (!CSS.paintWorklet) await import("css-paint-polyfill");
        CSS.paintWorklet.addModule(arcPaintWorklet);
        CSS.paintWorklet.addModule(arcWavePaintWorklet);
        CSS.paintWorklet.addModule(wavePaintWorklet);
    });

    let {
        activeIndicatorClass,
        circular,
        containerClass,
        max = 100,
        min = 0,
        ref = $bindable(null),
        shape,
        stopIndicatorClass,
        trackClass,
        value = 0,
        ...props
    }: WrapperProps<Progress.RootProps, typeof variants> = $props();

    let classes = $derived(variants({ circular, shape }));

    let progress = $derived(value == null ? null : (value - min) / (max - min));
    let full = $derived(value == null || value >= max);
</script>

<Progress.Root
    style={{
        "--full": full ? 1 : 0,
        "--progress": progress,
    }}
    class={classes.container({ class: containerClass })}
    {max}
    {min}
    {value}
    bind:ref
    {...props}
>
    <div class={classes.activeIndicator({ class: activeIndicatorClass })}></div>
    <div class={classes.track({ class: trackClass })}></div>
    <div class={classes.stopIndicator({ class: stopIndicatorClass })}></div>
</Progress.Root>

<style scoped>
    :global([data-indeterminate].animate-indeterminate) {
        animation: indeterminate 3s linear infinite both;
    }

    @property --progress {
        syntax: "<number>";
        inherits: true;
        initial-value: 0;
    }

    @property --offset {
        syntax: "<number>";
        inherits: true;
        initial-value: 0;
    }

    @keyframes indeterminate {
        0% {
            --progress: 0.1;
            --offset: 0;
        }

        50% {
            --progress: 0.9;
            --offset: 1;
        }

        100% {
            --progress: 0.1;
            --offset: 3;
        }
    }
</style>
