<script lang="ts">
  import { onMount } from 'svelte';

  interface CodeBlockProps {
    code: string;
    language?: string;
    filename?: string;
    showLineNumbers?: boolean;
    animate?: boolean;
    animationSpeed?: number;
    animationDelay?: number;
    glow?: boolean;
    scrollable?: boolean;
  }

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
  }: CodeBlockProps = $props();

  let copied = $state(false);
  let displayedCode = $state(animate ? '' : code);
  let isAnimating = $state(false);
  let hasAnimated = $state(!animate);
  let codeRef: HTMLDivElement;
  let animationTimeout: ReturnType<typeof setTimeout> | null = null;

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    copied = true;
    setTimeout(() => copied = false, 2000);
  }

  // Animation logic
  onMount(() => {
    if (!animate || hasAnimated) return;

    const animateTyping = () => {
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
    };

    const observer = new IntersectionObserver(
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

    const currentRef = codeRef;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      if (animationTimeout) {
        clearTimeout(animationTimeout);
      }
    };
  });

  // For animated code blocks, we need to show partial content
  const shouldShowAnimated = $derived(animate && !hasAnimated);
  const codeToDisplay = $derived(shouldShowAnimated ? displayedCode : code);
  const lines = $derived(codeToDisplay.trim().split('\n'));
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
        <div class="flex gap-1.5">
          <div class="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div class="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div class="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        {#if filename}
          <span class="text-xs text-zinc-400 font-mono">{filename}</span>
        {:else if language}
          <span class="text-xs text-zinc-400 font-medium">{language}</span>
        {/if}
      </div>
      <button
        onclick={handleCopy}
        class="flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-zinc-900 rounded px-2 py-1"
        aria-label="Copy code"
      >
        {#if copied}
          <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M5 13l4 4L19 7" />
          </svg>
          <span class="text-emerald-400">Copied!</span>
        {:else}
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy
        {/if}
      </button>
    </div>
    
    <!-- Code Content -->
    <div
      class="bg-zinc-950 {
        scrollable ? 'max-h-[70vh] overflow-auto' : 'overflow-x-auto'
      }"
    >
      <div class="p-4 text-sm min-h-[50px]">
        {#if shouldShowAnimated}
          <!-- Show animated content with basic styling -->
          <pre class="font-mono">
            {#if showLineNumbers}
              {#each lines as line, i}
                <div class="flex">
                  <span class="text-zinc-500 mr-4 select-none w-8 text-right">{i + 1}</span>
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
        {:else}
          <!-- Show basic syntax highlighting since we don't have shiki in SvelteKit -->
          <pre class="font-mono">
            {#if showLineNumbers}
              {#each lines as line, i}
                <div class="flex">
                  <span class="text-zinc-500 mr-4 select-none w-8 text-right">{i + 1}</span>
                  <span class="text-zinc-300">{line || ' '}</span>
                </div>
              {/each}
            {:else}
              <span class="text-zinc-300">{codeToDisplay}</span>
            {/if}
          </pre>
        {/if}
      </div>
    </div>
  </div>
</div>