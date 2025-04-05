<script lang="ts">
    import type { PageProps } from "./$types.js";

    let { data }: PageProps = $props();

    let { component: Component, title } = $derived(data);
</script>

<svelte:head>
    {#if title}
        <title>{title}</title>
    {/if}
</svelte:head>

<div
    class="prose bg-surface-container max-w-(--breakpoint-large) mx-auto w-full rounded-xl px-16 py-12"
>
    <Component />
</div>
