<script>
	import { goto } from '$app/navigation';
	import { Search, X } from 'lucide-svelte';
	import * as LucideIcons from 'lucide-svelte';

	/** @type {{ prompts: Array<{id: string, slug: string, title: string, description: string, icon: string, tags: string[], category: string, updated: string, version: string}>, categories: string[], tags: string[] }} */
	let { prompts, categories, tags } = $props();

	// State management using Svelte 5 runes
	let searchQuery = $state('');
	let activeFilters = $state({ categories: [], tags: [] });
	let focusedCardIndex = $state(-1);

	// Element references for keyboard navigation
	/** @type {HTMLInputElement} */
	let searchInputRef;
	/** @type {HTMLDivElement[]} */
	let cardRefs = [];

	// Get icon component by name with fallback
	/** @param {string} iconName */
	const getIconComponent = (iconName) => {
		return /** @type {any} */ (LucideIcons)[iconName] || LucideIcons.FileText;
	};

	// Derived filtered prompts based on search and filters
	let filteredPrompts = $derived.by(() => {
		let filtered = prompts;

		// Apply search filter
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase().trim();
			filtered = filtered.filter(
				(prompt) =>
					prompt.title.toLowerCase().includes(query) ||
					prompt.description.toLowerCase().includes(query) ||
					prompt.tags.some((tag) => tag.toLowerCase().includes(query))
			);
		}

		// Apply category filters
		if (activeFilters.categories.length > 0) {
			filtered = filtered.filter((prompt) => activeFilters.categories.includes(prompt.category));
		}

		// Apply tag filters
		if (activeFilters.tags.length > 0) {
			filtered = filtered.filter((prompt) =>
				activeFilters.tags.some((tag) => prompt.tags.includes(tag))
			);
		}

		return filtered;
	});

	// Handle filter toggle
	/** @param {'categories' | 'tags'} type @param {string} value */
	function toggleFilter(type, value) {
		const filters = [...activeFilters[type]];
		const index = filters.indexOf(value);

		if (index > -1) {
			filters.splice(index, 1);
		} else {
			filters.push(value);
		}

		activeFilters = { ...activeFilters, [type]: filters };
		focusedCardIndex = -1; // Reset focus when filters change
	}

	// Clear all filters
	function clearAllFilters() {
		activeFilters = { categories: [], tags: [] };
		searchQuery = '';
		focusedCardIndex = -1;
	}

	// Navigate to prompt
	/** @param {string} slug */
	function navigateToPrompt(slug) {
		goto(`/prompts/${slug}`);
	}

	// Keyboard navigation handlers
	/** @param {KeyboardEvent} e */
	function handleSearchKeydown(e) {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			focusedCardIndex = filteredPrompts.length > 0 ? 0 : -1;
			updateCardFocus();
		}
	}

	/** @param {KeyboardEvent} e */
	function handleGlobalKeydown(e) {
		if (e.target === searchInputRef) return; // Let search input handle its own keys

		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				focusedCardIndex = Math.min(focusedCardIndex + 1, filteredPrompts.length - 1);
				updateCardFocus();
				break;
			case 'ArrowUp':
				e.preventDefault();
				if (focusedCardIndex <= 0) {
					focusedCardIndex = -1;
					searchInputRef?.focus();
				} else {
					focusedCardIndex = Math.max(focusedCardIndex - 1, 0);
					updateCardFocus();
				}
				break;
			case 'ArrowRight':
				e.preventDefault();
				if (focusedCardIndex === -1) break;
				const nextIndex = focusedCardIndex + getColumnsCount();
				focusedCardIndex = Math.min(nextIndex, filteredPrompts.length - 1);
				updateCardFocus();
				break;
			case 'ArrowLeft':
				e.preventDefault();
				if (focusedCardIndex === -1) break;
				const prevIndex = focusedCardIndex - getColumnsCount();
				focusedCardIndex = Math.max(prevIndex, 0);
				updateCardFocus();
				break;
			case 'Enter':
				e.preventDefault();
				if (focusedCardIndex >= 0 && focusedCardIndex < filteredPrompts.length) {
					navigateToPrompt(filteredPrompts[focusedCardIndex].slug);
				}
				break;
			case 'Escape':
				focusedCardIndex = -1;
				searchInputRef?.focus();
				break;
		}
	}

	// Get number of columns based on screen size (approximation)
	function getColumnsCount() {
		if (typeof window === 'undefined') return 3;
		const width = window.innerWidth;
		if (width < 768) return 1; // mobile
		if (width < 1024) return 2; // tablet
		return 3; // desktop
	}

	// Update card focus
	function updateCardFocus() {
		if (focusedCardIndex >= 0 && cardRefs[focusedCardIndex]) {
			cardRefs[focusedCardIndex].focus();
		}
	}

	// Global keyboard listener
	$effect(() => {
		if (typeof document === 'undefined') return;

		document.addEventListener('keydown', handleGlobalKeydown);
		return () => document.removeEventListener('keydown', handleGlobalKeydown);
	});

	// Truncate description text
	/** @param {string} text @param {number} maxLength */
	function truncateText(text, maxLength = 120) {
		return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
	}

	// Format date
	/** @param {string} dateString */
	function formatDate(dateString) {
		try {
			return new Date(dateString).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'short',
				day: 'numeric'
			});
		} catch {
			return dateString;
		}
	}

	// Check if any filters are active
	let hasActiveFilters = $derived(
		activeFilters.categories.length > 0 || activeFilters.tags.length > 0 || searchQuery.trim()
	);
</script>

<!-- Global keyboard navigation -->
<svelte:window />

<div class="w-full space-y-6" role="main" aria-label="Prompt Library">
	<!-- Search Bar -->
	<div class="relative">
		<Search
			class="pointer-events-none absolute top-1/2 left-4 z-10 h-5 w-5 -translate-y-1/2 text-muted-foreground"
			aria-hidden="true"
		/>
		<input
			bind:this={searchInputRef}
			type="text"
			placeholder="Search prompts by title, description, or tags..."
			autocomplete="off"
			role="searchbox"
			aria-label="Search prompts"
			bind:value={searchQuery}
			onkeydown={handleSearchKeydown}
			class="w-full rounded-xl border border-border bg-background/70 py-4 pr-4 pl-12 text-lg text-foreground shadow-sm backdrop-blur-sm transition-all duration-200 ease-out placeholder:text-muted-foreground/80 hover:border-primary/50 hover:shadow-md focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
		/>
	</div>

	<!-- Filter Chips -->
	<div class="space-y-4">
		<!-- Categories -->
		{#if categories.length > 0}
			<div class="space-y-2">
				<h3 class="text-sm font-medium text-muted-foreground">Categories</h3>
				<div class="flex flex-wrap gap-2">
					{#each categories as category}
						{@const isActive = activeFilters.categories.includes(category)}
						<button
							onclick={() => toggleFilter('categories', category)}
							class="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-all duration-200 {isActive
								? 'border-primary bg-primary/10 text-primary hover:bg-primary/20'
								: 'border-border bg-background/50 text-muted-foreground hover:border-primary/50 hover:bg-muted/60 hover:text-foreground'}"
							aria-pressed={isActive}
							aria-label="Filter by {category} category"
						>
							{category}
							{#if isActive}
								<X class="h-3 w-3" aria-hidden="true" />
							{/if}
						</button>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Tags -->
		{#if tags.length > 0}
			<div class="space-y-2">
				<h3 class="text-sm font-medium text-muted-foreground">Tags</h3>
				<div class="flex flex-wrap gap-2">
					{#each tags as tag}
						{@const isActive = activeFilters.tags.includes(tag)}
						<button
							onclick={() => toggleFilter('tags', tag)}
							class="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-all duration-200 {isActive
								? 'border-primary bg-primary/10 text-primary hover:bg-primary/20'
								: 'border-border bg-background/50 text-muted-foreground hover:border-primary/50 hover:bg-muted/60 hover:text-foreground'}"
							aria-pressed={isActive}
							aria-label="Filter by {tag} tag"
						>
							#{tag}
							{#if isActive}
								<X class="h-3 w-3" aria-hidden="true" />
							{/if}
						</button>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Clear Filters Button -->
		{#if hasActiveFilters}
			<button
				onclick={clearAllFilters}
				class="inline-flex items-center gap-2 rounded-lg border border-border bg-background/50 px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:border-destructive/50 hover:bg-destructive/5 hover:text-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/20 focus:outline-none"
				aria-label="Clear all filters"
			>
				<X class="h-4 w-4" aria-hidden="true" />
				Clear all filters
			</button>
		{/if}
	</div>

	<!-- Results Summary -->
	<div class="flex items-center justify-between">
		<p class="text-sm text-muted-foreground">
			{filteredPrompts.length} prompt{filteredPrompts.length !== 1 ? 's' : ''}
			{hasActiveFilters ? 'found' : 'available'}
		</p>
		<p class="text-xs text-muted-foreground/60">Use arrow keys to navigate, Enter to select</p>
	</div>

	<!-- Prompt Cards Grid -->
	{#if filteredPrompts.length > 0}
		<div
			class="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
			role="grid"
			aria-label="Prompt cards"
		>
			{#each filteredPrompts as prompt, index (prompt.id)}
				{@const IconComponent = getIconComponent(prompt.icon)}
				{@const isFocused = focusedCardIndex === index}
				<div
					bind:this={cardRefs[index]}
					onclick={() => navigateToPrompt(prompt.slug)}
					onkeydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							navigateToPrompt(prompt.slug);
						}
					}}
					class="group relative h-full cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1 {isFocused
						? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
						: ''}"
					role="gridcell"
					tabindex={isFocused ? 0 : -1}
					aria-label="View {prompt.title} prompt"
				>
					<!-- Card Container -->
					<div
						class="relative h-full overflow-hidden rounded-xl border border-border bg-background/60 shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-lg"
					>
						<!-- Card Content -->
						<div class="flex h-full flex-col p-6">
							<!-- Header -->
							<div class="mb-4 flex items-start justify-between">
								<!-- Icon -->
								<div class="flex-shrink-0">
									<div
										class="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 transition-all duration-300 group-hover:border-primary/50 group-hover:bg-primary/20"
									>
										<IconComponent class="h-6 w-6 text-primary" aria-hidden="true" />
									</div>
								</div>

								<!-- Category Badge -->
								<span
									class="inline-flex items-center rounded-full bg-muted/60 px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
								>
									{prompt.category}
								</span>
							</div>

							<!-- Title -->
							<h3
								class="mb-3 flex-shrink-0 text-xl font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary"
							>
								{prompt.title}
							</h3>

							<!-- Description -->
							<p
								class="mb-4 flex-grow text-base leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground"
							>
								{truncateText(prompt.description)}
							</p>

							<!-- Tags -->
							{#if prompt.tags.length > 0}
								<div class="mb-4 flex flex-wrap gap-1.5">
									{#each prompt.tags.slice(0, 3) as tag}
										<span
											class="inline-flex items-center rounded-md bg-primary/5 px-2 py-1 text-xs font-medium text-primary"
										>
											#{tag}
										</span>
									{/each}
									{#if prompt.tags.length > 3}
										<span
											class="inline-flex items-center rounded-md bg-muted/50 px-2 py-1 text-xs font-medium text-muted-foreground"
										>
											+{prompt.tags.length - 3} more
										</span>
									{/if}
								</div>
							{/if}

							<!-- Footer -->
							<div class="flex items-center justify-between text-xs text-muted-foreground">
								<span>Updated {formatDate(prompt.updated)}</span>
								<span>v{prompt.version}</span>
							</div>
						</div>

						<!-- Hover Overlay -->
						<div
							class="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-primary/[0.01] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
						></div>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<!-- Empty State -->
		<div class="flex flex-col items-center justify-center py-16 text-center">
			<Search class="mb-4 h-12 w-12 text-muted-foreground/40" aria-hidden="true" />
			<h3 class="mb-2 text-lg font-semibold text-foreground">No prompts found</h3>
			<p class="mb-6 max-w-md text-muted-foreground">
				{hasActiveFilters
					? 'Try adjusting your search terms or filters to find more prompts.'
					: 'There are no prompts available at the moment.'}
			</p>
			{#if hasActiveFilters}
				<button
					onclick={clearAllFilters}
					class="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90 focus:ring-2 focus:ring-primary/20 focus:outline-none"
					aria-label="Clear all filters to show all prompts"
				>
					<X class="h-4 w-4" aria-hidden="true" />
					Clear all filters
				</button>
			{/if}
		</div>
	{/if}
</div>