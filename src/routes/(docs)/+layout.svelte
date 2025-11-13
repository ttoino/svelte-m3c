<script lang="ts">
    import type { LayoutProps } from "./$types.js";

    let { children }: LayoutProps = $props();
</script>

<div class="prose mx-auto w-full max-w-(--breakpoint-expanded)">
    {@render children?.()}
</div>
