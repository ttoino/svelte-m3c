<script lang="ts">
    import { twMerge, type ClassProps } from "$lib/style.js";
    import type { HTMLAttributes, MouseEventHandler } from "svelte/elements";
    import { SvelteMap } from "svelte/reactivity";

    let {
        ref = $bindable(null),
        class: className,
        commonClass,
        stateClass,
        rippleClass,
        target,
        ...props
    }: ClassProps<
        HTMLAttributes<HTMLDivElement>,
        "class" | "commonClass" | "stateClass" | "rippleClass",
        {
            ref?: HTMLDivElement | null;
            target?: HTMLElement | null;
        }
    > = $props();

    let nextKey = 0;
    let currentRipple: number | null = $state(null);
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

<div
    class={twMerge(
        "@container/state-layer relative flex items-center justify-center overflow-clip group-disabled/state-layer:pointer-events-none group-disabled/state-layer:opacity-0",
        className,
    )}
    bind:this={ref}
    {...props}
>
    <div
        class={twMerge(
            "group-hover/state-layer:opacity-8 absolute inset-0 bg-current opacity-0 transition-[opacity,background-color] group-focus-within/state-layer:opacity-10 group-active/state-layer:opacity-10",
            commonClass,
            stateClass,
        )}
    ></div>

    {#each ripples.entries() as [key, { x, y }] (key)}
        <div
            class={twMerge(
                "pointer-events-none absolute size-[300cqmin] origin-center scale-0 rounded-full bg-current opacity-10 transition-[background-color]",
                key === currentRipple
                    ? "animate-ripple-hold"
                    : "animate-ripple",
                commonClass,
                rippleClass,
            )}
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
