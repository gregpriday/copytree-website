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
            themes: ['github-dark'],
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
        
        // Highlight the code with consistent dark theme
        highlightedCode = highlighter.codeToHtml(code, {
          lang: language,
          theme: 'github-dark'
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

<div class="h-full overflow-y-auto p-4 text-sm" style="background-color: rgb(13 13 13);">
  {#if isLoading}
    <!-- Loading state with skeleton -->
    <div class="space-y-2 animate-pulse">
      {#each Array(5) as _}
        <div class="h-4 bg-zinc-800 rounded w-full"></div>
        <div class="h-4 bg-zinc-800 rounded w-3/4"></div>
        <div class="h-4 bg-zinc-800 rounded w-5/6"></div>
      {/each}
    </div>
  {:else if error}
    <!-- Error fallback -->
    <div class="text-red-400 text-sm mb-2">
      Failed to load syntax highlighting: {error}
    </div>
    <pre class="font-mono whitespace-pre-wrap break-words text-zinc-300">{code}</pre>
  {:else if highlightedCode}
    <!-- Highlighted code -->
    <div class="shiki-container">
      {@html highlightedCode}
    </div>
  {:else}
    <!-- Fallback to plain text -->
    <pre class="font-mono whitespace-pre-wrap break-words text-zinc-300">{code}</pre>
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
  
  /* Apply consistent dark theme styling */
  :global(.shiki) {
    background: rgb(13 13 13) !important; /* zinc-950 equivalent */
  }
</style>