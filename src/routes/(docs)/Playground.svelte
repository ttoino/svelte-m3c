<script lang="ts" module>
    import type { IconName } from "$lib/index.js";
    import type { Snippet } from "svelte";

    import { mergeVariants, tv } from "$lib/style.js";

    type Controls<T extends Record<string, unknown>> = {
        [K in keyof T]: Control<T[K]>;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type Control<T, Options = any> = {
        label: string;
        options: Options;
        snippet: Snippet<[string, () => T, (value: T) => void, Options]>;
    };

    export const buttonGroupControl = <T extends string>(
        label: string,
        values: Record<T, string>,
    ): Control<T, Record<T, string>> => ({
        label,
        options: values,
        snippet: buttonGroupControlSnippet<T>,
    });

    export const iconControl = (
        label: string,
    ): Control<IconName, undefined> => ({
        label,
        options: undefined,
        snippet: iconControlSnippet,
    });

    export const selectControl = <T extends string>(
        label: string,
        values: Record<T, string>,
    ): Control<T, Record<T, string>> => ({
        label,
        options: values,
        snippet: selectControlSnippet<T>,
    });

    export const sliderControl = (
        label: string,
        options: { max?: number; min?: number },
    ) => ({
        label,
        options,
        snippet: sliderControlSnippet,
    });

    export const switchControl = (
        label: string,
    ): Control<boolean, undefined> => ({
        label,
        options: undefined,
        snippet: switchControlSnippet,
    });

    export const textfieldControl = (
        label: string,
    ): Control<string, undefined> => ({
        label,
        options: undefined,
        snippet: textfieldControlSnippet,
    });

    const variantsConfig = mergeVariants({
        slots: {
            container:
                "not-prose my-4 flex min-h-120 flex-col overflow-hidden rounded-lg expanded:flex-row",
            controls:
                "flex flex-col gap-4 overflow-y-auto bg-surface-container-high p-4 max-expanded:h-80 expanded:w-80",
            preview:
                "m-0 flex-1 max-expanded:rounded-b-none max-expanded:border-b-0 expanded:rounded-e-none expanded:border-e-0",
        },
    });

    const variants = tv(variantsConfig);
</script>

<script generics="T extends Record<string, unknown>" lang="ts">
    import type { WrapperProps } from "$lib/types/style.js";
    import type { HTMLAttributes } from "svelte/elements";

    import {
        ConnectedButtonGroup,
        Icon,
        Select,
        SelectItem,
        Slider,
        Switch,
        TextField,
        ToggleButton,
    } from "$lib/index.js";

    import Preview from "./Preview.svelte";
    let {
        children,
        code,
        containerClass,
        controls,
        controlsClass,
        defaults,
        previewClass,
        ...props
    }: WrapperProps<
        HTMLAttributes<HTMLDivElement>,
        typeof variants,
        {
            children: Snippet<[T]>;
            code: (props: T) => string;
            controls: Controls<T>;
            defaults: T;
        }
    > = $props();

    const childProps = $state<T>(defaults);

    let classes = $derived(variants());
</script>

{#snippet buttonGroupControlSnippet<T extends string>(
    label: string,
    getValue: () => T,
    setValue: (value: T) => void,
    values: Record<T, string>,
)}
    <p class="sr-only">{label}</p>
    <ConnectedButtonGroup type="single" bind:value={getValue, setValue}>
        {#each Object.entries(values) as [value, label] (value)}
            <ToggleButton containerClass="flex-1" {value}>{label}</ToggleButton>
        {/each}
    </ConnectedButtonGroup>
{/snippet}

{#snippet iconControlSnippet(
    lbl: string,
    getValue: () => IconName,
    setValue: (value: IconName) => void,
)}
    <Select type="single" bind:value={getValue, setValue}>
        {#snippet leading()}<Icon icon={getValue()} />{/snippet}
        {#snippet input(value)}
            {value}
        {/snippet}
        {#snippet label()}{lbl}{/snippet}
        {#each ["edit", "add"] as const as icon (icon)}
            <SelectItem value={icon}>
                {#snippet leading()}<Icon {icon} />{/snippet}
                {#snippet text()}{icon}{/snippet}
            </SelectItem>
        {/each}
    </Select>
{/snippet}

{#snippet selectControlSnippet<T extends string>(
    lbl: string,
    getValue: () => T,
    setValue: (value: T) => void,
    values: Record<T, string>,
)}
    <Select type="single" bind:value={getValue, setValue}>
        {#snippet input(value)}{values[value as T]}{/snippet}
        {#snippet label()}{lbl}{/snippet}
        {#each Object.entries(values) as [value, label] (value)}
            <SelectItem {value}>
                {#snippet text()}{label}{/snippet}
            </SelectItem>
        {/each}
    </Select>
{/snippet}

{#snippet sliderControlSnippet(
    label: string,
    getValue: () => number,
    setValue: (value: number) => void,
    { max, min }: { max?: number; min?: number },
)}
    <p class="text-label-l">{label}</p>
    <Slider {max} {min} bind:value={getValue, setValue} />
{/snippet}

{#snippet switchControlSnippet(
    label: string,
    getValue: () => boolean,
    setValue: (value: boolean) => void,
)}
    <p class="inline-flex flex-row items-center gap-4 text-label-l">
        <Switch bind:checked={getValue, setValue} />
        {label}
    </p>
{/snippet}

{#snippet textfieldControlSnippet(
    lbl: string,
    getValue: () => string,
    setValue: (value: string) => void,
)}
    <TextField bind:value={getValue, setValue}>
        {#snippet label()}
            {lbl}
        {/snippet}
    </TextField>
{/snippet}

<div class={classes.container({ class: containerClass })} {...props}>
    <Preview
        class={classes.preview({ class: previewClass })}
        code={code(childProps)}
    >
        {@render children?.(childProps)}
    </Preview>
    <div class={classes.controls({ class: controlsClass })}>
        {#each Object.entries(controls) as [key, control] (key)}
            {@render control.snippet(
                control.label,
                () => childProps[key],
                (value: never) => {
                    childProps[key as keyof T] = value;
                },
                control.options,
            )}
        {/each}
    </div>
</div>
