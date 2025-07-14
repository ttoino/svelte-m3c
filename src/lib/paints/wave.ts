/// <reference types="new-javascript/worklet/paint.d.ts" />

const conversionTable = {
    "deg:rad": (value: number) => (value * Math.PI) / 180,
    "rad:deg": (value: number) => (value * 180) / Math.PI,
} as const;

const to = (
    value: CSSStyleValue | undefined,
    unit: string,
): CSSUnitValue | undefined => {
    if (value == undefined) return undefined;
    if (typeof value === "object" && "to" in value)
        return (value as CSSUnitValue).to(unit);
    if (typeof value === "string") {
        const [, val, from] =
            /(-?\d*\.?\d+(?:[eE]\d+)?)([a-z%]*)/.exec(value) ?? [];
        const valueNum = parseFloat(val);

        if (from === unit) {
            return {
                unit,
                value: valueNum,
            } as CSSUnitValue;
        }

        const key = `${from}:${unit}` as keyof typeof conversionTable;

        if (key in conversionTable) {
            return {
                unit,
                value: conversionTable[key](valueNum),
            } as CSSUnitValue;
        }
    }
};

registerPaint(
    "wave",
    class {
        static get inputProperties() {
            return [
                "--phase",
                "--wavelength",
                "stroke",
                "stroke-linecap",
                "stroke-linejoin",
                "stroke-width",
            ];
        }

        paint(
            ctx: PaintRenderingContext2D,
            geom: PaintSize,
            properties: StylePropertyMapReadOnly,
        ) {
            ctx.strokeStyle =
                (properties.get("stroke") as string | undefined) ?? "black";
            ctx.lineCap =
                (properties.get("stroke-linecap") as
                    | CanvasLineCap
                    | undefined) ?? "butt";
            ctx.lineJoin =
                (properties.get("stroke-linejoin") as
                    | CanvasLineJoin
                    | undefined) ?? "miter";
            ctx.lineWidth =
                to(properties.get("stroke-width"), "px")?.value ?? 1;

            const phase =
                (to(properties.get("--phase"), "%")?.value ?? 0) / 100;
            const wavelength =
                to(properties.get("--wavelength"), "px")?.value ?? 100;
            const center = geom.height / 2;
            const height = geom.height - ctx.lineWidth;
            const width = Math.max(geom.width - ctx.lineWidth, 0);

            ctx.beginPath();

            for (let x = 0; x < width; x++) {
                const y =
                    center +
                    (height / 2) *
                        Math.sin((x / wavelength + phase) * 2 * Math.PI);

                if (x === 0) ctx.moveTo(x + ctx.lineWidth / 2, y);
                else ctx.lineTo(x + ctx.lineWidth / 2, y);
            }

            ctx.lineTo(
                width + ctx.lineWidth / 2,
                center +
                    (height / 2) *
                        Math.sin((width / wavelength + phase) * 2 * Math.PI),
            );

            ctx.stroke();
        }
    },
);
