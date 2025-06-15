<script lang="ts" module>
    // TODO: inset icon positioning
    // TODO: centered variant
    // FIXME: Handle does not go entirely to the edge of the track
    import { mergeVariants, tv } from "$lib/style.js";

    export const variantsConfig = mergeVariants({
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
                    "group-ui-horizontal/slider:mx-2 group-ui-horizontal/slider:first:-ml-2 group-ui-horizontal/slider:last:-mr-2",
                    "group-ui-vertical/slider:my-2 group-ui-vertical/slider:first:-mb-2 group-ui-vertical/slider:last:-mt-2",
                ],
                collapsible: false,
                slots: ["inactiveTrack", "activeTrack"],
            },
            {
                class: [
                    "group-ui-horizontal/slider:h-4 group-ui-horizontal/slider:first:rounded-l-sm group-ui-horizontal/slider:last:rounded-r-sm",
                    "group-ui-vertical/slider:w-4 group-ui-vertical/slider:first:rounded-b-sm group-ui-vertical/slider:last:rounded-t-sm",
                ],
                collapsible: false,
                size: "extra-small",
                slots: ["inactiveTrack", "activeTrack"],
            },
            {
                class: [
                    "group-ui-horizontal/slider:h-6 group-ui-horizontal/slider:first:rounded-l-sm group-ui-horizontal/slider:last:rounded-r-sm",
                    "group-ui-vertical/slider:w-6 group-ui-vertical/slider:first:rounded-b-sm group-ui-vertical/slider:last:rounded-t-sm",
                ],
                collapsible: false,
                size: "small",
                slots: ["inactiveTrack", "activeTrack"],
            },
            {
                class: [
                    "group-ui-horizontal/slider:h-10 group-ui-horizontal/slider:first:rounded-l-md group-ui-horizontal/slider:last:rounded-r-md",
                    "group-ui-vertical/slider:w-10 group-ui-vertical/slider:first:rounded-b-md group-ui-vertical/slider:last:rounded-t-md",
                ],
                collapsible: false,
                size: "medium",
                slots: ["inactiveTrack", "activeTrack"],
            },
            {
                class: [
                    "group-ui-horizontal/slider:h-14 group-ui-horizontal/slider:first:rounded-l-lg group-ui-horizontal/slider:last:rounded-r-lg",
                    "group-ui-vertical/slider:w-14 group-ui-vertical/slider:first:rounded-b-lg group-ui-vertical/slider:last:rounded-t-lg",
                ],
                collapsible: false,
                size: "large",
                slots: ["inactiveTrack", "activeTrack"],
            },
            {
                class: [
                    "group-ui-horizontal/slider:h-24 group-ui-horizontal/slider:first:rounded-l-xl group-ui-horizontal/slider:last:rounded-r-xl",
                    "group-ui-vertical/slider:w-24 group-ui-vertical/slider:first:rounded-b-xl group-ui-vertical/slider:last:rounded-t-xl",
                ],
                collapsible: false,
                size: "extra-large",
                slots: ["inactiveTrack", "activeTrack"],
            },
            {
                class: [
                    "transition-[width,height,margin,border-radius]",
                    "group-ui-horizontal/slider:h-1 group-ui-horizontal/slider:first:-ml-0.5 group-ui-horizontal/slider:last:-mr-0.5 group-ui-horizontal/slider:mx-0.5",
                    "group-ui-vertical/slider:w-1 group-ui-vertical/slider:first:-mb-0.5 group-ui-vertical/slider:last:-mt-0.5 group-ui-vertical/slider:my-0.5",
                    "group-ui-horizontal/slider:group-hover/slider:mx-2 group-ui-horizontal/slider:group-hover/slider:first:-ml-2 group-ui-horizontal/slider:group-hover/slider:last:-mr-2",
                    "group-ui-horizontal/slider:group-focus-within/slider:mx-2 group-ui-horizontal/slider:group-focus-within/slider:first:-ml-2 group-ui-horizontal/slider:group-focus-within/slider:last:-mr-2",
                    "group-ui-vertical/slider:group-hover/slider:my-2 group-ui-vertical/slider:group-hover/slider:first:-mb-2 group-ui-vertical/slider:group-hover/slider:last:-mt-2",
                    "group-ui-vertical/slider:group-focus-within/slider:my-2 group-ui-vertical/slider:group-focus-within/slider:first:-mb-2 group-ui-vertical/slider:group-focus-within/slider:last:-mt-2",
                ],
                collapsible: true,
                slots: ["inactiveTrack", "activeTrack"],
            },
            {
                class: [
                    "group-ui-horizontal/slider:group-hover/slider:h-4 group-ui-horizontal/slider:group-hover/slider:first:rounded-l-sm group-ui-horizontal/slider:group-hover/slider:last:rounded-r-sm",
                    "group-ui-horizontal/slider:group-focus-within/slider:h-4 group-ui-horizontal/slider:group-focus-within/slider:first:rounded-l-sm group-ui-horizontal/slider:group-focus-within/slider:last:rounded-r-sm",
                    "group-ui-vertical/slider:group-hover/slider:w-4 group-ui-vertical/slider:group-hover/slider:first:rounded-b-sm group-ui-vertical/slider:group-hover/slider:last:rounded-t-sm",
                    "group-ui-vertical/slider:group-focus-within/slider:w-4 group-ui-vertical/slider:group-focus-within/slider:first:rounded-b-sm group-ui-vertical/slider:group-focus-within/slider:last:rounded-t-sm",
                ],
                collapsible: true,
                size: "extra-small",
                slots: ["inactiveTrack", "activeTrack"],
            },
            {
                class: [
                    "group-ui-horizontal/slider:group-hover/slider:h-6 group-ui-horizontal/slider:group-hover/slider:first:rounded-l-sm group-ui-horizontal/slider:group-hover/slider:last:rounded-r-sm",
                    "group-ui-horizontal/slider:group-focus-within/slider:h-6 group-ui-horizontal/slider:group-focus-within/slider:first:rounded-l-sm group-ui-horizontal/slider:group-focus-within/slider:last:rounded-r-sm",
                    "group-ui-vertical/slider:group-hover/slider:w-6 group-ui-vertical/slider:group-hover/slider:first:rounded-b-sm group-ui-vertical/slider:group-hover/slider:last:rounded-t-sm",
                    "group-ui-vertical/slider:group-focus-within/slider:w-6 group-ui-vertical/slider:group-focus-within/slider:first:rounded-b-sm group-ui-vertical/slider:group-focus-within/slider:last:rounded-t-sm",
                ],
                collapsible: true,
                size: "small",
                slots: ["inactiveTrack", "activeTrack"],
            },
            {
                class: [
                    "group-ui-horizontal/slider:group-hover/slider:h-10 group-ui-horizontal/slider:group-hover/slider:first:rounded-l-md group-ui-horizontal/slider:group-hover/slider:last:rounded-r-md",
                    "group-ui-horizontal/slider:group-focus-within/slider:h-10 group-ui-horizontal/slider:group-focus-within/slider:first:rounded-l-md group-ui-horizontal/slider:group-focus-within/slider:last:rounded-r-md",
                    "group-ui-vertical/slider:group-hover/slider:w-10 group-ui-vertical/slider:group-hover/slider:first:rounded-b-md group-ui-vertical/slider:group-hover/slider:last:rounded-t-md",
                    "group-ui-vertical/slider:group-focus-within/slider:w-10 group-ui-vertical/slider:group-focus-within/slider:first:rounded-b-md group-ui-vertical/slider:group-focus-within/slider:last:rounded-t-md",
                ],
                collapsible: true,
                size: "medium",
                slots: ["inactiveTrack", "activeTrack"],
            },
            {
                class: [
                    "group-ui-horizontal/slider:group-hover/slider:h-14 group-ui-horizontal/slider:group-hover/slider:first:rounded-l-lg group-ui-horizontal/slider:group-hover/slider:last:rounded-r-lg",
                    "group-ui-horizontal/slider:group-focus-within/slider:h-14 group-ui-horizontal/slider:group-focus-within/slider:first:rounded-l-lg group-ui-horizontal/slider:group-focus-within/slider:last:rounded-r-lg",
                    "group-ui-vertical/slider:group-hover/slider:w-14 group-ui-vertical/slider:group-hover/slider:first:rounded-b-lg group-ui-vertical/slider:group-hover/slider:last:rounded-t-lg",
                    "group-ui-vertical/slider:group-focus-within/slider:w-14 group-ui-vertical/slider:group-focus-within/slider:first:rounded-b-lg group-ui-vertical/slider:group-focus-within/slider:last:rounded-t-lg",
                ],
                collapsible: true,
                size: "large",
                slots: ["inactiveTrack", "activeTrack"],
            },
            {
                class: [
                    "group-ui-horizontal/slider:group-hover/slider:h-24 group-ui-horizontal/slider:group-hover/slider:first:rounded-l-xl group-ui-horizontal/slider:group-hover/slider:last:rounded-r-xl",
                    "group-ui-horizontal/slider:group-focus-within/slider:h-24 group-ui-horizontal/slider:group-focus-within/slider:first:rounded-l-xl group-ui-horizontal/slider:group-focus-within/slider:last:rounded-r-xl",
                    "group-ui-vertical/slider:group-hover/slider:w-24 group-ui-vertical/slider:group-hover/slider:first:rounded-b-xl group-ui-vertical/slider:group-hover/slider:last:rounded-t-xl",
                    "group-ui-vertical/slider:group-focus-within/slider:w-24 group-ui-vertical/slider:group-focus-within/slider:first:rounded-b-xl group-ui-vertical/slider:group-focus-within/slider:last:rounded-t-xl",
                ],
                collapsible: true,
                size: "extra-large",
                slots: ["inactiveTrack", "activeTrack"],
            },
        ],
        defaultVariants: {
            collapsible: false,
            size: "extra-small",
            type: "single",
        },
        slots: {
            activeTrack: "bg-primary group-disabled/slider:bg-on-surface/38",
            container: [
                "group/slider relative flex cursor-pointer items-center disabled:cursor-default",
                "ui-horizontal:min-w-86 ui-horizontal:flex-row ui-horizontal:mx-2",
                "ui-vertical:min-h-86 ui-vertical:flex-col ui-vertical:my-2",
            ],
            handle: [
                "bg-primary cursor-grab rounded-full outline-none transition-[width]",
                "group-ui-horizontal/slider:hover:w-1 group-ui-horizontal/slider:focus:w-0.5 group-ui-horizontal/slider:group-disabled/slider:!w-1",
                "group-ui-vertical-horizontal/slider:hover:h-1 group-ui-vertical/slider:focus:h-0.5 group-ui-vertical/slider:group-disabled/slider:!h-1",
                "group-disabled/slider:bg-on-surface/38 group-disabled/slider:!cursor-default",
                // "focus-visible:outline-secondary focus-visible:outline-solid focus-visible:outline focus-visible:outline-offset-2",
            ],
            icon: "text-inverse-on-surface absolute group-disabled/slider:data-[bounded]:bg-inverse-on-surface/38",
            inactiveTrack:
                "bg-secondary-container group-disabled/slider:bg-on-surface/12",
            stopIndicator:
                "group-disabled/slider:bg-on-surface/38 group-disabled/slider:data-[bounded]:bg-inverse-on-surface/38 bg-on-secondary-container data-[bounded]:bg-on-primary data-[bounded]:not-has-[+.peer[data-bounded]]:!bg-transparent group-ui-horizontal/slider:!-translate-x-1/2 group-ui-vertical/slider:!translate-y-1/2 peer rounded-full transition-[width,height]",
            valueIndicator:
                "bg-inverse-surface text-inverse-on-surface px-4 py-3 ui-horizontal:my-1 ui-vertical:mx-1 text-label-l rounded-full not-active:hidden group-disabled/slider:hidden transition-opacity starting:opacity-0",
        },
        variants: {
            collapsible: {
                false: {
                    handle: [
                        "group-ui-horizontal/slider:w-1",
                        "group-ui-vertical/slider:h-1",
                    ],
                    stopIndicator: "size-1",
                },
                true: {
                    handle: [
                        "group-ui-horizontal/slider:w-0 group-ui-horizontal/slider:group-hover/slider:w-1 group-ui-horizontal/slider:group-focus-within/slider:w-1 group-ui-horizontal/slider:group-disabled/slider:!w-0",
                        "group-ui-vertical/slider:h-0 group-ui-vertical/slider:group-hover/slider:h-1 group-ui-vertical/slider:group-focus-within/slider:h-1 group-ui-vertical/slider:group-disabled/slider:!h-0",
                    ],
                    icon: "opacity-0 group-hover/slider:opacity-100 group-focus-within/slider:opacity-100 transition-opacity",
                    stopIndicator:
                        "size-0 group-focus-within/slider:size-1 group-hover/slider:size-1 group-disabled/slider:size-0",
                },
            },
            size: {
                "extra-large": {
                    container: "ui-horizontal:h-27 ui-vertical:w-27",
                    handle: "group-ui-horizontal/slider:h-27 group-ui-vertical/slider:w-27",
                    icon: "icon-8",
                },
                "extra-small": {
                    container: "ui-horizontal:h-11 ui-vertical:w-11",
                    handle: "group-ui-horizontal/slider:h-11 group-ui-vertical/slider:w-11",
                    icon: "icon-0",
                },
                large: {
                    container: "ui-horizontal:h-17 ui-vertical:w-17",
                    handle: "group-ui-horizontal/slider:h-17 group-ui-vertical/slider:w-17",
                    icon: "icon-6",
                },
                medium: {
                    container: "ui-horizontal:h-13 ui-vertical:w-13",
                    handle: "group-ui-horizontal/slider:h-13 group-ui-vertical/slider:w-13",
                    icon: "icon-6",
                },
                small: {
                    container: "ui-horizontal:h-11 ui-vertical:w-11",
                    handle: "group-ui-horizontal/slider:h-11 group-ui-vertical/slider:w-11",
                    icon: "icon-0",
                },
            },
            type: {
                multiple: {
                    stopIndicator:
                        "data-[bounded]:not-peer-data-[bounded]:!bg-transparent",
                },
                single: {},
            },
        },
    });

    export const variants = tv(variantsConfig);

    const leftPattern = /left\s*:\s*([0-9.]+%)/;
    const rightPattern = /right\s*:\s*([0-9.]+%)/;
    const topPattern = /top\s*:\s*([0-9.]+%)/;
    const bottomPattern = /bottom\s*:\s*([0-9.]+%)/;
</script>

<script lang="ts">
    import type { WrapperProps } from "$lib/types/style.js";
    import type { MaterialSymbol } from "material-symbols";

    import { Slider } from "bits-ui";

    import Icon from "./Icon.svelte";

    let {
        activeTrackClass,
        collapsible = false,
        containerClass,
        discrete = false,
        handleClass,
        icon,
        iconClass,
        inactiveTrackClass,
        ref = $bindable(null),
        size,
        step = 1,
        stopIndicatorClass,
        type,
        value = $bindable(),
        valueIndicatorClass,
        ...props
    }: WrapperProps<
        Slider.RootProps,
        typeof variants,
        {
            collapsible?: boolean;
            discrete?: boolean;
            icon?: MaterialSymbol;
        }
    > = $props();

    let classes = $derived(variants({ collapsible, size, type }));
</script>

<Slider.Root
    class={classes.container({ class: containerClass })}
    {step}
    {type}
    bind:ref
    bind:value={value as never}
    {...props}
>
    {#snippet children({ thumbItems, tickItems })}
        {@const firstTick = tickItems.at(0)}
        {@const lastTick = tickItems.at(-1)}
        {@const renderedTicks =
            !discrete && type !== "multiple" && lastTick !== undefined
                ? [lastTick]
                : !discrete &&
                    type === "multiple" &&
                    firstTick !== undefined &&
                    lastTick !== undefined
                  ? [firstTick, lastTick]
                  : tickItems}

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

                {#if icon}
                    <Icon class={classes.icon({ class: iconClass })} {icon} />
                {/if}
            {/snippet}
        </Slider.Range>
        {#each thumbItems as { index, value } (index)}
            <Slider.Thumb
                class={classes.handle({ class: handleClass })}
                {index}
            />
            <Slider.ThumbLabel
                class={classes.valueIndicator({ class: valueIndicatorClass })}
                {index}
            >
                {value}
            </Slider.ThumbLabel>
        {/each}
        {#each renderedTicks as { index } (index)}
            <Slider.Tick
                class={classes.stopIndicator({ class: stopIndicatorClass })}
                {index}
            />
        {/each}
    {/snippet}
</Slider.Root>
