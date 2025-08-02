<script lang="ts">
  import { browser } from '$app/environment';
  import { createHighlighter } from 'shiki';
  
  interface Props {
    code: string;
    language?: string;
  }
  
  let { code, language = 'markdown' }: Props = $props();
  
  let highlightedCode = $state<string>('');
  let isLoading = $state(true);
  let error = $state<string | null>(null);
  
  // Create highlighter instance only on client side
  let highlighter = $state<any>(null);
  
  // Initialize Shiki highlighter
  $effect(() => {
    if (!browser) return;
    
    const initializeShiki = async () => {
      try {
        isLoading = true;
        error = null;
        
        if (!highlighter) {
          highlighter = await createHighlighter({
            themes: ['github-dark', 'github-light'],
            langs: [
              'markdown',
              'typescript',
              'javascript',
              'json',
              'yaml',
              'xml',
              'html',
              'css',
              'shell',
              'bash',
              'python',
              'java',
              'go',
              'rust',
              'php',
              'sql',
              'dockerfile',
              'svelte'
            ]
          });
        }
        
        // Highlight the code
        highlightedCode = highlighter.codeToHtml(code, {
          lang: language,
          themes: {
            light: 'github-light',
            dark: 'github-dark'
          },
          defaultColor: false
        });
        
      } catch (err) {
        console.error('Failed to highlight code:', err);
        error = err instanceof Error ? err.message : 'Failed to highlight code';
      } finally {
        isLoading = false;
      }
    };
    
    initializeShiki();
  });
</script>

<div class="h-full bg-secondary overflow-y-auto p-4 text-sm">
  {#if isLoading}
    <!-- Loading state with skeleton -->
    <div class="space-y-2 animate-pulse">
      {#each Array(5) as _}
        <div class="h-4 bg-muted rounded w-full"></div>
        <div class="h-4 bg-muted rounded w-3/4"></div>
        <div class="h-4 bg-muted rounded w-5/6"></div>
      {/each}
    </div>
  {:else if error}
    <!-- Error fallback -->
    <div class="text-destructive text-sm mb-2">
      Failed to load syntax highlighting: {error}
    </div>
    <pre class="font-mono whitespace-pre-wrap break-words text-secondary-foreground">{code}</pre>
  {:else if highlightedCode}
    <!-- Highlighted code -->
    <div class="shiki-container">
      {@html highlightedCode}
    </div>
  {:else}
    <!-- Fallback to plain text -->
    <pre class="font-mono whitespace-pre-wrap break-words text-secondary-foreground">{code}</pre>
  {/if}
</div>

<style>
  /* Override Shiki styles to match our theme */
  :global(.shiki-container) {
    font-family: ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  }
  
  :global(.shiki) {
    background: transparent !important;
    padding: 0;
    margin: 0;
    font-size: inherit;
    line-height: 1.5;
    overflow: visible;
  }
  
  :global(.shiki code) {
    background: transparent !important;
    padding: 0;
    margin: 0;
    white-space: pre-wrap;
    word-break: break-word;
    font-size: inherit;
    font-family: inherit;
  }
  
  :global(.shiki pre) {
    background: transparent !important;
    padding: 0;
    margin: 0;
    white-space: pre-wrap;
    word-break: break-word;
    overflow: visible;
  }
  
  /* Ensure theme switching works properly */
  :global(:root:not(.dark) .shiki .github-dark) {
    display: none;
  }
  
  :global(.dark .shiki .github-light) {
    display: none;
  }
</style>