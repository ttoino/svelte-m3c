import { getLeafElements, getLines } from "$lib/elements.js";
import { assert, describe, test } from "vitest";

describe("get leaf elements", () => {
    test("empty tree", () => {
        const tree = document.createElement("div");

        assert.sameMembers(getLeafElements(tree), [tree]);
    });

    test("one level", () => {
        const tree = document.createElement("div");
        const leaf1 = document.createElement("div");
        tree.appendChild(leaf1);

        assert.sameMembers(getLeafElements(tree), [leaf1]);

        const leaf2 = document.createElement("div");
        tree.appendChild(leaf2);

        assert.sameMembers(getLeafElements(tree), [leaf1, leaf2]);
    });

    test("two levels", () => {
        const tree = document.createElement("div");
        const intermediate = document.createElement("div");
        const leaf1 = document.createElement("div");
        tree.appendChild(intermediate);
        intermediate.appendChild(leaf1);

        assert.sameMembers(getLeafElements(tree), [leaf1]);

        const leaf2 = document.createElement("div");
        tree.appendChild(leaf2);

        assert.sameMembers(getLeafElements(tree), [leaf1, leaf2]);
    });
});

describe("get lines", () => {
    test("no lines", () => {
        const tree = document.createElement("div");
        document.body.appendChild(tree);

        assert.equal(getLines(tree), 0);
    });

    test("one line", () => {
        const tree = document.createElement("div");
        const p1 = document.createElement("p");
        p1.textContent = "Some text";
        tree.appendChild(p1);
        document.body.appendChild(tree);

        assert.equal(getLines(tree), 1);
    });

    test("two lines", () => {
        const tree = document.createElement("div");
        const p1 = document.createElement("p");
        p1.textContent = "Some text";
        const p2 = document.createElement("p");
        p2.textContent = "Some more text";
        tree.append(p1, p2);
        document.body.appendChild(tree);

        assert.equal(getLines(tree), 2);
    });
});
