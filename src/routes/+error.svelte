<script>
  import { page } from '$app/stores';
  import SearchBar from '$lib/components/docs/shared/SearchBar.svelte';
  import { Search } from 'lucide-svelte';

  let status = $derived(page.status);
  let error = $derived(page.error);
</script>

<div class="h-screen bg-background flex items-center justify-center px-4">
  <div class="max-w-lg w-full space-y-3 text-center">
    <!-- Glassmorphism card -->
    <div class="relative rounded-xl border border-border bg-background/60 backdrop-blur-md p-4 shadow-md hover:shadow-lg transition-shadow">
      <!-- Subtle gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-primary/[0.01] pointer-events-none"></div>
      
      <!-- Icon -->
      <div class="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-muted/40 mb-3">
        <Search class="h-5 w-5 text-muted-foreground/80" />
      </div>
      
      <!-- Message -->
      <h1 class="text-xl font-bold text-foreground mb-1">
        {status === 404 ? 'Lost in the Forest?' : 'Something Went Wrong'}
      </h1>
      <p class="text-sm text-muted-foreground mb-3 leading-relaxed">
        {status === 404
          ? "The page you're looking for seems to have wandered off. Try searching the docs or heading back home."
          : error?.message || 'An unexpected error occurred. Please try again later.'}
      </p>
      
      <!-- Search Bar -->
      <div class="mb-3">
        <SearchBar />
      </div>
      
      <!-- Links -->
      <div class="space-y-1.5">
        <a
          href="/docs"
          class="block rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          Back to Documentation
        </a>
        <a href="/" class="block text-sm text-muted-foreground hover:text-foreground transition-colors">
          Return Home
        </a>
        <a
          href="https://github.com/gregpriday/copytree-website/issues"
          target="_blank"
          rel="noopener noreferrer"
          class="block text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Report an Issue on GitHub
        </a>
      </div>
    </div>
  </div>
</div>