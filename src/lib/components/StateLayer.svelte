<script module lang="ts">
    import { tv } from "$lib/style.js";

    export const variants = tv({
        defaultVariants: {
            active: "group",
            disabled: "group",
            focus: "group",
            hover: "group",
        },
        slots: {
            ripple: "pointer-events-none absolute size-[300cqmin] origin-center scale-0 rounded-full bg-current opacity-10 transition-[background-color]",
            root: "@container/state-layer relative flex items-center justify-center overflow-clip",
            state: "absolute inset-0 bg-current opacity-0 transition-[opacity,background-color]",
        },
        variants: {
            active: {
                group: { state: "group-active/state-layer:opacity-10" },
                none: {},
                peer: { state: "peer-active/state-layer:opacity-10" },
            },
            disabled: {
                group: {
                    root: "group-disabled/state-layer:pointer-events-none group-disabled/state-layer:opacity-0",
                },
                none: {},
                peer: {
                    root: "peer-disabled/state-layer:pointer-events-none peer-disabled/state-layer:opacity-0",
                },
            },
            focus: {
                group: { state: "group-focus-within/state-layer:opacity-10" },
                none: {},
                peer: { state: "peer-focus-within/state-layer:opacity-10" },
            },
            hover: {
                group: { state: "group-hover/state-layer:opacity-8" },
                none: {},
                peer: { state: "peer-hover/state-layer:opacity-8" },
            },
        },
    });
</script>

<script lang="ts">
    import type { VariantProps } from "$lib/style.js";
    import type { HTMLAttributes, MouseEventHandler } from "svelte/elements";

    import { SvelteMap } from "svelte/reactivity";

    let {
        active,
        class: className,
        commonClass,
        disabled,
        focus,
        hover,
        ref = $bindable(null),
        rippleClass,
        stateClass,
        target,
        ...props
    }: VariantProps<
        HTMLAttributes<HTMLDivElement>,
        typeof variants,
        "class" | "commonClass" | "rippleClass" | "stateClass",
        {
            ref?: HTMLDivElement | null;
            target?: HTMLElement | null;
        }
    > = $props();

    let classes = $derived(variants({ active, disabled, focus, hover }));

    let nextKey = 0;
    let currentRipple: null | number = $state(null);
    let ripples = new SvelteMap<number, { x: number; y: number }>();

    const onmousedown: MouseEventHandler<HTMLElement> = ({
        clientX,
        clientY,
    }) => {
        const rect = ref?.getBoundingClientRect();
        const centerX = rect ? rect.left + rect.width / 2 : 0;
        const centerY = rect ? rect.top + rect.height / 2 : 0;
        const x = (clientX || centerX) - centerX;
        const y = (clientY || centerY) - centerY;
        const key = nextKey++;

        currentRipple = key;
        ripples.set(key, { x, y });
    };

    const onmouseupOrLeave: MouseEventHandler<HTMLElement> = () => {
        currentRipple = null;
    };

    $effect(() => {
        const el = target ?? ref;

        if (el) {
            el.addEventListener("mousedown", onmousedown as never);
            el.addEventListener("mouseup", onmouseupOrLeave as never);
            el.addEventListener("mouseleave", onmouseupOrLeave as never);

            return () => {
                el.removeEventListener("mousedown", onmousedown as never);
                el.removeEventListener("mouseup", onmouseupOrLeave as never);
                el.removeEventListener("mouseleave", onmouseupOrLeave as never);
            };
        }
    });
</script>

<div class={classes.root({ className })} bind:this={ref} {...props}>
    <div class={classes.state({ class: [commonClass, stateClass] })}></div>

    {#each ripples.entries() as [key, { x, y }] (key)}
        <div
            class={classes.ripple({
                class: [
                    key === currentRipple
                        ? "animate-ripple-hold"
                        : "animate-ripple",
                    commonClass,
                    rippleClass,
                ],
            })}
            style={`translate: ${x}px ${y}px;`}
            onanimationend={({ animationName }) => {
                if (!animationName.includes("hold")) ripples.delete(key);
            }}
        ></div>
    {/each}
</div>

<style>
    .animate-ripple {
        animation:
            ripple 0.5s,
            ripple-hold 1s forwards paused;
    }

    .animate-ripple-hold {
        animation: ripple-hold 1s forwards;
    }

    @keyframes ripple {
        100% {
            scale: 1;
            translate: 0 0;
            opacity: 0;
        }
    }

    @keyframes ripple-hold {
        100% {
            scale: 1;
            translate: 0 0;
        }
    }
</style>
