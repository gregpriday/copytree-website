<script>
	import { fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { searchPrompts, getAllPrompts } from '$lib/prompts/promptsIndex.js';
	import {
		Search,
		X,
		Hash,
		Building2,
		Palette,
		FileText,
		Zap,
		Code,
		Layers,
		Settings,
		BookOpen
	} from 'lucide-svelte';

	// Props
	let { open = false, onClose = () => {} } = $props();

	// State
	let searchQuery = $state('');
	let searchResults = $state([]);
	let selectedIndex = $state(0);
	let searchInput;
	let searching = $state(false);
	let allPrompts = $state([]);
	let debounceTimeout;

	// Icon mapping for prompt icons
	const iconMap = {
		Building2,
		Palette,
		FileText,
		Zap,
		Code,
		Layers,
		Settings,
		BookOpen
	};

	// Focus trap elements
	let modalElement;
	let focusableElements = [];

	/**
	 * Debounced search function
	 */
	async function performSearch(query) {
		if (debounceTimeout) {
			clearTimeout(debounceTimeout);
		}

		debounceTimeout = setTimeout(async () => {
			searching = true;
			
			try {
				if (!query || query.trim().length < 2) {
					// Show recent/featured prompts when no query
					const recent = allPrompts.slice(0, 8);
					searchResults = recent;
				} else {
					// Perform fuzzy search
					const results = await searchPrompts(query.trim(), 8);
					searchResults = results;
				}
				selectedIndex = 0;
			} catch (error) {
				console.error('Search error:', error);
				searchResults = [];
			} finally {
				searching = false;
			}
		}, 200);
	}

	/**
	 * Initialize search index and load initial prompts
	 */
	async function initializeSearch() {
		if (!browser) return;
		
		try {
			allPrompts = await getAllPrompts();
			// Show initial results (recent prompts)
			searchResults = allPrompts.slice(0, 8);
		} catch (error) {
			console.error('Failed to initialize search:', error);
		}
	}

	/**
	 * Handle keyboard navigation
	 */
	function handleKeydown(event) {
		if (!open) return;

		switch (event.key) {
			case 'Escape':
				event.preventDefault();
				closeModal();
				break;
			case 'ArrowDown':
				event.preventDefault();
				selectedIndex = Math.min(selectedIndex + 1, searchResults.length - 1);
				break;
			case 'ArrowUp':
				event.preventDefault();
				selectedIndex = Math.max(selectedIndex - 1, 0);
				break;
			case 'Enter':
				event.preventDefault();
				if (searchResults[selectedIndex]) {
					selectPrompt(searchResults[selectedIndex]);
				}
				break;
		}
	}

	/**
	 * Select a prompt and navigate to it
	 */
	function selectPrompt(prompt) {
		closeModal();
		goto(`/prompts/${prompt.slug}`);
	}

	/**
	 * Close modal and reset state
	 */
	function closeModal() {
		searchQuery = '';
		searchResults = [];
		selectedIndex = 0;
		onClose();
	}

	/**
	 * Clear search input
	 */
	function clearSearch() {
		searchQuery = '';
		performSearch('');
		if (searchInput) {
			searchInput.focus();
		}
	}

	/**
	 * Handle backdrop click
	 */
	function handleBackdropClick(event) {
		if (event.target === event.currentTarget) {
			closeModal();
		}
	}

	/**
	 * Get the appropriate icon component
	 */
	function getIconComponent(iconName) {
		return iconMap[iconName] || FileText;
	}

	/**
	 * Highlight matching text in search results
	 */
	function highlightMatch(text, query) {
		if (!query || !text) return text;
		
		const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
		return text.replace(regex, '<mark class="bg-primary/20 text-primary-foreground rounded-sm px-0.5">$1</mark>');
	}

	/**
	 * Focus trap management
	 */
	function updateFocusableElements() {
		if (!modalElement) return;
		
		focusableElements = modalElement.querySelectorAll(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
		);
	}

	function trapFocus(event) {
		if (!focusableElements.length) return;
		
		const firstElement = focusableElements[0];
		const lastElement = focusableElements[focusableElements.length - 1];
		
		if (event.key === 'Tab') {
			if (event.shiftKey) {
				if (document.activeElement === firstElement) {
					event.preventDefault();
					lastElement.focus();
				}
			} else {
				if (document.activeElement === lastElement) {
					event.preventDefault();
					firstElement.focus();
				}
			}
		}
	}

	// Effects
	$effect(() => {
		if (browser) {
			initializeSearch();
		}
	});

	$effect(() => {
		if (open && browser) {
			// Focus the search input when opened
			setTimeout(() => {
				if (searchInput) {
					searchInput.focus();
					updateFocusableElements();
				}
			}, 100);
			
			// Add keyboard listeners
			document.addEventListener('keydown', handleKeydown);
			document.addEventListener('keydown', trapFocus);
			
			// Prevent body scroll
			document.body.style.overflow = 'hidden';
			
			return () => {
				document.removeEventListener('keydown', handleKeydown);
				document.removeEventListener('keydown', trapFocus);
				document.body.style.overflow = '';
			};
		}
	});

	$effect(() => {
		performSearch(searchQuery);
	});
</script>

{#if open}
	<div
		class="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[10vh]"
		transition:fade={{ duration: 150, easing: quintOut }}
		onclick={handleBackdropClick}
		onkeydown={handleBackdropClick}
		role="dialog"
		aria-modal="true"
		aria-labelledby="command-palette-title"
		tabindex="-1"
	>
		<!-- Backdrop -->
		<div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
		
		<!-- Modal -->
		<div
			bind:this={modalElement}
			class="relative w-full max-w-2xl overflow-hidden rounded-xl border border-border/60 bg-background/95 backdrop-blur-md shadow-2xl"
		>
			<!-- Search Header -->
			<div class="flex items-center border-b border-border/60 px-4">
				<Search class="h-5 w-5 text-muted-foreground" />
				<input
					bind:this={searchInput}
					bind:value={searchQuery}
					class="flex-1 bg-transparent px-4 py-4 text-base text-foreground placeholder-muted-foreground focus:outline-none"
					placeholder="Search prompts... (⌘K to open)"
					type="text"
					autocomplete="off"
					spellcheck="false"
				/>
				
				{#if searchQuery}
					<button
						onclick={clearSearch}
						class="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
						aria-label="Clear search"
					>
						<X class="h-4 w-4" />
					</button>
				{/if}
			</div>

			<!-- Results -->
			<div class="max-h-96 overflow-y-auto">
				{#if searching}
					<div class="px-4 py-8 text-center">
						<div class="inline-flex items-center gap-2 text-sm text-muted-foreground">
							<div class="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
							Searching...
						</div>
					</div>
				{:else if searchResults.length > 0}
					<div class="py-2">
						{#each searchResults as prompt, index (prompt.id)}
							{@const IconComponent = getIconComponent(prompt.icon)}
							<button
								class="group flex w-full items-center gap-3 px-4 py-3 text-left transition-colors {index === selectedIndex 
									? 'bg-accent text-accent-foreground' 
									: 'hover:bg-muted'}"
								onclick={() => selectPrompt(prompt)}
								aria-current={index === selectedIndex ? 'option' : undefined}
							>
								<!-- Icon -->
								<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-muted group-hover:bg-background {index === selectedIndex ? 'bg-primary text-primary-foreground' : ''}">
									<IconComponent class="h-5 w-5" />
								</div>
								
								<!-- Content -->
								<div class="min-w-0 flex-1">
									<div class="flex items-center gap-2">
										<h3 class="truncate text-sm font-medium">
											{@html highlightMatch(prompt.title, searchQuery)}
										</h3>
										<div class="flex shrink-0 items-center gap-1">
											<span class="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
												{prompt.category}
											</span>
										</div>
									</div>
									<p class="mt-0.5 truncate text-xs text-muted-foreground">
										{@html highlightMatch(prompt.description, searchQuery)}
									</p>
									{#if prompt.tags && prompt.tags.length > 0}
										<div class="mt-1.5 flex gap-1">
											{#each prompt.tags.slice(0, 3) as tag}
												<span class="inline-flex items-center gap-0.5 rounded-md bg-background px-1.5 py-0.5 text-xs text-muted-foreground">
													<Hash class="h-2.5 w-2.5" />
													{tag}
												</span>
											{/each}
											{#if prompt.tags.length > 3}
												<span class="rounded-md bg-background px-1.5 py-0.5 text-xs text-muted-foreground">
													+{prompt.tags.length - 3}
												</span>
											{/if}
										</div>
									{/if}
								</div>
							</button>
						{/each}
					</div>
				{:else if searchQuery}
					<div class="px-4 py-8 text-center">
						<div class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
							<Search class="h-6 w-6 text-muted-foreground" />
						</div>
						<p class="text-sm font-medium text-foreground">No prompts found</p>
						<p class="mt-1 text-xs text-muted-foreground">
							Try adjusting your search terms
						</p>
					</div>
				{:else}
					<div class="px-4 py-8 text-center">
						<div class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
							<Zap class="h-6 w-6 text-muted-foreground" />
						</div>
						<p class="text-sm font-medium text-foreground">Search prompts</p>
						<p class="mt-1 text-xs text-muted-foreground">
							Start typing to find the perfect prompt
						</p>
					</div>
				{/if}
			</div>

			<!-- Footer -->
			<div class="border-t border-border/60 px-4 py-3">
				<div class="flex items-center justify-between text-xs text-muted-foreground">
					<div class="flex items-center gap-4">
						<div class="flex items-center gap-1">
							<kbd class="rounded border border-border bg-muted px-1.5 py-0.5 text-xs">↑↓</kbd>
							Navigate
						</div>
						<div class="flex items-center gap-1">
							<kbd class="rounded border border-border bg-muted px-1.5 py-0.5 text-xs">↵</kbd>
							Select
						</div>
						<div class="flex items-center gap-1">
							<kbd class="rounded border border-border bg-muted px-1.5 py-0.5 text-xs">Esc</kbd>
							Close
						</div>
					</div>
					<div>{searchResults.length} results</div>
				</div>
			</div>
		</div>
	</div>
{/if}