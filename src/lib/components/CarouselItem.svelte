<script lang="ts" module>
    import { getCarouselVariant } from "$lib/context/carousel.js";
    import { mergeVariants, tv } from "$lib/style.js";

    export const variantsConfig = mergeVariants({
        defaultVariants: {
            variant: "uncontained",
        },
        slots: {
            container:
                "flex h-full max-w-full shrink-0 basis-(--basis) flex-col items-start",
            item: "absolute h-full w-full overflow-clip rounded-xl border border-outline-variant *:[img,video]:h-full *:[img,video]:w-full *:[img,video]:object-cover *:[img,video]:select-none",
        },
        variants: {
            variant: {
                "centered-hero": {
                    container: "items-center",
                },
                "full-screen": {
                    container: "h-0",
                },
                hero: {},
                "multi-browse": {},
                uncontained: {
                    container: "block flex-none",
                    item: "static w-fit *:[img,video]:w-auto",
                },
            },
        },
    });

    export const variants = tv(variantsConfig);
</script>

<script lang="ts">
    import type { WrapperProps } from "$lib/types/style.js";
    import type { HTMLAttributes } from "svelte/elements";

    let {
        children,
        containerClass,
        itemClass,
        ...props
    }: WrapperProps<
        HTMLAttributes<HTMLDivElement>,
        typeof variants,
        { variant?: undefined }
    > = $props();

    const variant = getCarouselVariant();

    let classes = $derived(variants({ variant: variant?.() }));
</script>

<div class={classes.container({ class: containerClass })} {...props}>
    <div class={classes.item({ class: itemClass })}>
        {@render children?.()}
    </div>
</div>
