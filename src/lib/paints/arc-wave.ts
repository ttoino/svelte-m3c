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
    "arc-wave",
    class {
        static get inputProperties() {
            return [
                "--phase",
                "--wavelength",
                "--amplitude",
                "--start-angle",
                "--end-angle",
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
            const amplitude =
                to(properties.get("--amplitude"), "px")?.value ?? 2;

            const startAngle =
                to(properties.get("--start-angle"), "rad")?.value ?? 0;
            const endAngle =
                to(properties.get("--end-angle"), "rad")?.value ?? Math.PI * 2;

            const centerX = geom.width / 2;
            const centerY = geom.height / 2;
            const radius =
                (Math.min(geom.width, geom.height) -
                    ctx.lineWidth -
                    amplitude) /
                2;
            const circumference = 2 * Math.PI * radius;

            console.log(circumference);

            ctx.beginPath();

            for (let angle = startAngle; angle < endAngle; angle += 0.01) {
                const r =
                    radius +
                    (amplitude / 2) *
                        Math.sin(
                            (angle * circumference) / wavelength +
                                phase * 2 * Math.PI,
                        );
                const x = centerX + r * Math.cos(angle);
                const y = centerY + r * Math.sin(angle);

                if (angle === startAngle) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }

            const r =
                radius +
                (amplitude / 2) *
                    Math.sin(
                        (endAngle * circumference) / wavelength +
                            phase * 2 * Math.PI,
                    );
            const x = centerX + r * Math.cos(endAngle);
            const y = centerY + r * Math.sin(endAngle);

            ctx.lineTo(x, y);

            ctx.stroke();
        }
    },
);
