import {
    themeFromImage,
    themeFromSourceColor,
    type Theme,
} from "@material/material-color-utilities";

const LEVELS = [
    0, 4, 5, 6, 10, 12, 15, 17, 20, 22, 25, 30, 35, 40, 50, 60, 70, 80, 90, 92,
    94, 95, 96, 98, 99, 100,
];

// Not very resilient, but that's fine
const kebabify = (str: string) => str.replace(/([A-Z])/g, "-$1").toLowerCase();

const toCssColor = (color: number) =>
    (color & 0xffffff).toString(16).padStart(6, "0");

const fromCssColor = (color: string) => {
    if (color.startsWith("#")) color = color.slice(1);
    if (color.length === 3)
        color = color
            .split("")
            .map((c) => c + c)
            .join("");
    if (color.length !== 6) throw new Error("Invalid color");
    return 0xff000000 + parseInt(color, 16);
};

const tailwindPaletteFromTheme = (theme: Theme, levels = LEVELS) =>
    Object.fromEntries(
        Object.entries(theme.palettes).map(([k, p]) => [
            kebabify(k),
            Object.fromEntries(
                levels.map((v) => [v, `#${toCssColor(p.tone(v))}`]),
            ),
        ]),
    );

const cssPaletteFromTheme = (theme: Theme, levels = LEVELS) =>
    Object.entries(theme.palettes)
        .flatMap(([k, p]) =>
            levels.map(
                (v) =>
                    `--color-${kebabify(k)}-${v.toString()}: #${toCssColor(p.tone(v))}`,
            ),
        )
        .join(";");

export const tailwindPaletteFromColor = (color: number | string) => {
    if (typeof color === "string") color = fromCssColor(color);

    const theme = themeFromSourceColor(color);

    return tailwindPaletteFromTheme(theme);
};

export const cssPaletteFromColor = (color: number | string) => {
    if (typeof color === "string") color = fromCssColor(color);

    const theme = themeFromSourceColor(color);

    return cssPaletteFromTheme(theme);
};

export const tailwindPaletteFromImage = async (
    image: string | HTMLImageElement,
) => {
    if (typeof image === "string") {
        const img = new Image();
        img.src = image;
        img.crossOrigin = "";
        image = img;
    }

    const theme = await themeFromImage(image);

    return tailwindPaletteFromTheme(theme);
};

export const cssPaletteFromImage = async (image: string | HTMLImageElement) => {
    if (typeof image === "string") {
        const img = new Image();
        img.src = image;
        img.crossOrigin = "";
        image = img;
    }

    const theme = await themeFromImage(image);

    return cssPaletteFromTheme(theme);
};

