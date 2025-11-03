export const constEntries: <T extends Record<string, unknown>>(
    o: T,
) => (T extends {
    readonly [Ki in infer K]: infer V;
}
    ? [K, V]
    : never)[] = Object.entries;
