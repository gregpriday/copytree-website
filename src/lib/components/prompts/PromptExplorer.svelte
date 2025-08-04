<script>
	import { prompts } from '$lib/prompts/prompts-config.js';
	import * as LucideIcons from 'lucide-svelte';
	import PromptsVideo from './PromptsVideo.svelte';

	/** @type {{ currentSlug: string }} */
	let { currentSlug } = $props();

	let searchTerm = $state('');

	// Derived value in runes mode (replaces legacy $: statement)
	let filteredPrompts = $derived.by(() =>
		searchTerm
			? prompts.filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
			: prompts
	);

	/**
	 * Get the icon component by name
	 * @param {string} iconName
	 * @returns {any}
	 */
	const getIconComponent = (iconName) => {
		return /** @type {any} */ (LucideIcons)[iconName] || LucideIcons.FileText;
	};
</script>

<!-- Sidebar Surface -->
<aside
	class="flex h-[70vh] flex-col border-r border-border/60 bg-white/60 backdrop-blur-xl md:h-[calc(100vh-22rem)] dark:bg-zinc-950/40"
>
	<!-- Search and heading -->
	<div class="border-b border-border/60 p-3 md:p-4">
		<div class="mb-2 flex items-center justify-between">
			<h2 class="text-sm font-semibold text-foreground">System Prompts</h2>
		</div>
		<div class="relative">
			<input
				type="text"
				placeholder="Search prompts..."
				bind:value={searchTerm}
				class="w-full rounded-md border border-border/60 bg-background/60 px-3 py-1.5 pr-8 text-sm text-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-primary focus:outline-none"
			/>
			<LucideIcons.Search
				class="absolute top-1/2 right-2.5 h-4 w-4 -translate-y-1/2 text-muted-foreground"
			/>
		</div>
	</div>

	<!-- List -->
	<div class="flex-1 space-y-2 overflow-y-auto p-2 md:p-3">
		<nav class="space-y-1 transition-colors">
			{#each filteredPrompts as prompt (prompt.id)}
				{@const isActive = currentSlug === prompt.slug}
				{@const IconComponent = getIconComponent(prompt.icon)}
				<a
					href="/prompts/{prompt.slug}"
					class="group relative flex items-center gap-3 rounded-lg border px-3 py-2 text-sm transition-colors duration-200 {isActive
						? 'border-primary/50 bg-primary/5 text-primary'
						: 'border-transparent text-muted-foreground hover:border-border/60 hover:bg-muted/40 hover:text-foreground'}"
				>
					<!-- left accent when active -->
					<span
						class="absolute top-1/2 left-0 hidden h-5 -translate-y-1/2 rounded-r-md bg-primary md:block {isActive
							? 'w-1'
							: 'w-0'}"
					></span>
					<IconComponent
						class="h-4 w-4 flex-shrink-0 transition-colors {isActive
							? 'text-primary'
							: 'group-hover:text-foreground'}"
					/>
					<span class="truncate">{prompt.title ?? prompt?.slug ?? '(untitled prompt)'}</span>
				</a>
			{/each}
		</nav>
	</div>

	<!-- Footer -->
	<div class="border-t border-border/60 bg-background/60 p-3 md:p-4">
		<PromptsVideo />
	</div>
</aside>
