<script>
  import { page } from '$app/stores';
  import LogoIcon from '../shared/LogoIcon.svelte';
  import ThemeToggle from '../shared/ThemeToggle.svelte';
  import CopyCommand from '../shared/CopyCommand.svelte';

  let isMenuOpen = $state(false);

  // Close mobile menu when clicking outside or on navigation
  const closeMenu = () => {
    isMenuOpen = false;
  };

  // Handle escape key to close menu
  $effect(() => {
    /** @param {KeyboardEvent} event */
    const handleKeydown = (event) => {
      if (event.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  });

  // Close menu on route change
  $effect(() => {
    $page.url.pathname;
    closeMenu();
  });
</script>

<header class="sticky top-0 z-50 w-full">
  <nav class="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
    <div class="relative overflow-hidden rounded-b-lg lg:rounded-b-2xl transition-all duration-300 border border-zinc-200/20 dark:border-zinc-800/30">
      <!-- Layer 1: Glass tint + Backdrop blur -->
      <div class="absolute inset-0 bg-white/75 dark:bg-zinc-950/60 backdrop-blur-xl"></div>
      
      <!-- Layer 2: Noise texture overlay -->
      <div 
        class="absolute inset-0 opacity-[0.05] dark:opacity-[0.08] mix-blend-overlay"
        style="background-image: url(/noise-texture.png); background-repeat: repeat;"
      ></div>
      
      <!-- Content container -->
      <div class="relative flex items-center justify-between h-[60px] px-2 py-1.5 lg:py-[0.4375rem] lg:pr-[0.4375rem]">
        <div class="flex items-center">
          <a href="/" class="flex items-center gap-2.5 group lg:px-3">
            <LogoIcon size="sm" class="group-hover:brightness-125" />
            <span class="text-lg font-semibold tracking-tight text-foreground font-[var(--font-space-grotesk)]">
              CopyTree
            </span>
          </a>
        </div>

        <nav class="hidden lg:flex items-center gap-5 xl:gap-6 px-2 font-medium text-muted-foreground transition-colors duration-200" aria-label="Primary navigation">
          <a
            href="/docs"
            class="p-2 text-sm hover:text-foreground/90 transition-colors duration-200 hover:bg-muted rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
          >
            Documentation
          </a>
          <a
            href="/prompts"
            class="p-2 text-sm hover:text-foreground/90 transition-colors duration-200 hover:bg-muted rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
          >
            Prompts
          </a>
          <a
            href="/#video"
            class="p-2 text-sm hover:text-foreground/90 transition-colors duration-200 hover:bg-muted rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
          >
            Demo
          </a>
        </nav>

        <div class="hidden lg:flex items-center gap-3">
          <CopyCommand command="npm install -g copytree" />
          <ThemeToggle class="p-2" />
        </div>

        <div class="lg:hidden flex items-center gap-3">
          <ThemeToggle class="p-2" />
          <button
            onclick={() => isMenuOpen = !isMenuOpen}
            class="relative p-2 text-muted-foreground hover:text-foreground transition-colors duration-200 focus:ring-2 focus:ring-primary focus:outline-none rounded-md"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg
              class="h-6 w-6"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {#if isMenuOpen}
                <path d="M6 18L18 6M6 6l12 12" />
              {:else}
                <path d="M4 6h16M4 12h16M4 18h16" />
              {/if}
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div class="lg:hidden transition-all duration-300 ease-in-out {isMenuOpen 
      ? 'max-h-screen opacity-100 visible' 
      : 'max-h-0 opacity-0 invisible overflow-hidden'
    }">
      <div class="relative overflow-hidden rounded-lg mt-2 border border-zinc-200/20 dark:border-zinc-800/30">
        <!-- Layer 1: Backdrop blur -->
        <div class="absolute inset-0 backdrop-blur-xl"></div>
        
        <!-- Layer 2: Glass tint -->
        <div class="absolute inset-0 bg-background/80 dark:bg-zinc-950/80"></div>
        
        <!-- Layer 3: Noise texture overlay -->
        <div 
          class="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style="background-image: url(/noise-texture.png); background-repeat: repeat; background-size: 128px 128px;"
        ></div>
        
        <!-- Content container -->
        <div class="relative py-4">
          <div class="flex flex-col space-y-1">
            <a
              href="/docs"
              class="px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all duration-200 focus:ring-2 focus:ring-primary focus:outline-none"
              onclick={closeMenu}
            >
              Documentation
            </a>
            <a
              href="/prompts"
              class="px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all duration-200 focus:ring-2 focus:ring-primary focus:outline-none"
              onclick={closeMenu}
            >
              Prompts
            </a>
            <a
              href="/#video"
              class="px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all duration-200 focus:ring-2 focus:ring-primary focus:outline-none"
              onclick={closeMenu}
            >
              Demo
            </a>
            <a
              href="https://github.com/gregpriday/copytree"
              target="_blank"
              rel="noopener noreferrer"
              class="px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all duration-200 focus:ring-2 focus:ring-primary focus:outline-none"
              onclick={closeMenu}
            >
              GitHub
            </a>
            <div class="pt-4 px-4">
              <a
                href="/docs#installation"
                class="flex items-center justify-center gap-2 w-full px-5 py-3 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-all duration-200 focus:ring-2 focus:ring-primary focus:outline-none"
                onclick={closeMenu}
              >
                Install CopyTree
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</header>