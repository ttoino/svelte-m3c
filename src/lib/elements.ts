export const getLeafElements = (element: Element): Element[] => {
    if (element.children.length === 0) return [element];

    return [...element.children].flatMap(getLeafElements);
};

export const getLines = (element: Element): number => {
    const rects = getLeafElements(element).flatMap((el) => [
        ...el.getClientRects(),
    ]);

    const lines: [number, number][] = [];

    for (const rect of rects) {
        const line = lines.find(
            ([top, bottom]) =>
                (top <= rect.top && rect.top <= bottom) ||
                (top <= rect.bottom && rect.bottom <= bottom) ||
                (rect.top <= top && bottom <= rect.bottom),
        );
        if (line) {
            line[0] = Math.min(line[0], rect.top);
            line[1] = Math.max(line[1], rect.bottom);
        } else {
            lines.push([rect.top, rect.bottom]);
        }
    }

    return lines.length;
};
