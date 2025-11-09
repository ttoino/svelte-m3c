import { mergeVariants } from "$lib/style.js";
import { assert, describe, test } from "vitest";

describe("mergeVariants", () => {
    test("primitives", () => {
        assert.deepEqual(mergeVariants("test"), "test");

        assert.deepEqual(mergeVariants("test1", "test2"), ["test1", "test2"]);
    });

    test("arrays", () => {
        assert.deepEqual(mergeVariants([]), []);
        assert.deepEqual(mergeVariants([], []), []);

        assert.deepEqual(mergeVariants(["test1", "test2"]), ["test1", "test2"]);

        assert.deepEqual(
            mergeVariants(["test1", "test2"], ["test3", "test4"]),
            ["test1", "test2", "test3", "test4"],
        );
    });

    test("objects", () => {
        assert.deepEqual(mergeVariants({}), {});
        assert.deepEqual(mergeVariants({}, {}), {});

        assert.deepEqual(mergeVariants({ a: "test" }), { a: "test" });
        assert.deepEqual(mergeVariants({ a: "test1" }, { a: "test2" }), {
            a: ["test1", "test2"],
        });
        assert.deepEqual(mergeVariants({ a: "test1" }, { b: "test2" }), {
            a: "test1",
            b: "test2",
        });
    });
});
