import type { ClassValue, VariantProps } from "tailwind-variants";

export type ClassGroups =
    | "amplitude"
    | "icon-fill"
    | "icon-grade"
    | "icon-size"
    | "linecap"
    | "linejoin"
    | "paint"
    | "phase"
    | "wavelength";

export type MergeVariants<Parent, Child> = Parent extends
    | readonly unknown[]
    | unknown[]
    ? Child extends readonly unknown[] | unknown[]
        ? [...Parent, ...Child]
        : Child extends boolean | number | string
          ? [...Parent, Child]
          : Child extends null | undefined
            ? Parent
            : never
    : Parent extends boolean | number | string
      ? Child extends readonly unknown[] | unknown[]
          ? [Parent, ...Child]
          : Child extends boolean | number | string
            ? [Parent, Child]
            : Child extends null | undefined
              ? Parent
              : never
      : Parent extends null | undefined
        ? Child
        : Parent extends Record<infer PK, unknown>
          ? Child extends Record<infer CK, unknown>
              ? {
                    [K in CK & PK]: MergeVariants<Parent[K], Child[K]>;
                } & {
                    [K in Exclude<CK, PK>]: Child[K];
                } & {
                    [K in Exclude<PK, CK>]: Parent[K];
                }
              : Child extends null | undefined
                ? Parent
                : never
          : never;

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
    Omit<Other, "class" | Classes> &
    Omit<VariantProps<TV>, "class" | Classes | keyof Other>;
