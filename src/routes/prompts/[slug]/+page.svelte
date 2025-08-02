<script>
	import PromptExplorer from '$lib/components/prompts/PromptExplorer.svelte';
	import PromptViewer from '$lib/components/prompts/PromptViewer.svelte';

	let { data } = $props();
</script>

<div class="flex h-[calc(100vh-310px)] overflow-hidden rounded-lg border border-border">
	<PromptExplorer currentSlug={data.currentSlug} />
	<PromptViewer prompt={data.prompt} />
</div>
