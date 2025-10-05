<script>
	import { browser } from '$app/environment';

	/** @type {{ code: string, language?: string, showLineNumbers?: boolean }} */
	let { code, language = 'markdown', showLineNumbers = false } = $props();

	// Progressive enhancement state
	let highlightedHtml = $state('');
	let isHighlighting = $state(true);
	let highlightingError = $state(false);

	// Derived values for line numbers
	const lines = $derived(code ? code.trim().split('\n') : []);
	const lineCount = $derived(lines.length);

	// HTML escaping utility (mirror CodeBlock)
	/** @param {string} text */
	function escapeHtml(text) {
		/** @type {Record<string, string>} */
		const map = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#039;'
		};
		return text.replace(/[&<>"']/g, (m) => map[m]);
	}

	// Async Shiki highlighting (client-only)
	async function highlight() {
		const content = (code ?? '').trim();
		if (!content) {
			isHighlighting = false;
			return;
		}
		try {
			const { codeToHtml } = await import('shiki');

			const html = await codeToHtml(content, {
				lang: language || 'markdown',
				theme: 'github-dark',
				transformers: [
					{
						pre(node) {
							delete node.properties.style;
							node.properties.class = 'shiki-pre';
						},
						code(node) {
							node.properties.class = 'shiki-code block font-mono';
						},
						line(node) {
							node.properties.class = 'shiki-line';
						},
						span(node) {
							if (node.properties.style) {
								const style = /** @type {string} */ (node.properties.style);
								const colorMatch = style.match(/color:(#[0-9a-fA-F]+)/);
								if (colorMatch) {
									node.properties.style = `color:${colorMatch[1]}`;
								}
							}
						}
					}
				]
			});

			highlightedHtml = html;
			highlightingError = false;
		} catch (err) {
			console.warn('Failed to highlight prompt content:', err);
			// Fallback: keep plain text
			highlightedHtml = '';
			highlightingError = true;
		} finally {
			isHighlighting = false;
		}
	}

	// Trigger highlight on client and when code changes
	$effect(() => {
		if (browser) {
			highlight();
		}
	});
</script>

<!-- Code surface (aligned with CodeBlock dark background) -->
<div class="relative h-full overflow-hidden bg-[rgb(13,13,13)]">
	<div class="h-full overflow-y-auto">
		<div class="flex text-sm">
			<!-- Line numbers column (optional) -->
			{#if showLineNumbers}
				<div class="sticky left-0 flex-shrink-0 select-none bg-[rgb(13,13,13)] px-3 py-3 md:px-4 md:py-4">
					<pre class="m-0 font-mono text-zinc-500">{#each Array(lineCount) as _, i}<div class="leading-relaxed">{i + 1}</div>{/each}</pre>
				</div>
			{/if}
			
			<!-- Code content -->
			<div class="min-w-0 flex-1 px-3 py-3 md:px-4 md:py-4">
				<div class="font-mono">
					{#if isHighlighting || !highlightedHtml}
						<!-- Immediate plain, escaped text -->
						<pre
							class="!m-0 !p-0 font-mono leading-relaxed text-zinc-300"
							style="background: transparent; white-space: pre-wrap; word-break: break-word;">{escapeHtml(
								(code ?? '').trim()
							)}</pre>
						{#if highlightingError}
							<div class="mt-2 text-xs text-amber-500">Plain text mode</div>
						{/if}
					{:else}
						<!-- Highlighted HTML -->
						<div class="shiki-container">
							{@html highlightedHtml}
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	/* Ensure proper styling for syntax highlighted content (aligned with CodeBlock) */
	:global(.shiki-pre) {
		background: transparent !important;
		margin: 0 !important;
		padding: 0 !important;
	}

	:global(.shiki-code) {
		background: transparent !important;
		/* Ensure wrapping behavior matches plain <pre> */
		white-space: pre-wrap !important;
		word-break: break-word !important;
	}

	:global(.shiki-line) {
		line-height: 1.75; /* Match leading-relaxed */
		/* Allow long lines to wrap */
		white-space: pre-wrap !important;
		word-break: break-word !important;
		display: block;
	}

	/* Container font to match rest of app */
	:global(.shiki-container) {
		font-family:
			ui-monospace, SFMono-Regular, 'SF Mono', Monaco, Consolas, 'Liberation Mono', 'Courier New',
			monospace;
		/* Ensure container doesn't constrain wrapping */
		white-space: normal;
	}

	/* Line number styling consistency */
	:global(.shiki-container .shiki-line) {
		min-height: 1.75rem; /* Ensure consistent height with line numbers */
	}
</style>