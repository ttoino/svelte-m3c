<script lang="ts" module>
    import { mergeVariants, tv } from "$lib/style.js";

    const variantsConfig = mergeVariants({
        slots: {
            container:
                "relative flex flex-col rounded-xl border-4 border-outline bg-surface",
            navbar: "absolute bottom-3 h-1 w-56 self-center rounded-full bg-on-surface",
            status: "icon-4",
            statusbar: "flex flex-row items-center justify-between p-6",
            time: "text-label-l",
        },
    });

    const variants = tv(variantsConfig);
</script>

<script lang="ts">
    import type { WrapperProps } from "$lib/types/style.js";
    import type { HTMLAttributes } from "svelte/elements";

    import { Icon } from "$lib/index.js";

    let {
        children,
        containerClass,
        navbar = false,
        navbarClass,
        statusbar = false,
        statusbarClass,
        statusClass,
        timeClass,
        ...props
    }: WrapperProps<
        HTMLAttributes<HTMLDivElement>,
        typeof variants,
        {
            navbar?: boolean;
            statusbar?: boolean;
        }
    > = $props();

    let classes = $derived(variants());
</script>

<div class={classes.container({ class: containerClass })} {...props}>
    {#if statusbar}
        <div class={classes.statusbar({ class: statusbarClass })}>
            <span class={classes.time({ class: timeClass })}>9:30</span>
            <span class={classes.status({ class: statusClass })}>
                <Icon icon="signal_wifi_4_bar" />
                <Icon icon="signal_cellular_4_bar" />
                <Icon icon="battery_4_bar" />
            </span>
        </div>
    {/if}

    {@render children?.()}

    {#if navbar}<div class={classes.navbar({ class: navbarClass })}></div>{/if}
</div>
