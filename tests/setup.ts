import "./index.css";

export default async () => {
    document.documentElement.style.colorScheme = "light";
    await document.fonts.ready;
};
