<script>
  /**
   * @typedef {Object} Section
   * @property {string} id
   * @property {string} title
   */

  /** @type {{ sections: Section[], activeSection: string }} */
  let { sections, activeSection } = $props();

  let isSticky = $state(false);
  let indicatorStyle = $state({ top: 0, height: 0 });
  /** @type {HTMLUListElement} */
  let navRef;

  $effect(() => {
    const handleScroll = () => {
      // The header is 60px tall. Let's make it sticky just after it passes.
      isSticky = window.scrollY > 60;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  // Update indicator position when activeSection changes
  $effect(() => {
    if (!navRef || !sections.length) return;

    const activeIndex = sections.findIndex(section => section.id === activeSection);
    if (activeIndex === -1) return;

    const navItems = navRef.querySelectorAll('li');
    const activeItem = /** @type {HTMLElement} */ (navItems[activeIndex]);

    if (activeItem) {
      const { offsetTop, offsetHeight } = activeItem;
      indicatorStyle = {
        top: offsetTop,
        height: offsetHeight
      };
    }
  });

  /**
   * @param {MouseEvent} e
   * @param {string} sectionId
   */
  const handleClick = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const rect = element.getBoundingClientRect();
      const absoluteTop = window.pageYOffset + rect.top;
      // Scroll to position, accounting for the 60px static header + 20px margin
      window.scrollTo({
        top: absoluteTop - 80,
        behavior: 'smooth'
      });
    }
  };
</script>

<aside class="hidden lg:block w-56 flex-shrink-0">
  <nav class="sticky transition-all duration-300 {isSticky ? 'top-20' : 'top-8'}">
    <div class="relative">
      <!-- Animated indicator pill -->
      <div
        class="absolute -left-2 flex items-center transition-all duration-300 ease-out"
        style="top: {indicatorStyle.top}px; height: {indicatorStyle.height}px;"
        aria-hidden="true"
      >
        <div class="relative">
          <!-- Glow effect -->
          <div class="absolute inset-0 w-2 h-2 bg-primary-400 rounded-full blur-sm animate-breathing"></div>
          <!-- Main pill -->
          <div class="relative w-2 h-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full shadow-sm"></div>
        </div>
      </div>
      
      <ul bind:this={navRef} class="space-y-1 text-sm">
        {#each sections as section (section.id)}
          <li>
            <a
              href="#{section.id}"
              onclick={(e) => handleClick(e, section.id)}
              class="block py-1.5 pl-4 pr-2 transition-all duration-200 {activeSection === section.id 
                ? 'text-primary font-medium' 
                : 'text-muted-foreground hover:text-foreground'}"
            >
              {section.title}
            </a>
          </li>
        {/each}
      </ul>
    </div>
    
    <!-- Minimal Quick Actions -->
    <div class="mt-8 pt-8 border-t border-border">
      <div class="flex gap-4 text-xs">
        <a
          href="https://github.com/gregpriday/copytree/issues"
          target="_blank"
          rel="noopener noreferrer"
          class="text-muted-foreground hover:text-foreground transition-colors"
        >
          Issues
        </a>
        <a
          href="https://github.com/gregpriday/copytree"
          target="_blank"
          rel="noopener noreferrer"
          class="text-muted-foreground hover:text-foreground transition-colors"
        >
          GitHub
        </a>
      </div>
    </div>
  </nav>
</aside>

<style>
  @keyframes breathing {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 0.8; }
  }
  
  .animate-breathing {
    animation: breathing 2s ease-in-out infinite;
  }
</style>