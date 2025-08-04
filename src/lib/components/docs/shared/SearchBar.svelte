<script>
	import { FileText, Search } from 'lucide-svelte';
	import Fuse from 'fuse.js';
	import { docsIndex } from '$lib/docsIndex.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	// State management using Svelte 5 runes
	let query = $state('');
	/** @type {any[]} */
	let results = $state([]);
	let selectedIndex = $state(-1);
	let isOpen = $state(false);

	// Element references
	/** @type {HTMLInputElement} */
	let inputRef;
	/** @type {HTMLDivElement} */
	let dropdownRef;

	// Fuse.js instance
	/** @type {Fuse<any> | null} */
	let fuseRef = null;

	// Initialize Fuse.js search engine
	$effect(() => {
		fuseRef = new Fuse(docsIndex, {
			keys: [
				{ name: 'title', weight: 0.7 },
				{ name: 'content', weight: 0.3 }
			],
			includeScore: true,
			minMatchCharLength: 2,
			threshold: 0.4
		});
	});

	// Perform search when query changes
	$effect(() => {
		if (query.length > 1 && fuseRef) {
			const searchResults = fuseRef.search(query).slice(0, 8);
			results = searchResults;
			isOpen = searchResults.length > 0 || query.length > 1;
			selectedIndex = -1;
		} else {
			results = [];
			isOpen = false;
			selectedIndex = -1;
		}
	});

	// Handle keyboard navigation
	/** @param {KeyboardEvent} e */
	function handleKeyDown(e) {
		if (!isOpen || results.length === 0) return;

		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				selectedIndex = selectedIndex < results.length - 1 ? selectedIndex + 1 : 0;
				break;
			case 'ArrowUp':
				e.preventDefault();
				selectedIndex = selectedIndex > 0 ? selectedIndex - 1 : results.length - 1;
				break;
			case 'Enter':
				e.preventDefault();
				if (selectedIndex >= 0 && selectedIndex < results.length) {
					handleResultClick(results[selectedIndex].item);
				}
				break;
			case 'Escape':
				isOpen = false;
				inputRef?.blur();
				break;
		}
	}

	// Keyboard shortcut (Cmd+K) to focus input
	$effect(() => {
		/** @param {KeyboardEvent} e */
		const handleKeyDown = (e) => {
			if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
				e.preventDefault();
				inputRef?.focus();
			}
		};
		if (typeof window !== 'undefined') {
			window.addEventListener('keydown', handleKeyDown);
			return () => window.removeEventListener('keydown', handleKeyDown);
		}
		return () => {}; // No-op cleanup for SSR
	});

	// Handle clicking outside to close dropdown
	$effect(() => {
		/** @param {MouseEvent} e */
		const handleClickOutside = (e) => {
			if (dropdownRef && !dropdownRef.contains(/** @type {Node} */ (e.target))) {
				isOpen = false;
			}
		};
		if (typeof document !== 'undefined') {
			document.addEventListener('mousedown', handleClickOutside);
			return () => document.removeEventListener('mousedown', handleClickOutside);
		}
		return () => {}; // No-op cleanup for SSR
	});

	// Handle result click
	/** @param {any} item */
	function handleResultClick(item) {
		const currentPath = $page.url.pathname;
		const targetHash = item.path; // e.g., #section-id

		// If not currently on /docs, navigate there with the hash first
		if (!currentPath.startsWith('/docs')) {
			goto(`/docs${targetHash}`);
			isOpen = false;
			query = '';
			inputRef?.blur();
			return;
		}

		// Already on /docs, smooth scroll to the section
		const element = document.querySelector(targetHash);
		if (element) {
			const top = element.getBoundingClientRect().top + window.pageYOffset - 80; // 80px offset for header
			window.scrollTo({ top, behavior: 'smooth' });
		}
		isOpen = false;
		query = '';
		inputRef?.blur();
	}

	// Truncate match for cleaner preview
	/** @param {string} text */
	function highlightMatch(text) {
		return text.substring(0, 70) + (text.length > 70 ? '...' : '');
	}
</script>

<div class="relative z-50 w-full" bind:this={dropdownRef}>
	<!-- Search Input Container -->
	<div class="relative">
		<Search
			class="pointer-events-none absolute top-1/2 left-3 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground/80 transition-colors duration-200"
			aria-hidden="true"
		/>
		<input
			bind:this={inputRef}
			type="text"
			placeholder="Search docs…"
			autocomplete="off"
			role="combobox"
			aria-expanded={isOpen}
			aria-controls="search-results"
			aria-autocomplete="list"
			bind:value={query}
			onkeydown={handleKeyDown}
			onfocus={() => {
				if (query.length > 1) isOpen = true;
			}}
			class="w-full rounded-md border border-border bg-background py-2 pr-3 pl-10 font-sans text-sm text-foreground shadow-sm backdrop-blur-sm transition-all duration-200 ease-out placeholder:text-muted-foreground placeholder:opacity-80 hover:border-primary/50 hover:shadow-md focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none dark:bg-zinc-900/50"
			aria-label="Search documentation"
		/>
		<!-- KBD shortcut helper (non-interactive) -->
		<span class="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 items-center gap-0.5 rounded-md border border-border bg-muted/60 px-1.5 py-0.5 text-[11px] text-muted-foreground/90 sm:flex">
			<kbd class="font-mono">⌘</kbd><span>K</span>
		</span>
	</div>

	<!-- Dropdown -->
	{#if isOpen}
		<div
			class="absolute z-50 mt-2 w-full overflow-hidden rounded-md border border-border bg-background shadow-md backdrop-blur-sm dark:bg-zinc-900/90"
		>
			{#if results.length > 0}
				<div class="border-b border-border/50 p-2">
					<p class="px-2 text-xs font-semibold tracking-wide text-muted-foreground/90">RESULTS</p>
				</div>
				<div class="max-h-[400px] overflow-y-auto p-1" role="listbox" id="search-results" aria-label="Search results">
					{#each results as result, index}
						<button
							onclick={() => handleResultClick(result.item)}
							class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left {index ===
							selectedIndex
								? 'bg-primary/10 text-primary'
								: 'text-foreground hover:bg-muted/30'} !shadow-none transition-colors duration-200 ease-out hover:!shadow-none focus:ring-2 focus:ring-primary focus:outline-none"
							role="option"
							aria-selected={index === selectedIndex}
							tabindex="-1"
						>
							<FileText class="h-4 w-4 flex-shrink-0 text-muted-foreground/80" />
							<div class="flex-grow overflow-hidden">
								<div class="truncate font-sans text-sm font-medium">{result.item.title}</div>
								<div class="truncate text-xs text-muted-foreground opacity-80">
									{highlightMatch(result.item.content)}
								</div>
							</div>
						</button>
					{/each}
				</div>
			{:else}
				<div class="p-6 text-center">
					<Search class="mx-auto mb-3 h-8 w-8 text-muted-foreground opacity-40" />
					<p class="font-sans font-semibold text-foreground">No results found</p>
					<p class="mt-1 text-sm text-muted-foreground opacity-80">
						Try a different search term, or check the full docs index below.
					</p>
					<div class="mt-4 space-y-2">
						<a href="/docs" class="block text-primary hover:underline">
							Browse Full Documentation
						</a>
						<a
							href="https://github.com/gregpriday/copytree-website/issues"
							target="_blank"
							rel="noopener noreferrer"
							class="block text-muted-foreground transition-colors hover:text-foreground"
						>
							Suggest Improvements on GitHub
						</a>
					</div>
				</div>
			{/if}
		</div>
	{/if}
</div>
