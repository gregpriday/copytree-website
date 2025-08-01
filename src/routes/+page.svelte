<!-- src/app/+page.svelte -->
<script lang="ts">
	export let data;
</script>

<div class="container mx-auto px-4 py-8">
	<h1 class="text-4xl font-bold text-gray-900 mb-4">Welcome to SvelteKit</h1>
	<p class="text-lg text-gray-700 mb-2">This is a SvelteKit project with Svelte 5 and Tailwind 4.</p>
	<p class="text-lg text-gray-700">{data.message}</p>
	
	<div class="mt-8 p-6 bg-white rounded-lg shadow-md">
		<h2 class="text-2xl font-semibold text-gray-800 mb-3">Features</h2>
		<ul class="list-disc list-inside space-y-2 text-gray-600">
			<li>Svelte 5 with runes</li>
			<li>Tailwind CSS 4</li>
			<li>TypeScript support</li>
			<li>Vite for building</li>
		</ul>
	</div>
</div>