import type { ClassValue, VariantProps } from "tailwind-variants";

export type ClassGroups = "icon-fill" | "icon-grade" | "icon-size";

export type WrapperProps<
    Base,
    TV extends (() => ClassValue) | (() => Record<string, () => ClassValue>),
    Other extends Record<string, unknown> = Record<never, never>,
    Classes extends string = TV extends () => infer Return
        ? Return extends Record<infer K, () => ClassValue>
            ? K extends string
                ? `${K}Class`
                : never
            : "class"
        : never,
> = {
    [K in Classes]?: ClassValue;
} & Omit<Base, "class" | Classes | keyof (Other & VariantProps<TV>)> &
    Omit<Other, "class" | Classes | keyof VariantProps<TV>> &
    Omit<VariantProps<TV>, "class" | Classes>;
