<script lang="ts" module>
    // TODO: Linear indeterminate
    import { mergeVariants, tv } from "$lib/style.js";
    import { browser } from "$app/environment";
    import arcPaintWorklet from "$lib/paints/arc.js?url";
    import arcWavePaintWorklet from "$lib/paints/arc-wave.js?url";
    import wavePaintWorklet from "$lib/paints/wave.js?url";

    if (browser) {
        (async () => {
            if (!CSS.paintWorklet) await import("css-paint-polyfill");
            CSS.paintWorklet.addModule(arcPaintWorklet);
            CSS.paintWorklet.addModule(arcWavePaintWorklet);
            CSS.paintWorklet.addModule(wavePaintWorklet);
        })();
    }

    export const variantsConfig = mergeVariants({
        defaultVariants: {
            circular: false,
            shape: "flat",
        },
        slots: {
            container: "relative animate-indeterminate",
            activeIndicator:
                "stroke-primary stroke-4 linecap-round linejoin-round",
            track: "stroke-secondary-container stroke-4 linecap-round linejoin-round",
            stopIndicator: "",
        },
        variants: {
            circular: {
                true: {
                    track: "absolute inset-0 paint-arc",
                    activeIndicator: "absolute inset-0 z-10",
                    stopIndicator: "hidden",
                },
                false: {
                    container:
                        "w-full flex items-center justify-center gap-1 group/progress",
                    track: "h-1 rounded-full bg-secondary-container grow-1",
                    activeIndicator:
                        "rounded-full w-[calc(var(--spacing)+var(--progress)*(100%-var(--spacing)))] shrink-0",
                    stopIndicator:
                        "size-1 rounded-full bg-primary absolute end-0 group-ui-indeterminate/progress:hidden",
                },
            },
            shape: {
                flat: {},
                wavy: {
                    activeIndicator: "animate-wave",
                },
            },
        },
        compoundVariants: [
            {
                circular: true,
                shape: "flat",
                class: {
                    container: "size-10",
                    track: "[--start-angle:calc(min(336deg*var(--progress)-54deg,258deg)+var(--offset)*360deg)] [--end-angle:calc(258deg+var(--offset)*360deg)]",
                    activeIndicator:
                        "paint-arc [--start-angle:calc(-78deg+var(--offset)*360deg)] [--end-angle:calc(336deg*var(--progress)-78deg+var(--offset)*360deg)]",
                },
            },
            {
                circular: true,
                shape: "wavy",
                class: {
                    container: "size-12",
                    track: "[--start-angle:calc(min(340deg*var(--progress)-60deg,260deg)+var(--offset)*360deg)] [--end-angle:calc(260deg+var(--offset)*360deg)]",
                    activeIndicator:
                        "paint-arc-wave wavelength-4 amplitude-0.5 [--start-angle:calc(-80deg+var(--offset)*360deg)] [--end-angle:calc(340deg*var(--progress)-80deg+var(--offset)*360deg)]",
                },
            },
            {
                circular: false,
                shape: "flat",
                class: {
                    activeIndicator: "h-1 bg-primary",
                },
            },
            {
                circular: false,
                shape: "wavy",
                class: {
                    activeIndicator:
                        "h-2.5 wavelength-10 paint-wave animate-wave",
                },
            },
        ],
    });

    export const variants = tv(variantsConfig);
</script>

<script lang="ts">
    import { type WrapperProps } from "$lib/types/style.js";
    import { Progress } from "bits-ui";

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

    const classes = variants({ circular, shape });

    let progress = $derived(value == null ? null : (value - min) / (max - min));
    let full = $derived(value == null || value >= max);

    let geometry = $state<null | SVGGeometryElement>(null);
    let length = $state(0);

    $effect(() => {
        if (geometry) length = geometry.getTotalLength();
    });
</script>

<Progress.Root
    class={classes.container({ class: containerClass })}
    {max}
    {min}
    {value}
    bind:ref
    style={{
        "--progress": progress,
        "--full": full ? 1 : 0,
    }}
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
