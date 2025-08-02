<script>
	import PromptCodeViewer from './PromptCodeViewer.svelte';
	import CopyButton from './CopyButton.svelte';

	/** @type {{ prompt: import('$lib/prompts/prompts-config.js').PromptConfig }} */
	let { prompt } = $props();
</script>

<div class="flex h-full min-w-0 flex-1 flex-col">
	<!-- Header -->
	<div class="sticky top-0 z-10 border-b border-border bg-muted/50 px-6 py-3">
		<div class="flex items-center justify-between gap-4">
			<div class="min-w-0 flex-1">
				<h1 class="text-xl font-semibold text-foreground">{prompt.title}</h1>
				<p class="mt-1 text-sm text-muted-foreground">{prompt.description}</p>
			</div>
			<CopyButton content={prompt.content} />
		</div>
	</div>

	<!-- Code editor area -->
	<div class="flex-1 overflow-hidden">
		<PromptCodeViewer code={prompt.content} language="markdown" />
	</div>
</div>
