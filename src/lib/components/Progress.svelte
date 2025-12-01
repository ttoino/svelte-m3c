<script lang="ts" module>
    import { browser } from "$app/environment";
    // TODO: Linear indeterminate
    import { mergeVariants, tv } from "$lib/style.js";

    export const variantsConfig = mergeVariants({
        compoundVariants: [
            {
                circular: true,
                class: {
                    activeIndicator:
                        "paint-arc [--end-angle:calc(336deg*var(--progress)-78deg+var(--offset)*360deg)] [--start-angle:calc(-78deg+var(--offset)*360deg)]",
                    container: "size-10",
                    track: "[--end-angle:calc(258deg+var(--offset)*360deg)] [--start-angle:calc(min(336deg*var(--progress)-54deg,258deg)+var(--offset)*360deg)]",
                },
                shape: "flat",
            },
            {
                circular: true,
                class: {
                    activeIndicator:
                        "paint-arc-wave [--end-angle:calc(340deg*var(--progress)-80deg+var(--offset)*360deg)] [--start-angle:calc(-80deg+var(--offset)*360deg)] amplitude-0.5 wavelength-4",
                    container: "size-12",
                    track: "[--end-angle:calc(260deg+var(--offset)*360deg)] [--start-angle:calc(min(340deg*var(--progress)-60deg,260deg)+var(--offset)*360deg)]",
                },
                shape: "wavy",
            },
            {
                circular: false,
                class: {
                    activeIndicator: "h-1 rounded-full bg-primary",
                },
                shape: "flat",
            },
            {
                circular: false,
                class: {
                    activeIndicator:
                        "h-2.5 animate-wave paint-wave wavelength-10",
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
            container: "animate-indeterminate relative",
            stopIndicator: "",
            track: "stroke-secondary-container stroke-4 linecap-round linejoin-round",
        },
        variants: {
            circular: {
                false: {
                    activeIndicator:
                        "w-[calc(var(--spacing)+var(--progress)*(100%-var(--spacing)))] shrink-0",
                    container:
                        "group/progress flex w-full items-center justify-center gap-1",
                    stopIndicator:
                        "absolute end-0 size-1 rounded-full bg-primary group-ui-indeterminate/progress:hidden",
                    track: "h-1 grow-1 rounded-full bg-secondary-container",
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
                    activeIndicator: "motion-safe:animate-wave",
                },
            },
        },
    });

    export const variants = tv(variantsConfig);

    if (browser) {
        // eslint-disable-next-line svelte/@typescript-eslint/no-unnecessary-condition
        if (!CSS.paintWorklet) await import("css-paint-polyfill");

        if (import.meta.env.DEV) {
            CSS.paintWorklet.addModule(
                (await import("$lib/paints/arc-wave.js?url")).default,
            );
            CSS.paintWorklet.addModule(
                (await import("$lib/paints/arc.js?url")).default,
            );
            CSS.paintWorklet.addModule(
                (await import("$lib/paints/wave.js?url")).default,
            );
        } else {
            CSS.paintWorklet.addModule(
                (await import("$lib/paints/arc-wave.js?worker&url")).default,
            );
            CSS.paintWorklet.addModule(
                (await import("$lib/paints/arc.js?worker&url")).default,
            );
            CSS.paintWorklet.addModule(
                (await import("$lib/paints/wave.js?worker&url")).default,
            );
        }
    }
</script>

<script lang="ts">
    import type { WrapperProps } from "$lib/types/style.js";

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
