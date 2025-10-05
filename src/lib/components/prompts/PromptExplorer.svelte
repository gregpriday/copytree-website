<script>
	import { prompts, categories, allTags } from '$lib/prompts/prompts-config.js';
	import { promptsFavorites } from '$lib/stores/promptsFavorites.js';
	import * as LucideIcons from 'lucide-svelte';
	import PromptsVideo from './PromptsVideo.svelte';

	/** @type {{ currentSlug: string }} */
	let { currentSlug } = $props();

	let searchTerm = $state('');
	let activeCategories = $state(new Set());
	let activeTags = $state(new Set());
	let focusedIndex = $state(-1);

	/**
	 * Get the icon component by name
	 * @param {string} iconName
	 * @returns {any}
	 */
	const getIconComponent = (iconName) => {
		return /** @type {any} */ (LucideIcons)[iconName] || LucideIcons.FileText;
	};

	/**
	 * Toggle category filter
	 * @param {string} category
	 */
	function toggleCategory(category) {
		const newCategories = new Set(activeCategories);
		if (newCategories.has(category)) {
			newCategories.delete(category);
		} else {
			newCategories.add(category);
		}
		activeCategories = newCategories;
	}

	/**
	 * Toggle tag filter
	 * @param {string} tag
	 */
	function toggleTag(tag) {
		const newTags = new Set(activeTags);
		if (newTags.has(tag)) {
			newTags.delete(tag);
		} else {
			newTags.add(tag);
		}
		activeTags = newTags;
	}

	/**
	 * Clear all filters
	 */
	function clearFilters() {
		activeCategories = new Set();
		activeTags = new Set();
		searchTerm = '';
	}

	// Filtered and grouped prompts
	let filteredPrompts = $derived.by(() => {
		let filtered = prompts;

		// Apply search filter
		if (searchTerm.trim()) {
			filtered = filtered.filter((p) =>
				p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				p.description.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		// Apply category filters
		if (activeCategories.size > 0) {
			filtered = filtered.filter((p) => activeCategories.has(p.category));
		}

		// Apply tag filters
		if (activeTags.size > 0) {
			filtered = filtered.filter((p) =>
				p.tags.some(tag => activeTags.has(tag))
			);
		}

		return filtered;
	});

	// Group prompts: favorites first, then by category
	let groupedPrompts = $derived.by(() => {
		const favoritePrompts = [];
		const otherPrompts = [];

		filteredPrompts.forEach(prompt => {
			if ($promptsFavorites.has(prompt.id)) {
				favoritePrompts.push(prompt);
			} else {
				otherPrompts.push(prompt);
			}
		});

		// Group other prompts by category
		const groupedOthers = otherPrompts.reduce((acc, prompt) => {
			if (!acc[prompt.category]) {
				acc[prompt.category] = [];
			}
			acc[prompt.category].push(prompt);
			return acc;
		}, {});

		return {
			favorites: favoritePrompts,
			categories: groupedOthers
		};
	});

	// Handle keyboard navigation
	function handleKeydown(event) {
		const totalPrompts = filteredPrompts.length;
		if (totalPrompts === 0) return;

		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				focusedIndex = (focusedIndex + 1) % totalPrompts;
				break;
			case 'ArrowUp':
				event.preventDefault();
				focusedIndex = focusedIndex <= 0 ? totalPrompts - 1 : focusedIndex - 1;
				break;
			case 'Enter':
				if (focusedIndex >= 0 && filteredPrompts[focusedIndex]) {
					const prompt = filteredPrompts[focusedIndex];
					window.location.href = `/prompts/${prompt.slug}`;
				}
				break;
			case 'Escape':
				focusedIndex = -1;
				break;
		}
	}
</script>

<!-- Sidebar Surface -->
<aside
	class="flex h-[70vh] flex-col border-r border-border/60 bg-white/60 backdrop-blur-xl md:h-[calc(100vh-22rem)] dark:bg-zinc-950/40"
	role="navigation"
	aria-label="Prompt navigation"
	onkeydown={handleKeydown}
	tabindex="-1"
>
	<!-- Search and heading -->
	<div class="border-b border-border/60 p-3 md:p-4">
		<div class="mb-3 flex items-center justify-between">
			<h2 class="text-sm font-semibold text-foreground">System Prompts</h2>
			{#if activeCategories.size > 0 || activeTags.size > 0 || searchTerm.trim()}
				<button
					onclick={clearFilters}
					class="text-xs text-muted-foreground hover:text-foreground transition-colors"
					aria-label="Clear all filters"
				>
					Clear filters
				</button>
			{/if}
		</div>

		<!-- Search -->
		<div class="relative mb-3">
			<input
				type="text"
				placeholder="Search prompts…"
				autocomplete="off"
				inputmode="search"
				aria-label="Search prompts"
				bind:value={searchTerm}
				class="w-full rounded-md border border-border/60 bg-background/60 px-3 py-1.5 pr-8 text-sm text-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-primary focus:outline-none"
			/>
			<LucideIcons.Search
				class="absolute top-1/2 right-2.5 h-4 w-4 -translate-y-1/2 text-muted-foreground"
				aria-hidden="true"
			/>
		</div>

		<!-- Filter Chips -->
		<div class="space-y-2">
			<!-- Category filters -->
			<div class="flex flex-wrap gap-1.5">
				{#each categories as category}
					<button
						onclick={() => toggleCategory(category)}
						class="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium transition-all duration-200 {activeCategories.has(category)
							? 'border-primary/50 bg-primary/10 text-primary'
							: 'border-border/60 bg-background/40 text-muted-foreground hover:border-border hover:text-foreground'}"
						aria-pressed={activeCategories.has(category)}
					>
						{category}
					</button>
				{/each}
			</div>

			<!-- Tag filters -->
			<div class="flex flex-wrap gap-1.5">
				{#each allTags as tag}
					<button
						onclick={() => toggleTag(tag)}
						class="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium transition-all duration-200 {activeTags.has(tag)
							? 'border-primary/30 bg-primary/5 text-primary'
							: 'border-border/40 bg-background/30 text-muted-foreground hover:border-border/60 hover:text-foreground'}"
						aria-pressed={activeTags.has(tag)}
					>
						#{tag}
					</button>
				{/each}
			</div>
		</div>
	</div>

	<!-- List -->
	<div class="flex-1 overflow-y-auto">
		<nav class="space-y-2 p-2 md:p-3" role="list" aria-label="Prompt list">
			<!-- Favorites Section -->
			{#if groupedPrompts.favorites.length > 0}
				<div class="space-y-1">
					<h3 class="px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
						<LucideIcons.Star class="inline h-3 w-3 mr-1" aria-hidden="true" />
						Favorites
					</h3>
					<div class="space-y-1 pb-2">
						{#each groupedPrompts.favorites as prompt, index (prompt.id)}
							{@const isActive = currentSlug === prompt.slug}
							{@const IconComponent = getIconComponent(prompt.icon)}
							{@const globalIndex = index}
							{@const isFocused = focusedIndex === globalIndex}
							<a
								href="/prompts/{prompt.slug}"
								class="group relative flex items-center gap-3 rounded-lg border px-3 py-2 text-sm transition-all duration-200 {isActive
									? 'border-primary/50 bg-primary/5 text-primary shadow-sm'
									: isFocused
									? 'border-primary/30 bg-primary/3 text-foreground'
									: 'border-transparent text-muted-foreground hover:border-border/60 hover:bg-muted/40 hover:text-foreground'}"
								aria-current={isActive ? 'page' : undefined}
								role="listitem"
							>
								<!-- left accent when active -->
								<span
									class="absolute top-1/2 left-0 hidden h-5 -translate-y-1/2 rounded-r-md bg-primary md:block transition-all duration-200 {isActive
										? 'w-1'
										: 'w-0'}"
									aria-hidden="true"
								></span>
								<IconComponent
									class="h-4 w-4 flex-shrink-0 transition-colors {isActive
										? 'text-primary'
										: 'group-hover:text-foreground'}"
									aria-hidden="true"
								/>
								<span class="flex-1 truncate">{prompt.title ?? prompt?.slug ?? '(untitled prompt)'}</span>
								<button
									onclick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										promptsFavorites.toggle(prompt.id);
									}}
									class="p-0.5 rounded hover:bg-muted/60 transition-colors"
									aria-label="Remove from favorites"
								>
									<LucideIcons.Star
										class="h-3.5 w-3.5 fill-amber-400 text-amber-400 transition-colors hover:fill-amber-500 hover:text-amber-500"
									/>
								</button>
							</a>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Category Sections -->
			{#each Object.entries(groupedPrompts.categories) as [categoryName, categoryPrompts]}
				<div class="space-y-1">
					<h3 class="px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
						{categoryName}
					</h3>
					<div class="space-y-1 pb-2">
						{#each categoryPrompts as prompt, index (prompt.id)}
							{@const isActive = currentSlug === prompt.slug}
							{@const IconComponent = getIconComponent(prompt.icon)}
							{@const globalIndex = groupedPrompts.favorites.length + Object.keys(groupedPrompts.categories).slice(0, Object.keys(groupedPrompts.categories).indexOf(categoryName)).reduce((sum, cat) => sum + groupedPrompts.categories[cat].length, 0) + index}
							{@const isFocused = focusedIndex === globalIndex}
							<a
								href="/prompts/{prompt.slug}"
								class="group relative flex items-center gap-3 rounded-lg border px-3 py-2 text-sm transition-all duration-200 {isActive
									? 'border-primary/50 bg-primary/5 text-primary shadow-sm'
									: isFocused
									? 'border-primary/30 bg-primary/3 text-foreground'
									: 'border-transparent text-muted-foreground hover:border-border/60 hover:bg-muted/40 hover:text-foreground'}"
								aria-current={isActive ? 'page' : undefined}
								role="listitem"
							>
								<!-- left accent when active -->
								<span
									class="absolute top-1/2 left-0 hidden h-5 -translate-y-1/2 rounded-r-md bg-primary md:block transition-all duration-200 {isActive
										? 'w-1'
										: 'w-0'}"
									aria-hidden="true"
								></span>
								<IconComponent
									class="h-4 w-4 flex-shrink-0 transition-colors {isActive
										? 'text-primary'
										: 'group-hover:text-foreground'}"
									aria-hidden="true"
								/>
								<span class="flex-1 truncate">{prompt.title ?? prompt?.slug ?? '(untitled prompt)'}</span>
								<button
									onclick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										promptsFavorites.toggle(prompt.id);
									}}
									class="p-0.5 rounded hover:bg-muted/60 transition-colors"
									aria-label="Add to favorites"
								>
									<LucideIcons.Star
										class="h-3.5 w-3.5 text-muted-foreground/60 transition-colors hover:text-amber-400"
									/>
								</button>
							</a>
						{/each}
					</div>
				</div>
			{/each}

			<!-- Empty state -->
			{#if filteredPrompts.length === 0}
				<div class="px-2 py-8 text-center">
					<LucideIcons.Search class="mx-auto h-8 w-8 text-muted-foreground/40 mb-2" />
					<p class="text-sm text-muted-foreground">No prompts found</p>
					{#if searchTerm.trim() || activeCategories.size > 0 || activeTags.size > 0}
						<button
							onclick={clearFilters}
							class="mt-2 text-xs text-primary hover:text-primary/80 transition-colors"
						>
							Clear filters to see all prompts
						</button>
					{/if}
				</div>
			{/if}
		</nav>
	</div>

	<!-- Footer -->
	<div class="border-t border-border/60 bg-background/60 p-3 md:p-4">
		<PromptsVideo />
	</div>
</aside>
