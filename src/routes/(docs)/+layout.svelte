<script lang="ts">
    import type { LayoutProps } from "./$types.js";

    let { children }: LayoutProps = $props();
</script>

<div class="prose max-w-(--breakpoint-expanded) mx-auto w-full px-16 py-12">
    {@render children?.()}
</div>
