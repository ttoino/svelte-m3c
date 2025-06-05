import type {
    VariantProps as BaseVariantProps,
    ClassValue,
} from "tailwind-variants";

export type ClassGroups = "icon-fill" | "icon-grade" | "icon-size";

export type ClassProps<
    Base,
    Class extends string = "class",
    Other extends Record<string, unknown> = Record<never, never>,
> = ExtendProps<Omit<Base, "class">, { [c in Class]?: ClassValue } & Other>;

export type ExtendProps<Base, Other extends Record<string, unknown>> = Omit<
    Base,
    keyof Other
> &
    Other;

export type VariantProps<
    Base,
    TV extends () => unknown,
    Class extends string = "class",
    Other extends Record<string, unknown> = Record<never, never>,
> = ClassProps<Base, Class, BaseVariantProps<TV> & Other>;
