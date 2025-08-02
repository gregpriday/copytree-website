<script>
	import PromptsHero from '$lib/components/prompts/PromptsHero.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>AI System Prompts - CopyTree</title>
	<meta
		name="description"
		content="Optimized system prompts for AI coding agents. Copy and adapt prompts for Claude, ChatGPT, Grok, and Gemini to enhance your development workflow."
	/>
</svelte:head>

<PromptsHero />
<div class="max-w-container mx-auto px-6 py-8 md:px-9">
	{@render children?.()}
</div>
