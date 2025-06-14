<script lang="ts" module>
    import { tv } from "$lib/style.js";

    export const variants = tv({
        compoundSlots: [
            {
                class: [
                    "rounded-xxs absolute",
                    "group-ui-horizontal/slider:first:left-0 group-ui-horizontal/slider:last:right-0",
                    "group-ui-vertical/slider:first:bottom-0 group-ui-vertical/slider:last:top-0",
                ],
                slots: ["inactiveTrack", "activeTrack"],
            },
            {
                class: [
                    "group-ui-horizontal/slider:mx-2 group-ui-horizontal/slider:h-4 group-ui-horizontal/slider:first:-ml-2 group-ui-horizontal/slider:last:-mr-2 group-ui-horizontal/slider:first:rounded-l-sm group-ui-horizontal/slider:last:rounded-r-sm",
                    "group-ui-vertical/slider:my-2 group-ui-vertical/slider:w-4 group-ui-vertical/slider:first:-mb-2 group-ui-vertical/slider:last:-mt-2 group-ui-vertical/slider:first:rounded-b-sm group-ui-vertical/slider:last:rounded-t-sm",
                ],
                collapsible: false,
                slots: ["inactiveTrack", "activeTrack"],
            },
            {
                class: [
                    "transition-[width,height,margin,border-radius]",
                    "group-ui-horizontal/slider:h-1 group-ui-horizontal/slider:first:-ml-0.5 group-ui-horizontal/slider:last:-mr-0.5 group-ui-horizontal/slider:mx-0.5",
                    "group-ui-vertical/slider:w-1 group-ui-vertical/slider:first:-mb-0.5 group-ui-vertical/slider:last:-mt-0.5 group-ui-vertical/slider:my-0.5",
                    "group-ui-horizontal/slider:group-hover/slider:mx-2 group-ui-horizontal/slider:group-hover/slider:h-4 group-ui-horizontal/slider:group-hover/slider:first:-ml-2 group-ui-horizontal/slider:group-hover/slider:last:-mr-2 group-ui-horizontal/slider:group-hover/slider:first:rounded-l-sm group-ui-horizontal/slider:group-hover/slider:last:rounded-r-sm",
                    "group-ui-horizontal/slider:group-focus-within/slider:mx-2 group-ui-horizontal/slider:group-focus-within/slider:h-4 group-ui-horizontal/slider:group-focus-within/slider:first:-ml-2 group-ui-horizontal/slider:group-focus-within/slider:last:-mr-2 group-ui-horizontal/slider:group-focus-within/slider:first:rounded-l-sm group-ui-horizontal/slider:group-focus-within/slider:last:rounded-r-sm",
                    "group-ui-vertical/slider:group-hover/slider:my-2 group-ui-vertical/slider:group-hover/slider:w-4 group-ui-vertical/slider:group-hover/slider:first:-mb-2 group-ui-vertical/slider:group-hover/slider:last:-mt-2 group-ui-vertical/slider:group-hover/slider:first:rounded-b-sm group-ui-vertical/slider:group-hover/slider:last:rounded-t-sm",
                    "group-ui-vertical/slider:group-focus-within/slider:my-2 group-ui-vertical/slider:group-focus-within/slider:w-4 group-ui-vertical/slider:group-focus-within/slider:first:-mb-2 group-ui-vertical/slider:group-focus-within/slider:last:-mt-2 group-ui-vertical/slider:group-focus-within/slider:first:rounded-b-sm group-ui-vertical/slider:group-focus-within/slider:last:rounded-t-sm",
                ],
                collapsible: true,
                slots: ["inactiveTrack", "activeTrack"],
            },
        ],
        slots: {
            activeTrack: "bg-primary group-disabled/slider:bg-on-surface/38",
            container: [
                "group/slider relative flex cursor-pointer items-center disabled:cursor-default",
                "ui-horizontal:min-w-86 ui-horizontal:flex-row ui-horizontal:h-11 ui-horizontal:mx-2",
                "ui-vertical:min-h-86 ui-vertical:flex-col ui-vertical:w-11 ui-vertical:my-2",
            ],
            handle: [
                "bg-primary cursor-grab rounded-full outline-none transition-[width]",
                "group-ui-horizontal/slider:h-11 group-ui-horizontal/slider:hover:w-1 group-ui-horizontal/slider:focus:w-0.5 group-ui-horizontal/slider:group-disabled/slider:!w-1",
                "group-ui-vertical/slider:w-11 group-ui-vertical-horizontal/slider:hover:h-1 group-ui-vertical/slider:focus:h-0.5 group-ui-vertical/slider:group-disabled/slider:!h-1",
                "group-disabled/slider:bg-on-surface/38 group-disabled/slider:!cursor-default",
                // "focus-visible:outline-secondary focus-visible:outline-solid focus-visible:outline focus-visible:outline-offset-2",
            ],
            inactiveTrack:
                "bg-secondary-container group-disabled/slider:bg-on-surface/12",
            indicator: [
                "group-disabled/slider:bg-on-surface/38 group-disabled/slider:data-[bounded]:bg-inverse-on-surface/38 bg-on-secondary-container data-[bounded]:bg-on-primary data-[bounded]:not-has-[+.peer[data-bounded]]:!bg-transparent group-ui-horizontal/slider:!-translate-x-1/2 group-ui-vertical/slider:!translate-y-1/2 peer rounded-full transition-[width,height]",
            ],
        },
        variants: {
            collapsible: {
                false: {
                    handle: [
                        "group-ui-horizontal/slider:w-1",
                        "group-ui-vertical/slider:h-1",
                    ],
                    indicator: "size-1",
                },
                true: {
                    handle: [
                        "group-ui-horizontal/slider:w-0 group-ui-horizontal/slider:group-hover/slider:w-1 group-ui-horizontal/slider:group-focus-within/slider:w-1 group-ui-horizontal/slider:group-disabled/slider:!w-0",
                        "group-ui-vertical/slider:h-0 group-ui-vertical/slider:group-hover/slider:h-1 group-ui-vertical/slider:group-focus-within/slider:h-1 group-ui-vertical/slider:group-disabled/slider:!h-0",
                    ],
                    indicator:
                        "size-0 group-focus-within/slider:size-1 group-hover/slider:size-1 group-disabled/slider:size-0",
                },
            },
            type: {
                multiple: {
                    indicator:
                        "data-[bounded]:not-peer-data-[bounded]:!bg-transparent",
                },
                single: {},
            },
        },
    });

    const leftPattern = /left\s*:\s*([0-9.]+%)/;
    const rightPattern = /right\s*:\s*([0-9.]+%)/;
    const topPattern = /top\s*:\s*([0-9.]+%)/;
    const bottomPattern = /bottom\s*:\s*([0-9.]+%)/;
</script>

<script lang="ts">
    // TODO: Add thumb tooltip
    import type { WrapperProps } from "$lib/types/style.js";

    import { Slider } from "bits-ui";

    let {
        activeTrackClass,
        collapsible = false,
        containerClass,
        discrete = false,
        handleClass,
        inactiveTrackClass,
        indicatorClass,
        ref = $bindable(null),
        step = 1,
        type,
        value = $bindable(),
        ...props
    }: WrapperProps<
        Slider.RootProps,
        typeof variants,
        {
            collapsible?: boolean;
            discrete?: boolean;
        }
    > = $props();

    let classes = $derived(variants({ collapsible, type }));
</script>

<Slider.Root
    class={classes.container({ class: containerClass })}
    {step}
    {type}
    bind:ref
    bind:value={value as never}
    {...props}
>
    {#snippet children({ thumbs, ticks })}
        {@const firstTick = ticks.at(0)}
        {@const lastTick = ticks.at(-1)}
        {@const renderedTicks =
            !discrete && type !== "multiple" && lastTick !== undefined
                ? [lastTick]
                : !discrete &&
                    type === "multiple" &&
                    firstTick !== undefined &&
                    lastTick !== undefined
                  ? [firstTick, lastTick]
                  : ticks}

        <Slider.Range>
            {#snippet child({ props })}
                {@const left = leftPattern.exec(props.style as string)?.[1]}
                {@const right = rightPattern.exec(props.style as string)?.[1]}
                {@const top = topPattern.exec(props.style as string)?.[1]}
                {@const bottom = bottomPattern.exec(props.style as string)?.[1]}

                <span class="contents">
                    {#if type === "multiple"}
                        <span
                            style={left
                                ? `right: calc(100% - ${left})`
                                : top
                                  ? `top: calc(100% - ${bottom})`
                                  : ""}
                            class={classes.inactiveTrack({
                                class: inactiveTrackClass,
                            })}
                        >
                        </span>
                    {/if}
                    <span
                        class={classes.activeTrack({ class: activeTrackClass })}
                        {...props}
                    >
                    </span>
                    <span
                        style={right
                            ? `left: calc(100% - ${right})`
                            : bottom
                              ? `bottom: calc(100% - ${top})`
                              : ""}
                        class={classes.inactiveTrack({
                            class: inactiveTrackClass,
                        })}
                    >
                    </span>
                </span>
            {/snippet}
        </Slider.Range>
        {#each thumbs as index (index)}
            <Slider.Thumb
                class={classes.handle({ class: handleClass })}
                {index}
            />
        {/each}
        {#each renderedTicks as index (index)}
            <Slider.Tick
                class={classes.indicator({ class: indicatorClass })}
                {index}
            />
        {/each}
    {/snippet}
</Slider.Root>
