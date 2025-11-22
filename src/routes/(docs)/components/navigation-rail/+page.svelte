<script lang="ts">
    import {
        NavigationRail,
        NavigationRailHeader,
        NavigationRailItem,
    } from "$lib/index.js";

    import Title from "../../../Title.svelte";
    import Playground, { switchControl } from "../../Playground.svelte";
    import { renderComponentCode } from "../../renderCode.js";
</script>

<Title content="Navigation rail" />

<!-- TODO -->

<Playground
    code={(props) =>
        renderComponentCode("NavigationRail", props, [
            renderComponentCode(
                "NavigationRailItem",
                { active: true, href: "#", icon: "inbox" },
                "Inbox",
            ),
            renderComponentCode("NavigationRailHeader", {}, "Folders"),
            renderComponentCode(
                "NavigationRailItem",
                { href: "#", icon: "send" },
                "Outbox",
            ),
            renderComponentCode(
                "NavigationRailItem",
                { href: "#", icon: "favorite" },
                "Favorites",
            ),
            renderComponentCode(
                "NavigationRailItem",
                { href: "#", icon: "report" },
                "Spam",
            ),
        ])}
    controls={{
        expanded: switchControl("Expanded"),
    }}
    defaults={{ expanded: false }}
>
    {#snippet children(props)}
        <NavigationRail {...props}>
            <NavigationRailItem active href="#" icon="inbox">
                Inbox
            </NavigationRailItem>
            <NavigationRailHeader>Folders</NavigationRailHeader>
            <NavigationRailItem href="#" icon="send">Outbox</NavigationRailItem>
            <NavigationRailItem href="#" icon="favorite">
                Favorites
            </NavigationRailItem>
            <NavigationRailItem href="#" icon="report">Spam</NavigationRailItem>
        </NavigationRail>
    {/snippet}
</Playground>

<!-- TODO -->
