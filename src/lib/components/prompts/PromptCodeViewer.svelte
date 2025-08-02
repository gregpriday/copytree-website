<script>
	import { browser } from '$app/environment';
	import { createHighlighter } from 'shiki';

	/** @type {{ code: string, language?: string }} */
	let { code, language = 'markdown' } = $props();

	let highlightedCode = $state('');
	let isLoading = $state(true);
	/** @type {string | null} */
	let error = $state(null);

	// Create highlighter instance only on client side
	/** @type {any} */
	let highlighter = $state(null);

	// Initialize Shiki highlighter
	$effect(() => {
		if (!browser) return;

		const initializeShiki = async () => {
			try {
				isLoading = true;
				error = null;

				if (!highlighter) {
					highlighter = await createHighlighter({
						themes: ['github-dark'],
						langs: [
							'markdown',
							'typescript',
							'javascript',
							'json',
							'yaml',
							'xml',
							'html',
							'css',
							'shell',
							'bash',
							'python',
							'java',
							'go',
							'rust',
							'php',
							'sql',
							'dockerfile',
							'svelte'
						]
					});
				}

				// Highlight the code with consistent dark theme
				highlightedCode = highlighter.codeToHtml(code, {
					lang: language,
					theme: 'github-dark'
				});
			} catch (err) {
				console.error('Failed to highlight code:', err);
				error = err instanceof Error ? err.message : 'Failed to highlight code';
			} finally {
				isLoading = false;
			}
		};

		initializeShiki();
	});
</script>

<div class="h-full overflow-y-auto p-4 text-sm" style="background-color: rgb(13 13 13);">
	{#if isLoading}
		<!-- Loading state with skeleton -->
		<div class="animate-pulse space-y-2">
			{#each Array(5) as _}
				<div class="h-4 w-full rounded bg-zinc-800"></div>
				<div class="h-4 w-3/4 rounded bg-zinc-800"></div>
				<div class="h-4 w-5/6 rounded bg-zinc-800"></div>
			{/each}
		</div>
	{:else if error}
		<!-- Error fallback -->
		<div class="mb-2 text-sm text-red-400">
			Failed to load syntax highlighting: {error}
		</div>
		<pre class="font-mono break-words whitespace-pre-wrap text-zinc-300">{code}</pre>
	{:else if highlightedCode}
		<!-- Highlighted code -->
		<div class="shiki-container">
			{@html highlightedCode}
		</div>
	{:else}
		<!-- Fallback to plain text -->
		<pre class="font-mono break-words whitespace-pre-wrap text-zinc-300">{code}</pre>
	{/if}
</div>

<style>
	/* Override Shiki styles to match our theme */
	:global(.shiki-container) {
		font-family:
			ui-monospace, SFMono-Regular, 'SF Mono', Monaco, Consolas, 'Liberation Mono', 'Courier New',
			monospace;
	}

	:global(.shiki) {
		background: transparent !important;
		padding: 0;
		margin: 0;
		font-size: inherit;
		line-height: 1.5;
		overflow: visible;
	}

	:global(.shiki code) {
		background: transparent !important;
		padding: 0;
		margin: 0;
		white-space: pre-wrap;
		word-break: break-word;
		font-size: inherit;
		font-family: inherit;
	}

	:global(.shiki pre) {
		background: transparent !important;
		padding: 0;
		margin: 0;
		white-space: pre-wrap;
		word-break: break-word;
		overflow: visible;
	}

	/* Apply consistent dark theme styling */
	:global(.shiki) {
		background: rgb(13 13 13) !important; /* zinc-950 equivalent */
	}
</style>
