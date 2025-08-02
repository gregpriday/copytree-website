<script>
	/** @type {{ command: string, class?: string }} */
	let { command, class: className = '' } = $props();

	let copied = $state(false);

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(command);
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 2000);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	};
</script>

<button
	onclick={copyToClipboard}
	class="inline-flex items-center gap-2 rounded-lg border border-border bg-muted px-3 py-2 font-mono text-sm text-muted-foreground transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:ring-2 focus:ring-ring focus:outline-none {className}"
	title="Click to copy command"
	aria-label="Copy command to clipboard"
>
	<code class="text-xs">{command}</code>
	<div class="flex h-4 w-4 items-center justify-center">
		{#if copied}
			<svg class="h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
			</svg>
		{:else}
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
				/>
			</svg>
		{/if}
	</div>
</button>
