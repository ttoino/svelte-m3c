import { cartesian } from "$lib/array.js";
import { describe, test } from "vitest";

describe("cartesian product", () => {
    test("empty input", ({ expect }) => {
        expect(cartesian()).toEqual([]);
    });

    test("one array", ({ expect }) => {
        expect(cartesian([])).toEqual([]);

        expect(cartesian([1])).toEqual([[1]]);

        expect(cartesian([1, 2])).toEqual([[1], [2]]);
    });

    test("two arrays", ({ expect }) => {
        expect(cartesian([], [])).toEqual([]);

        expect(cartesian([1], ["a"])).toEqual([[1, "a"]]);

        const result = cartesian([1, 2], ["a", "b"]);
        const expected = [
            [1, "a"],
            [1, "b"],
            [2, "a"],
            [2, "b"],
        ];
        expect(result).toHaveLength(expected.length);
        expect(result).toEqual(expect.arrayContaining(expected));
    });

    test("three arrays", ({ expect }) => {
        expect(cartesian([], [], [])).toEqual([]);

        expect(cartesian([1], ["a"], ["A"])).toEqual([[1, "a", "A"]]);

        const result = cartesian([1, 2], ["a", "b"], ["A", "B"]);
        const expected = [
            [1, "a", "A"],
            [1, "a", "B"],
            [1, "b", "A"],
            [1, "b", "B"],
            [2, "a", "A"],
            [2, "a", "B"],
            [2, "b", "A"],
            [2, "b", "B"],
        ];
        expect(result).toHaveLength(expected.length);
        expect(result).toEqual(expect.arrayContaining(expected));
    });

    test("four arrays", ({ expect }) => {
        expect(cartesian([], [], [], [])).toEqual([]);

        expect(cartesian([1], ["a"], ["A"], [false])).toEqual([
            [1, "a", "A", false],
        ]);

        const result = cartesian([1, 2], ["a", "b"], ["A", "B"], [false, true]);
        const expected = [
            [1, "a", "A", false],
            [1, "a", "A", true],
            [1, "a", "B", false],
            [1, "a", "B", true],
            [1, "b", "A", false],
            [1, "b", "A", true],
            [1, "b", "B", false],
            [1, "b", "B", true],
            [2, "a", "A", false],
            [2, "a", "A", true],
            [2, "a", "B", false],
            [2, "a", "B", true],
            [2, "b", "A", false],
            [2, "b", "A", true],
            [2, "b", "B", false],
            [2, "b", "B", true],
        ];
        expect(result).toHaveLength(expected.length);
        expect(result).toEqual(expect.arrayContaining(expected));
    });
});
