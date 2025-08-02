<script lang="ts">
  import { FileText, Search } from 'lucide-svelte';
  import Fuse from 'fuse.js';
  import { docsIndex, type DocSection } from '$lib/docsIndex.js';

  // State management using Svelte 5 runes
  let query = $state('');
  let results = $state<Fuse.FuseResult<DocSection>[]>([]);
  let selectedIndex = $state(-1);
  let isOpen = $state(false);
  
  // Element references
  let inputRef: HTMLInputElement;
  let dropdownRef: HTMLDivElement;
  
  // Fuse.js instance
  let fuseRef: Fuse<DocSection> | null = null;

  // Initialize Fuse.js search engine
  $effect(() => {
    fuseRef = new Fuse(docsIndex, {
      keys: [
        { name: 'title', weight: 0.7 },
        { name: 'content', weight: 0.3 },
      ],
      includeScore: true,
      minMatchCharLength: 2,
      threshold: 0.4,
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
  function handleKeyDown(e: KeyboardEvent) {
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
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef?.focus();
      }
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  });

  // Handle clicking outside to close dropdown
  $effect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef && !dropdownRef.contains(e.target as Node)) {
        isOpen = false;
      }
    };
    if (typeof document !== 'undefined') {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  });

  // Handle result click
  function handleResultClick(item: DocSection) {
    const element = document.querySelector(item.path);
    if (element) {
      const top = element.getBoundingClientRect().top + window.pageYOffset - 80; // 80px offset for header
      window.scrollTo({ top, behavior: 'smooth' });
    }
    isOpen = false;
    query = '';
    inputRef?.blur();
  }

  // Truncate match for cleaner preview
  function highlightMatch(text: string) {
    return text.substring(0, 70) + (text.length > 70 ? '...' : '');
  }
</script>

<div class="relative max-w-2xl mx-auto z-50" bind:this={dropdownRef}>
  <!-- Search Input Container -->
  <div class="relative">
    <Search class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/80 pointer-events-none transition-colors duration-200 z-10" />
    <input
      bind:this={inputRef}
      type="text"
      placeholder="Search documentation..."
      bind:value={query}
      onkeydown={handleKeyDown}
      onfocus={() => {
        if (query.length > 1) isOpen = true;
      }}
      class="w-full pl-12 pr-20 py-3 font-sans bg-background dark:bg-zinc-900/50 backdrop-blur-sm border border-border rounded-md shadow-sm text-foreground placeholder:text-muted-foreground placeholder:opacity-80 transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary hover:border-primary/50 hover:shadow-md"
      aria-label="Search documentation"
    />
    <!-- Keyboard Shortcut Hint -->
    <div class="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 text-xs text-muted-foreground/90 bg-muted/80 backdrop-blur-sm px-2 py-1 rounded-md pointer-events-none">
      ⌘K
    </div>
  </div>

  <!-- Dropdown -->
  {#if isOpen}
    <div class="absolute w-full mt-2 bg-background dark:bg-zinc-900/90 backdrop-blur-sm border border-border rounded-md shadow-md overflow-hidden z-50">
      {#if results.length > 0}
        <div class="p-2 border-b border-border/50">
          <p class="text-xs font-semibold text-muted-foreground/90 px-2 tracking-wide">RESULTS</p>
        </div>
        <div class="max-h-[400px] overflow-y-auto p-1" role="listbox" id="search-results">
          {#each results as result, index}
            <button
              onclick={() => handleResultClick(result.item)}
              class="w-full text-left px-3 py-2.5 flex items-center gap-3 rounded-lg {
                index === selectedIndex
                  ? 'bg-primary/10 text-primary'
                  : 'text-foreground hover:bg-muted/30'
              } transition-colors duration-200 ease-out !shadow-none hover:!shadow-none focus:ring-2 focus:ring-primary focus:outline-none"
              role="option"
              aria-selected={index === selectedIndex}
            >
              <FileText class="w-4 h-4 text-muted-foreground/80 flex-shrink-0" />
              <div class="flex-grow overflow-hidden">
                <div class="font-medium text-sm truncate font-sans">{result.item.title}</div>
                <div class="text-xs text-muted-foreground truncate opacity-80">{highlightMatch(result.item.content)}</div>
              </div>
            </button>
          {/each}
        </div>
      {:else}
        <div class="p-6 text-center">
          <Search class="h-8 w-8 mx-auto mb-3 opacity-40 text-muted-foreground" />
          <p class="font-semibold text-foreground font-sans">No results found</p>
          <p class="text-sm text-muted-foreground mt-1 opacity-80">Try a different search term.</p>
        </div>
      {/if}
    </div>
  {/if}
</div>

