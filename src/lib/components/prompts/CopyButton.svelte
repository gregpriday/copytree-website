<script>
	import { Copy, Check } from 'lucide-svelte';

	/** @type {{ content: string }} */
	let { content } = $props();

	let copied = $state(false);

	const handleCopy = async () => {
		if (content) {
			await navigator.clipboard.writeText(content);
			copied = true;
			setTimeout(() => (copied = false), 2000);
		}
	};
</script>

<button
	onclick={handleCopy}
	class="flex flex-shrink-0 cursor-pointer items-center gap-2 rounded-lg border border-border bg-muted px-4 py-2 text-sm font-medium
    text-foreground shadow-sm transition-colors duration-200 hover:bg-accent"
>
	{#if copied}
		<Check class="h-4 w-4" />
		<span>Copied!</span>
	{:else}
		<Copy class="h-4 w-4" />
		<span>Copy Prompt</span>
	{/if}
</button>
