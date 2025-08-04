<script>
	import { Copy, Check } from 'lucide-svelte';

	/** @type {{ content: string }} */
	let { content } = $props();

	let copied = $state(false);

	const handleCopy = async () => {
		if (!content) return;
		try {
			await navigator.clipboard.writeText(content);
			copied = true;
			setTimeout(() => (copied = false), 1600);
		} catch (e) {
			console.error('Failed to copy', e);
		}
	};
</script>

<!-- Primary style aligned to docs/design.md -->
<button
	onclick={handleCopy}
	class="group relative inline-flex items-center gap-2 rounded-lg bg-zinc-800 px-3.5 py-2 text-sm font-medium text-zinc-50 shadow-sm transition duration-200 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
	aria-live="polite"
>
	<!-- subtle edge highlight -->
	<span class="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10 dark:bg-black/10"></span>

	{#if copied}
		<Check class="h-4 w-4" />
		<span>Copied</span>
	{:else}
		<Copy class="h-4 w-4" />
		<span>Copy prompt</span>
	{/if}
</button>
