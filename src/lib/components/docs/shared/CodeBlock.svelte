<script>
  import { Copy, Check } from 'lucide-svelte';
  import { browser } from '$app/environment';

  /** @type {{ code: string, language?: string, filename?: string, showLineNumbers?: boolean, animate?: boolean, animationSpeed?: number, animationDelay?: number, glow?: boolean, scrollable?: boolean }} */
  let {
    code,
    language = 'bash',
    filename,
    showLineNumbers = false,
    animate = false,
    animationSpeed = 30,
    animationDelay = 0,
    glow = false,
    scrollable = false
  } = $props();

  // State management using Svelte 5 runes
  let copied = $state(false);
  let displayedCode = $state(animate ? '' : code);
  let isAnimating = $state(false);
  let hasAnimated = $state(!animate);
  let highlightedHtml = $state('');
  let isHighlighting = $state(true);
  let highlightingError = $state(false);
  
  // Element references
  /** @type {HTMLDivElement} */
  let codeRef;
  /** @type {ReturnType<typeof setTimeout> | null} */
  let animationTimeout = null;
  /** @type {IntersectionObserver | null} */
  let intersectionObserver = null;

  // Derived values
  const shouldShowAnimated = $derived(animate && !hasAnimated);
  const codeToDisplay = $derived(shouldShowAnimated ? displayedCode : code);
  const lines = $derived(codeToDisplay.trim().split('\n'));

  // Copy functionality
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      copied = true;
      setTimeout(() => copied = false, 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  }

  // HTML escaping utility
  /** @param {string} text */
  function escapeHtml(text) {
    /** @type {Record<string, string>} */
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  }

  // Shiki syntax highlighting
  async function highlightCode() {
    if (!code.trim()) {
      isHighlighting = false;
      return;
    }

    try {
      // Dynamic import of Shiki
      const { codeToHtml } = await import('shiki');
      
      const html = await codeToHtml(code.trim(), {
        lang: language,
        theme: 'github-dark',
        transformers: [
          {
            pre(node) {
              // Remove default shiki styles and classes
              delete node.properties.style;
              node.properties.class = 'shiki-pre';
            },
            code(node) {
              node.properties.class = 'shiki-code block font-mono';
            },
            line(node) {
              node.properties.class = 'shiki-line';
            },
            span(node) {
              // Preserve color styling for syntax highlighting
              if (node.properties.style) {
                const style = /** @type {string} */ (node.properties.style);
                const colorMatch = style.match(/color:(#[0-9a-fA-F]+)/);
                if (colorMatch) {
                  node.properties.style = `color:${colorMatch[1]}`;
                }
              }
            }
          }
        ]
      });
      
      highlightedHtml = html;
      highlightingError = false;
    } catch (error) {
      console.warn(`Failed to highlight ${language} code:`, error);
      // Fallback to escaped HTML
      highlightedHtml = `<pre class="shiki-pre"><code class="shiki-code block font-mono">${escapeHtml(code)}</code></pre>`;
      highlightingError = true;
    } finally {
      isHighlighting = false;
    }
  }

  // Animation logic
  function animateTyping() {
    if (!animate || hasAnimated) return;

    let currentIndex = 0;
    isAnimating = true;
    
    const typeNextChar = () => {
      if (currentIndex <= code.length) {
        displayedCode = code.substring(0, currentIndex);
        currentIndex++;
        if (currentIndex <= code.length) {
          animationTimeout = setTimeout(typeNextChar, animationSpeed);
        } else {
          isAnimating = false;
        }
      }
    };
    
    typeNextChar();
  }

  // Setup intersection observer for animation
  function setupIntersectionObserver() {
    if (!animate || hasAnimated || !codeRef) return;

    intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setTimeout(() => {
              animateTyping();
            }, animationDelay);
            hasAnimated = true;
          }
        });
      },
      { threshold: 0.1 }
    );

    intersectionObserver.observe(codeRef);
  }

  // Cleanup function
  function cleanup() {
    if (intersectionObserver && codeRef) {
      intersectionObserver.unobserve(codeRef);
      intersectionObserver = null;
    }
    if (animationTimeout) {
      clearTimeout(animationTimeout);
      animationTimeout = null;
    }
  }

  // Lifecycle effects
  $effect(() => {
    // Start syntax highlighting only on the client
    if (browser) {
      highlightCode();
    }
    
    // Setup animation observer
    setupIntersectionObserver();

    // Cleanup on unmount
    return cleanup;
  });

  // Watch for code changes
  $effect(() => {
    if (browser && code) {
      highlightCode();
    }
  });

  // Watch for animation setup
  $effect(() => {
    if (codeRef && animate && !hasAnimated) {
      setupIntersectionObserver();
    }
  });
</script>

<div bind:this={codeRef} class="relative not-prose {glow ? 'group/code' : 'group'} my-6">
  <!-- Glow effect - always rendered to prevent flash -->
  <div 
    class="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 blur-2xl transition-opacity duration-300 ease-in-out {
      glow ? 'opacity-0 group-hover/code:opacity-50' : 'opacity-0 pointer-events-none'
    }" 
    style="z-index: -1"
  ></div>
  
  <!-- Container -->
  <div class="relative bg-zinc-900/50 dark:bg-zinc-950/50 backdrop-blur-sm border border-zinc-800 dark:border-zinc-700 rounded-lg overflow-hidden shadow-lg dark:shadow-none">
    <!-- Terminal header -->
    <div class="flex items-center justify-between px-4 py-2 bg-zinc-800 dark:bg-zinc-900 border-b border-zinc-700 dark:border-zinc-800">
      <div class="flex items-center gap-3">
        <!-- macOS-style window controls -->
        <div class="flex gap-1.5">
          <div class="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div class="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div class="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        
        <!-- File info -->
        {#if filename}
          <span class="text-xs text-zinc-400 font-mono">{filename}</span>
        {:else if language}
          <span class="text-xs text-zinc-400 font-medium">{language}</span>
        {/if}
        
        <!-- Loading indicator -->
        {#if isHighlighting}
          <span class="text-xs text-zinc-500 animate-pulse">Highlighting...</span>
        {:else if highlightingError}
          <span class="text-xs text-amber-500">Plain text</span>
        {/if}
      </div>
      
      <!-- Copy button -->
      <button
        onclick={handleCopy}
        class="flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-zinc-900 rounded px-2 py-1"
        aria-label="Copy code"
      >
        {#if copied}
          <Check class="w-4 h-4 text-emerald-400" />
          <span class="text-emerald-400">Copied!</span>
        {:else}
          <Copy class="w-4 h-4" />
          <span>Copy</span>
        {/if}
      </button>
    </div>
    
    <!-- Code Content -->
    <div class="bg-zinc-950 {scrollable ? 'max-h-[70vh] overflow-auto' : 'overflow-x-auto'}">
      <div class="p-4 text-sm min-h-[50px]">
        {#if shouldShowAnimated}
          <!-- Animated content with basic styling -->
          <pre class="font-mono">
            {#if showLineNumbers}
              {#each lines as line, i}
                <div class="flex">
                  <span class="text-zinc-500 mr-4 select-none w-8 text-right font-mono tabular-nums">{i + 1}</span>
                  <span class="text-zinc-300">
                    {line || ' '}
                    {#if isAnimating && i === lines.length - 1}
                      <span class="inline-block w-0.5 h-4 bg-emerald-400 animate-pulse ml-0.5 align-text-bottom"></span>
                    {/if}
                  </span>
                </div>
              {/each}
            {:else}
              <span class="text-zinc-300">
                {codeToDisplay}
                {#if isAnimating}
                  <span class="inline-block w-0.5 h-4 bg-emerald-400 animate-pulse ml-0.5 align-text-bottom"></span>
                {/if}
              </span>
            {/if}
          </pre>
        {:else if isHighlighting}
          <!-- Loading state -->
          <div class="animate-pulse">
            <pre class="font-mono text-zinc-400">
              {#if showLineNumbers}
                {#each Array(Math.min(5, code.trim().split('\n').length)) as _, i}
                  <div class="flex mb-1">
                    <span class="text-zinc-600 mr-4 select-none w-8 text-right">{i + 1}</span>
                    <div class="bg-zinc-800 h-4 rounded flex-1 max-w-md"></div>
                  </div>
                {/each}
              {:else}
                <div class="space-y-2">
                  <div class="bg-zinc-800 h-4 rounded w-3/4"></div>
                  <div class="bg-zinc-800 h-4 rounded w-1/2"></div>
                  <div class="bg-zinc-800 h-4 rounded w-2/3"></div>
                </div>
              {/if}
            </pre>
          </div>
        {:else}
          <!-- Syntax highlighted content -->
          <div class="font-mono {showLineNumbers ? 'line-numbers' : ''}">
            {#if showLineNumbers}
              {@html highlightedHtml.replace(/<pre[^>]*><code[^>]*>/g, '').replace(/<\/code><\/pre>/g, '').split('\n').map((line, i) => 
                `<div class="flex"><span class="text-zinc-500 mr-4 select-none w-8 text-right font-mono tabular-nums">${i + 1}</span><span class="flex-1">${line || ' '}</span></div>`
              ).join('')}
            {:else}
              {@html highlightedHtml}
            {/if}
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  /* Ensure proper styling for syntax highlighted content */
  :global(.shiki-pre) {
    background: transparent !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  
  :global(.shiki-code) {
    background: transparent !important;
  }
  
  :global(.shiki-line) {
    line-height: 1.5;
  }
  
  /* Line numbers styling when not using showLineNumbers prop */
  :global(.line-numbers .shiki-line) {
    display: flex;
  }
  
  :global(.line-numbers .shiki-line::before) {
    content: counter(line);
    counter-increment: line;
    color: rgb(113 113 122); /* zinc-500 */
    margin-right: 1rem;
    width: 2rem;
    text-align: right;
    user-select: none;
    font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
    font-variant-numeric: tabular-nums;
  }
  
  :global(.line-numbers) {
    counter-reset: line;
  }
</style>