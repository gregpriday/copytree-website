<script>
	import { Copy, Check } from 'lucide-svelte';
	import { browser } from '$app/environment';

	/** @type {{ code: string, language?: string, filename?: string, showLineNumbers?: boolean, animate?: boolean, animationSpeed?: number, animationDelay?: number, glow?: boolean, scrollable?: boolean }} */
	let {
		code,
		language = 'bash',
		filename,
		showLineNumbers = false,
		animate = false,
		animationSpeed = 30,
		animationDelay = 0,
		glow = false,
		scrollable = false
	} = $props();

	// State management using Svelte 5 runes
	let copied = $state(false);
	let displayedCode = $state(animate ? '' : code);
	let isAnimating = $state(false);
	let hasAnimated = $state(!animate);
	let highlightedHtml = $state('');
	let isHighlighting = $state(true);
	let highlightingError = $state(false);

	// Element references
	/** @type {HTMLDivElement} */
	let codeRef;
	/** @type {ReturnType<typeof setTimeout> | null} */
	let animationTimeout = null;
	/** @type {IntersectionObserver | null} */
	let intersectionObserver = null;

	// Derived values
	const shouldShowAnimated = $derived(animate && !hasAnimated);
	const lines = $derived(code.trim().split('\n'));
	const codeToDisplay = $derived(
		shouldShowAnimated ? (browser ? displayedCode : code.trim()) : code.trim()
	);

	// Copy functionality
	async function handleCopy() {
		try {
			await navigator.clipboard.writeText(code.trim());
			copied = true;
			setTimeout(() => (copied = false), 2000);
		} catch (error) {
			console.error('Failed to copy code:', error);
		}
	}

	// HTML escaping utility
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

	// Shiki syntax highlighting
	async function highlightCode() {
		if (!code.trim()) {
			isHighlighting = false;
			return;
		}

		try {
			// Dynamic import of Shiki
			const { codeToHtml } = await import('shiki');

			const html = await codeToHtml(code.trim(), {
				lang: language,
				theme: 'github-dark',
				transformers: [
					{
						pre(node) {
							// Remove default shiki styles and classes
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
							// Preserve color styling for syntax highlighting
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
		} catch (error) {
			console.warn(`Failed to highlight ${language} code:`, error);
			// Fallback to escaped HTML
			highlightedHtml = `<div class="shiki-pre"><div class="shiki-code block font-mono">${lines.map((line, i) => `<div class="shiki-line">${escapeHtml(line) || ' '}</div>`).join('')}</div></div>`;
			highlightingError = true;
		} finally {
			isHighlighting = false;
		}
	}

	// Animation logic
	function animateTyping() {
		if (!animate || hasAnimated) return;

		let currentIndex = 0;
		isAnimating = true;

		const typeNextChar = () => {
			if (currentIndex <= code.length) {
				displayedCode = code.substring(0, currentIndex);
				currentIndex++;
				if (currentIndex <= code.length) {
					animationTimeout = setTimeout(typeNextChar, animationSpeed);
				} else {
					isAnimating = false;
				}
			}
		};

		typeNextChar();
	}

	// Setup intersection observer for animation
	function setupIntersectionObserver() {
		if (!animate || hasAnimated || !codeRef) return;

		intersectionObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !hasAnimated) {
						setTimeout(() => {
							animateTyping();
						}, animationDelay);
						hasAnimated = true;
					}
				});
			},
			{ threshold: 0.1 }
		);

		intersectionObserver.observe(codeRef);
	}

	// Cleanup function
	function cleanup() {
		if (intersectionObserver && codeRef) {
			intersectionObserver.unobserve(codeRef);
			intersectionObserver = null;
		}
		if (animationTimeout) {
			clearTimeout(animationTimeout);
			animationTimeout = null;
		}
	}

	// Lifecycle effects
	$effect(() => {
		// Start syntax highlighting only on the client
		if (browser) {
			highlightCode();
		}

		// Setup animation observer
		setupIntersectionObserver();

		// Cleanup on unmount
		return cleanup;
	});

	// Watch for code changes
	$effect(() => {
		if (browser && code) {
			highlightCode();
		}
	});

	// Watch for animation setup
	$effect(() => {
		if (codeRef && animate && !hasAnimated) {
			setupIntersectionObserver();
		}
	});
</script>

<div bind:this={codeRef} class="not-prose relative {glow ? 'group/code' : 'group'} my-6">
	<!-- Glow effect - always rendered to prevent flash -->
	<div
		class="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 blur-2xl transition-opacity duration-300 ease-in-out {glow
			? 'opacity-0 group-hover/code:opacity-50'
			: 'pointer-events-none opacity-0'}"
		style="z-index: -1"
	></div>

	<!-- Container -->
	<div
		class="relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50 shadow-lg backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-950/50 dark:shadow-none"
	>
		<!-- Terminal header -->
		<div
			class="flex items-center justify-between border-b border-zinc-700 bg-zinc-800 px-4 py-2 dark:border-zinc-800 dark:bg-zinc-900"
		>
			<div class="flex items-center gap-3">
				<!-- macOS-style window controls -->
				<div class="flex gap-1.5">
					<div class="h-3 w-3 rounded-full bg-red-500/80"></div>
					<div class="h-3 w-3 rounded-full bg-yellow-500/80"></div>
					<div class="h-3 w-3 rounded-full bg-green-500/80"></div>
				</div>

				<!-- File info -->
				{#if filename}
					<span class="font-mono text-xs text-zinc-400">{filename}</span>
				{:else if language}
					<span class="text-xs font-medium text-zinc-400">{language}</span>
				{/if}

				{#if highlightingError}
					<span class="text-xs text-amber-500">Plain text</span>
				{/if}
			</div>

			<!-- Copy button -->
			<button
				onclick={handleCopy}
				class="flex items-center gap-2 rounded px-2 py-1 text-xs text-zinc-400 transition-colors duration-200 hover:text-zinc-200 focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:outline-none"
				aria-label="Copy code"
			>
				{#if copied}
					<Check class="h-4 w-4 text-emerald-400" />
					<span class="text-emerald-400">Copied!</span>
				{:else}
					<Copy class="h-4 w-4" />
					<span>Copy</span>
				{/if}
			</button>
		</div>

		<!-- Code Content -->
		<div class="bg-zinc-950 {scrollable ? 'max-h-[70vh] overflow-auto' : 'overflow-x-auto'}">
			<div class="min-h-[50px] p-4 text-sm">
				{#if shouldShowAnimated}
					<!-- Animated content with basic styling -->
					<pre class="font-mono">{#if showLineNumbers}{#each lines as line, i}<div class="flex"><span class="mr-4 w-8 text-right font-mono text-zinc-500 tabular-nums select-none">{i + 1}</span><span class="text-zinc-300">{line || ' '}{#if isAnimating && i === lines.length - 1}<span class="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-emerald-400 align-text-bottom"></span>{/if}</span></div>{/each}{:else}<span class="text-zinc-300">{codeToDisplay}{#if isAnimating}<span class="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-emerald-400 align-text-bottom"></span>{/if}</span>{/if}</pre>
				{:else}
					<!-- Always show content, either plain or highlighted -->
					<!-- Simple, clean fallback that works in all cases -->
					{#if highlightedHtml && !isHighlighting}
						<!-- Highlighted code -->
						<div class="font-mono {showLineNumbers ? 'line-numbers' : ''}">
							{#if showLineNumbers}
								{@html highlightedHtml
									.replace(/<pre[^>]*><code[^>]*>/g, '')
									.replace(/<\/code><\/pre>/g, '')
									.split('\n')
									.map(
										(line, i) =>
											`<div class="flex"><span class="text-zinc-500 mr-4 select-none w-8 text-right font-mono tabular-nums">${i + 1}</span><span class="flex-1">${line || ' '}</span></div>`
									)
									.join('')}
							{:else}
								{@html highlightedHtml}
							{/if}
						</div>
					{:else}
						<!-- Basic pre block - no complex conditionals -->
						<pre class="font-mono whitespace-pre-wrap text-zinc-300" style="line-height: 1.5">{code.trim()}</pre>
					{/if}
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	/* Ensure proper styling for syntax highlighted content */
	:global(.shiki-pre) {
		background: transparent !important;
		margin: 0 !important;
		padding: 0 !important;
	}

	:global(.shiki-code) {
		background: transparent !important;
	}

	:global(.shiki-line) {
		line-height: 1.5;
	}

	/* Line numbers styling when not using showLineNumbers prop */
	:global(.line-numbers .shiki-line) {
		display: flex;
	}

	:global(.line-numbers .shiki-line::before) {
		content: counter(line);
		counter-increment: line;
		color: rgb(113 113 122); /* zinc-500 */
		margin-right: 1rem;
		width: 2rem;
		text-align: right;
		user-select: none;
		font-family:
			ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace;
		font-variant-numeric: tabular-nums;
	}

	:global(.line-numbers) {
		counter-reset: line;
	}
</style>
