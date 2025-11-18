<script lang="ts">
    import { Button, Icon, SplitButton } from "$lib/index.js";

    import Thumbnail from "../Thumbnail.svelte";
</script>

<Thumbnail class="px-16">
    <SplitButton size="large">
        <Button>
            <Icon icon="shopping_cart" />
            Add to cart
        </Button>
    </SplitButton>
</Thumbnail>
