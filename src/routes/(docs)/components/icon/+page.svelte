<script lang="ts">
    import { Icon, type IconName } from "$lib/index.js";

    import Title from "../../../Title.svelte";
    import Playground, {
        iconControl,
        sliderControl,
    } from "../../Playground.svelte";
    import { renderComponentCode } from "../../renderCode.js";
</script>

<Title content="Icons" />

<!-- TODO -->

<Playground
    code={({ fill, grade, size, weight, ...props }) =>
        renderComponentCode("Icon", {
            class: `icon-${
                fill === 0 ? "outline" : fill === 1 ? "filled" : "fill-" + fill
            } ${
                (grade < 0 && grade !== -25 ? "-" : "") +
                "icon-grade-" +
                (grade === -25
                    ? "low"
                    : grade === 0
                      ? "normal"
                      : grade === 200
                        ? "high"
                        : Math.abs(grade))
            } icon-${size / 4} font-${
                weight === 100
                    ? "thin"
                    : weight === 200
                      ? "extralight"
                      : weight === 300
                        ? "light"
                        : weight === 400
                          ? "normal"
                          : weight === 500
                            ? "medium"
                            : weight === 600
                              ? "semibold"
                              : weight === 700
                                ? "bold"
                                : weight === 800
                                  ? "extrabold"
                                  : weight === 900
                                    ? "black"
                                    : "[" + weight + "]"
            }`,
            ...props,
        })}
    controls={{
        /* eslint-disable perfectionist/sort-objects */
        icon: iconControl("Icon"),
        fill: sliderControl("Fill", { max: 1, step: 0.01 }),
        grade: sliderControl("Grade", { min: -25, max: 200 }),
        size: sliderControl("Size (px)", { min: 12, max: 256 }),
        weight: sliderControl("Weight", { min: 100, max: 900 }),
        /* eslint-enable perfectionist/sort-objects */
    }}
    defaults={{
        fill: 0,
        grade: 0,
        icon: "add" as IconName,
        size: 24,
        weight: 400,
    }}
>
    {#snippet children({ fill, grade, size, weight, ...props })}
        <Icon
            style="--icon-fill: {fill}; --icon-grade: {grade}; --icon-size: {size}px; font-weight: {weight}"
            {...props}
        />
    {/snippet}
</Playground>

<!-- TODO -->
