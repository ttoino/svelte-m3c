<script lang="ts" module>
    import { tv } from "$lib/style.js";

    export const variants = tv({
        compoundSlots: [
            {
                circular: false,
                class: "before:absolute before:bottom-0 before:top-0 before:rounded-full after:absolute after:bottom-0 after:top-0 after:rounded-full",
                slots: ["activeIndicator", "track"],
            },
            {
                circular: true,
                class: "stroke-(length:--spacing) origin-center fill-none transition-[stroke-dasharray,stroke-dashoffset] [cx:50%] [cy:50%] [r:calc((100%-var(--spacing))*0.5)] [stroke-linecap:round] [stroke-linejoin:round]",
                slots: ["activeIndicator", "track"],
            },
        ],
        defaultVariants: {
            circular: false,
        },
        slots: {
            activeIndicator: "",
            container: "group/progress relative inline-flex",
            stopIndicator:
                "bg-primary group-ui-indeterminate/progress:hidden absolute bottom-0 right-0 top-0 size-1 rounded-full",
            track: "",
        },
        variants: {
            circular: {
                false: {
                    activeIndicator:
                        "before:bg-primary after:bg-primary before:left-[calc(100%*mod(var(--offset),1))] before:right-[calc((100%-var(--spacing))*(1-min(mod(var(--offset),1)+var(--progress),1)))] after:left-0 after:right-[calc(100%*(1-max(mod(var(--offset),1)+var(--progress)-1,0)))]",
                    root: "animate-linear-indeterminate h-1 w-full",
                    track: "before:bg-secondary-container after:bg-secondary-container before:left-[calc((100%-var(--spacing))*min(mod(var(--offset),1)+var(--progress),1)+var(--spacing)*2)] before:right-0 after:left-[max(100%*(mod(var(--offset),1)+var(--progress)-1)+var(--spacing),0%)] after:right-[calc(100%*(1-mod(var(--offset),1))+var(--spacing))]",
                },
                true: {
                    activeIndicator:
                        "stroke-primary animate-circular-indeterminate -rotate-90 [stroke-dasharray:calc(var(--progress)*(var(--length)-var(--spacing)*2*(1-var(--full))))_var(--length)] [stroke-dashoffset:calc(var(--spacing)*(var(--full)-1))]",
                    root: "size-10",
                    track: "stroke-secondary-container group-ui-indeterminate/progress:hidden rotate-90 -scale-x-100 [stroke-dasharray:calc(var(--length)-var(--progress)*(var(--length)-var(--spacing)*2)-var(--spacing)*4)_var(--length)] [stroke-dashoffset:--spacing(-1)]",
                },
            },
        },
    });
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
        stopIndicatorClass,
        trackClass,
        value = 0,
        ...props
    }: WrapperProps<Progress.RootProps, typeof variants> = $props();

    const classes = variants({ circular });

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
    {...props}
>
    {#snippet child({ props })}
        <div bind:this={ref} {...props}>
            {#if circular}
                <svg class="size-full">
                    <circle
                        style={`
                            --length: ${length}px;
                            --progress: ${progress};
                        `}
                        class={classes.track({ class: trackClass })}
                    />
                    <circle
                        bind:this={geometry}
                        style={`
                            --length: ${length}px;
                            --progress: ${progress};
                            --full: ${full ? 1 : 0};
                        `}
                        class={classes.activeIndicator({
                            class: activeIndicatorClass,
                        })}
                    />
                </svg>
            {:else}
                <div
                    style={progress === null ? "" : `--progress: ${progress}`}
                    class={classes.track({ class: trackClass })}
                ></div>
                <div
                    style={progress === null ? "" : `--progress: ${progress}`}
                    class={classes.activeIndicator({
                        class: activeIndicatorClass,
                    })}
                ></div>
                <div
                    class={classes.stopIndicator({
                        class: stopIndicatorClass,
                    })}
                ></div>
            {/if}
        </div>
    {/snippet}
</Progress.Root>

<style scoped>
    [data-indeterminate] {
        .animate-circular-indeterminate {
            animation: circular-indeterminate 2.5s linear infinite both;
        }

        &.animate-linear-indeterminate {
            animation: linear-indeterminate 2.5s linear infinite both;
        }
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

    @keyframes circular-indeterminate {
        0% {
            rotate: 0deg;
            stroke-dasharray: calc(var(--length) * 0.1), var(--length);
        }

        50% {
            rotate: 360deg;
            stroke-dasharray: calc(var(--length) * 0.9), var(--length);
        }

        100% {
            rotate: 1080deg;
            stroke-dasharray: calc(var(--length) * 0.1), var(--length);
        }
    }

    @keyframes linear-indeterminate {
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
