<script lang="ts">
    import { Button, Icon, Menu, MenuItem } from "$lib/index.js";
    import dedent from "dedent";

    import Title from "../../../Title.svelte";
    import Playground, { buttonGroupControl } from "../../Playground.svelte";
    import { renderComponentCode } from "../../renderCode.js";
</script>

<Title content="Menus" />

<!-- TODO -->

<Playground
    code={({ ...props }) =>
        renderComponentCode(
            "Menu",
            props,
            dedent`
                <MenuItem>
                    {#snippet leading()}
                        <Icon icon="edit" />
                    {/snippet}
                    {#snippet text()}
                        Edit
                    {/snippet}
                </MenuItem>
                <MenuItem>
                    {#snippet leading()}
                        <Icon icon="delete" />
                    {/snippet}
                    {#snippet text()}
                        Delete
                    {/snippet}
                </MenuItem>
                <Menu>
                    <MenuItem>
                        {#snippet leading()}
                            <Icon icon="link" />
                        {/snippet}
                        {#snippet text()}
                            Copy link
                        {/snippet}
                    </MenuItem>
                    <MenuItem>
                        {#snippet leading()}
                            <Icon icon="code" />
                        {/snippet}
                        {#snippet text()}
                            Embed
                        {/snippet}
                    </MenuItem>

                    {#snippet trigger({ props })}
                        <MenuItem {...props}>
                            {#snippet leading()}
                                <Icon icon="share" />
                            {/snippet}
                            {#snippet text()}
                                Share
                            {/snippet}
                            {#snippet trailing()}
                                <Icon icon="arrow_right" />
                            {/snippet}
                        </MenuItem>
                    {/snippet}
                </Menu>
                {#snippet trigger({ props })}
                    <Button {...props}>
                        I have a ${props.strategy} menu
                    </Button>
                {/snippet}
            `,
        )}
    controls={{
        strategy: buttonGroupControl("Strategy", {
            context: "Context",
            dropdown: "Dropdown",
        }),
    }}
    defaults={{
        strategy: "context" as "context" | "dropdown",
    }}
>
    {#snippet children({ strategy, ...props })}
        <Menu {strategy} {...props}>
            <MenuItem>
                {#snippet leading()}
                    <Icon icon="edit" />
                {/snippet}
                {#snippet text()}
                    Edit
                {/snippet}
            </MenuItem>
            <MenuItem>
                {#snippet leading()}
                    <Icon icon="delete" />
                {/snippet}
                {#snippet text()}
                    Delete
                {/snippet}
            </MenuItem>
            <Menu>
                <MenuItem>
                    {#snippet leading()}
                        <Icon icon="link" />
                    {/snippet}
                    {#snippet text()}
                        Copy link
                    {/snippet}
                </MenuItem>
                <MenuItem>
                    {#snippet leading()}
                        <Icon icon="code" />
                    {/snippet}
                    {#snippet text()}
                        Embed
                    {/snippet}
                </MenuItem>

                {#snippet trigger({ props })}
                    <MenuItem {...props}>
                        {#snippet leading()}
                            <Icon icon="share" />
                        {/snippet}
                        {#snippet text()}
                            Share
                        {/snippet}
                        {#snippet trailing()}
                            <Icon icon="arrow_right" />
                        {/snippet}
                    </MenuItem>
                {/snippet}
            </Menu>
            {#snippet trigger({ props })}
                <Button {...props}>
                    I have a {strategy} menu
                </Button>
            {/snippet}
        </Menu>
    {/snippet}
</Playground>

<!-- TODO -->
