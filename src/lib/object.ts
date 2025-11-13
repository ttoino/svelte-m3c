export const constEntries: <T extends Record<string, unknown>>(
    o: T,
) => (T extends {
    readonly [Ki in infer K]: infer V;
}
    ? [K, V]
    : never)[] = Object.entries;

export const constMapValues = <K extends string, T, V>(
    o: Record<K, T>,
    fn: (t: T) => V,
): Record<K, V> =>
    Object.fromEntries(
        constEntries(o).map(([k, v]) => [k, fn(v as T)] as [K, V]),
    ) as Record<K, V>;
