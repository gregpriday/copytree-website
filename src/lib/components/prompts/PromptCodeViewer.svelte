<script>
	import { browser } from '$app/environment';

	/** @type {{ code: string, language?: string }} */
	let { code, language = 'markdown' } = $props();

	// Progressive enhancement state
	let highlightedHtml = $state('');
	let isHighlighting = $state(true);
	let highlightingError = $state(false);

	// HTML escaping utility (mirror CodeBlock)
	/** @param {string} text */
	function escapeHtml(text) {
		/** @type {Record<string, string>} */
		const map = {
			'&': '&',
			'<': '<',
			'>': '>',
			'"': '"',
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
			// Fallback: keep plain text (we still set an escaped html version to keep structure)
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

<!-- Code surface (force dark background for editor area) -->
<div class="h-full overflow-y-auto bg-[rgb(13,13,13)] p-3 text-sm md:p-4">
	<!-- Progressive rendering: show plain text immediately, replace asynchronously -->
	<div class="font-mono">
		{#if isHighlighting || !highlightedHtml}
			<!-- Immediate plain, escaped text. Preserves whitespace and wrapping similar to docs CodeBlock -->
			<pre
				class="!m-0 !p-0 font-mono text-zinc-300"
				style="background: transparent; white-space: pre-wrap; word-break: break-word; line-height: 1.5;">{escapeHtml(
					(code ?? '').trim()
				)}</pre>
			{#if highlightingError}
				<div class="mt-2 text-xs text-amber-500">Plain text</div>
			{/if}
		{:else}
			<!-- Highlighted HTML -->
			<div class="shiki-container">
				{@html highlightedHtml}
			</div>
		{/if}
	</div>
</div>

<style>
	/* Ensure proper styling for syntax highlighted content (align with CodeBlock) */
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
		line-height: 1.5;
		/* Allow long lines to wrap */
		white-space: pre-wrap !important;
		word-break: break-word !important;
	}

	/* Container font to match rest of app */
	:global(.shiki-container) {
		font-family:
			ui-monospace, SFMono-Regular, 'SF Mono', Monaco, Consolas, 'Liberation Mono', 'Courier New',
			monospace;
		/* Ensure container doesn't constrain wrapping */
		white-space: normal;
	}
</style>
