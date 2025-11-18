<script lang="ts" module>
    import { mergeVariants, tv } from "$lib/style.js";

    export const variantsConfig = mergeVariants({
        slots: {
            button: "group/split-button",
            container: "",
            icon: "transition-transform group-ui-open/split-button:rotate-180",
            menu: "",
        },
        variants: {
            size: {
                "extra-large": {
                    button: "pr-12.25 pl-9.25 icon-12.5 ui-open:!rounded-[--spacing(17)] ui-open:px-10.75",
                },
                "extra-small": {
                    button: "pr-2.5 pl-3 icon-5.5 ui-open:!rounded-[--spacing(4)] ui-open:px-2.75",
                },
                large: {
                    button: "pr-8 pl-6.5 icon-9.5 ui-open:!rounded-[--spacing(12)] ui-open:px-7.25",
                },
                medium: {
                    button: "pr-4.75 pl-2.75 icon-6.5 ui-open:!rounded-[--spacing(7)] ui-open:px-3.75",
                },
                small: {
                    button: "pr-2.5 pl-3 icon-5.5 ui-open:!rounded-[--spacing(5)] ui-open:px-2.75",
                },
            },
        },
    });

    export const variants = tv(variantsConfig);
</script>

<script lang="ts">
    import type { WrapperProps } from "$lib/types/style.js";
    import type { ComponentProps, Snippet } from "svelte";

    import { ConnectedButtonGroup, IconButton, Menu } from "$lib/index.js";

    let {
        buttonClass,
        children,
        containerClass,
        iconClass,
        menu,
        menuClass,
        size = "small",
        ...props
    }: WrapperProps<
        ComponentProps<typeof ConnectedButtonGroup>,
        typeof variants,
        {
            menu?: Snippet;
        }
    > = $props();

    let classes = $derived(variants({ size }));
</script>

<ConnectedButtonGroup
    class={classes.container({ class: containerClass })}
    {size}
    {...props}
>
    {@render children?.()}

    <Menu class={classes.menu({ class: menuClass })} strategy="dropdown">
        {#snippet trigger({ props })}
            <IconButton
                containerClass={classes.button({ class: buttonClass })}
                icon="keyboard_arrow_down"
                iconClass={classes.icon({ class: iconClass })}
                {...props}
            />
        {/snippet}

        {@render menu?.()}
    </Menu>
</ConnectedButtonGroup>
