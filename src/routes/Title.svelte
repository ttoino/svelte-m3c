<script lang="ts" module>
    import { mergeVariants, tv } from "$lib/style.js";

    const variantsConfig = mergeVariants({
        base: "",
    });

    const variants = tv(variantsConfig);
</script>

<script lang="ts">
    import type { WrapperProps } from "$lib/types/style.js";
    import type { WithoutChildren } from "bits-ui";
    import type { HTMLAttributes } from "svelte/elements";

    let {
        class: className,
        content,
        ...props
    }: WrapperProps<
        WithoutChildren<HTMLAttributes<HTMLHeadingElement>>,
        typeof variants,
        {
            content?: string;
        }
    > = $props();

    let title = $derived((content ? `${content} - ` : "") + "Svelte M3C");
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<h1 class={variants({ className })} {...props}>{content ?? title}</h1>
