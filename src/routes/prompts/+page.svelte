<script>
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	let { data } = $props();

	// Redirect to the first prompt on client-side
	$effect(() => {
		if (browser && data.prompts && data.prompts.length > 0) {
			goto(`/prompts/${data.prompts[0].slug}`, { replaceState: true });
		}
	});
</script>

<div class="container mx-auto px-6 py-12">
	<h1 class="mb-6 text-3xl font-bold">Prompts</h1>
	<p>Loading prompts...</p>
</div>
