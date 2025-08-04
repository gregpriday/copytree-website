<script>
	import PromptCodeViewer from './PromptCodeViewer.svelte';
	import CopyButton from './CopyButton.svelte';

	/** @type {{ prompt: import('$lib/prompts/prompts-config.js').PromptConfig }} */
	let { prompt } = $props();
</script>

<!-- Content Panel -->
<section class="flex min-w-0 flex-1 flex-col">
	<!-- Content header card -->
	<div
		class="sticky top-0 z-10 border-b border-border/60 bg-background/70 px-5 py-4 backdrop-blur-xl"
	>
		<div class="flex items-start justify-between gap-4">
			<div class="min-w-0">
				<h1 class="truncate text-lg font-semibold text-foreground">{prompt.title}</h1>
				{#if prompt.description}
					<p class="mt-1 line-clamp-2 text-sm text-muted-foreground">{prompt.description}</p>
				{/if}
				<!-- tags if present -->
				{#if prompt.tags}
					<div class="mt-2 flex flex-wrap gap-1.5">
						{#each prompt.tags as tag (tag)}
							<span
								class="rounded-md border border-border/60 bg-background/60 px-2 py-0.5 text-[11px] text-muted-foreground"
							>
								{tag}
							</span>
						{/each}
					</div>
				{/if}
			</div>
			<div class="flex shrink-0 items-center gap-2">
				<CopyButton content={prompt.content} />
			</div>
		</div>
	</div>

	<!-- Code viewer card -->
	<div class="flex-1 overflow-hidden">
		<div class="h-full">
			<!-- code header row -->
			<div
				class="flex items-center justify-between border-b border-border/60 bg-background/60 px-4 py-2 text-xs"
			>
				<div class="flex items-center gap-2 text-muted-foreground">
					<span
						class="inline-flex items-center gap-1 rounded border border-border/60 bg-background/60 px-2 py-0.5"
					>
						<span class="h-2 w-2 rounded-full bg-emerald-500/80"></span> Markdown
					</span>
					<span class="hidden text-muted-foreground md:inline">Read-only</span>
				</div>
				<div class="md:hidden">
					<!-- extra copy button on small screens -->
					<CopyButton content={prompt.content} />
				</div>
			</div>
			<PromptCodeViewer code={prompt.content} language="markdown" />
		</div>
	</div>
</section>
