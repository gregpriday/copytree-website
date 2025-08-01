<!-- src/app/+layout.svelte -->
<script lang="ts">
	import '../app.css';
</script>

<svelte:head>
	<title>SvelteKit App</title>
	<meta name="description" content="SvelteKit with Svelte 5 and Tailwind 4" />
</svelte:head>

<main class="min-h-screen bg-gray-50">
	<slot />
</main>