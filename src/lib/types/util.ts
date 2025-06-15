export type Mutable<T> = {
    -readonly [K in keyof T]: Mutable<T[K]>;
};

export type Prettify<T> = {
    [K in keyof T]: Prettify<T[K]>;
} & {};
