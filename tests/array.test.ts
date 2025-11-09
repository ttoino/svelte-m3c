import { cartesian } from "$lib/array.js";
import { assert, describe, test } from "vitest";

describe("cartesian product", () => {
    test("empty input", () => {
        assert.sameDeepMembers(cartesian(), []);
    });

    test("one array", () => {
        assert.sameDeepMembers(cartesian([]), []);

        assert.sameDeepMembers(cartesian([1]), [[1]]);

        assert.sameDeepMembers(cartesian([1, 2]), [[1], [2]]);
    });

    test("two arrays", () => {
        assert.sameDeepMembers(cartesian([], []), []);

        assert.sameDeepMembers(cartesian([1], ["a"]), [[1, "a"]]);

        assert.sameDeepMembers(cartesian([1, 2], ["a", "b"]), [
            [1, "a"],
            [1, "b"],
            [2, "a"],
            [2, "b"],
        ]);
    });

    test("three arrays", () => {
        assert.sameDeepMembers(cartesian([], [], []), []);

        assert.sameDeepMembers(cartesian([1], ["a"], ["A"]), [[1, "a", "A"]]);

        assert.sameDeepMembers(cartesian([1, 2], ["a", "b"], ["A", "B"]), [
            [1, "a", "A"],
            [1, "a", "B"],
            [1, "b", "A"],
            [1, "b", "B"],
            [2, "a", "A"],
            [2, "a", "B"],
            [2, "b", "A"],
            [2, "b", "B"],
        ]);
    });

    test("four arrays", () => {
        assert.sameDeepMembers(cartesian([], [], [], []), []);

        assert.sameDeepMembers(cartesian([1], ["a"], ["A"], [false]), [
            [1, "a", "A", false],
        ]);

        assert.sameDeepMembers(
            cartesian([1, 2], ["a", "b"], ["A", "B"], [false, true]),
            [
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
            ],
        );
    });
});
