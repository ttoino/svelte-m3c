// Thank you https://stackoverflow.com/a/43053803/9937109
export const cartesian = <T extends unknown[][]>(
    ...a: [...T]
): { [K in keyof T]: T[K][number] }[] =>
    (a.length == 0
        ? []
        : a.length == 1
          ? a[0].map((b) => [b])
          : a.reduce((a, b) =>
                a.flatMap((d) => b.map((e) => [d, e].flat())),
            )) as {
        [K in keyof T]: T[K][number];
    }[];
