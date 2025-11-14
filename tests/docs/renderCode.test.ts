import { assert, describe, test } from "vitest";

import {
    renderComponentCode,
    renderSnippetCode,
} from "../../src/routes/(docs)/renderCode.js";

describe("render component code", () => {
    test("just component name", () => {
        assert.equal(renderComponentCode("Component"), "<Component />");
    });

    test("string props", () => {
        assert.equal(
            renderComponentCode("Component", { key: "value" }),
            `<Component
    key="value"
/>`,
        );

        assert.equal(
            renderComponentCode("Component", {
                key1: "value1",
                key2: "value2",
            }),
            `<Component
    key1="value1"
    key2="value2"
/>`,
        );
    });

    test("boolean props", () => {
        assert.equal(
            renderComponentCode("Component", { key: false }),
            "<Component />",
        );

        assert.equal(
            renderComponentCode("Component", {
                key: true,
            }),
            `<Component
    key
/>`,
        );
    });

    test("other props", () => {
        assert.equal(
            renderComponentCode("Component", { key: undefined }),
            "<Component />",
        );

        assert.equal(
            renderComponentCode("Component", {
                key: null,
            }),
            `<Component
    key={null}
/>`,
        );

        assert.equal(
            renderComponentCode("Component", {
                key: 10,
            }),
            `<Component
    key={10}
/>`,
        );

        // TODO: Objects/arrays?
    });

    test("string children", () => {
        assert.equal(
            renderComponentCode("Component", {}, "child"),
            `<Component>
    child
</Component>`,
        );
        assert.equal(
            renderComponentCode("Component", {}, "child1\nchild2"),
            `<Component>
    child1
    child2
</Component>`,
        );
    });

    test("array children", () => {
        assert.equal(
            renderComponentCode("Component", {}, ["child"]),
            `<Component>
    child
</Component>`,
        );
        assert.equal(
            renderComponentCode("Component", {}, ["child1", "child2"]),
            `<Component>
    child1
    child2
</Component>`,
        );
        assert.equal(
            renderComponentCode("Component", {}, ["child1", "", "child2"]),
            `<Component>
    child1
    child2
</Component>`,
        );
    });
});

describe("render snippet code", () => {
    test("just snippet name", () => {
        assert.equal(renderSnippetCode("snip"), "{#snippet snip()}{/snippet}");
    });

    test("string children", () => {
        assert.equal(
            renderSnippetCode("snip", "child"),
            `{#snippet snip()}
    child
{/snippet}`,
        );
        assert.equal(
            renderSnippetCode("snip", "child1\nchild2"),
            `{#snippet snip()}
    child1
    child2
{/snippet}`,
        );
    });

    test("array children", () => {
        assert.equal(
            renderSnippetCode("snip", ["child"]),
            `{#snippet snip()}
    child
{/snippet}`,
        );
        assert.equal(
            renderSnippetCode("snip", ["child1", "child2"]),
            `{#snippet snip()}
    child1
    child2
{/snippet}`,
        );
        assert.equal(
            renderSnippetCode("snip", ["child1", "", "child2"]),
            `{#snippet snip()}
    child1
    child2
{/snippet}`,
        );
    });

    test("with args", () => {
        assert.equal(
            renderSnippetCode("snip", undefined, "arg"),
            "{#snippet snip(arg)}{/snippet}",
        );
        assert.equal(
            renderSnippetCode("snip", undefined, "arg1, arg2"),
            "{#snippet snip(arg1, arg2)}{/snippet}",
        );
    });
});
