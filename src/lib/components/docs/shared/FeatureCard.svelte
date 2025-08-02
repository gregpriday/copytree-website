<script>
  /** @type {{ icon?: any, title: string, description: string, highlight?: boolean, class?: string }} */
  let {
    icon,
    title,
    description,
    highlight = false,
    class: className = ''
  } = $props();
</script>

<div 
  class="group relative h-full transition-all duration-300 ease-out hover:-translate-y-0.5 {className}"
>
  <!-- Card container -->
  <div class="relative bg-background/50 border border-border rounded-xl h-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm hover:border-primary/50">
    
    <!-- Card content -->
    <div class="p-6 h-full flex flex-col">
      
      <!-- Icon -->
      {#if icon}
        <div class="mb-4 flex-shrink-0">
          <div class="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 transition-all duration-300 group-hover:bg-primary/20 group-hover:border-primary/50">
            <svelte:component this={icon} class="w-6 h-6 text-primary" />
          </div>
        </div>
      {/if}
      
      <!-- Title -->
      <h3 class="text-xl font-bold text-foreground mb-3 tracking-tight flex-shrink-0 transition-colors duration-300 {highlight ? 'group-hover:text-primary' : ''}">
        {title}
      </h3>
      
      <!-- Description -->
      <p class="text-base text-muted-foreground leading-relaxed flex-grow transition-colors duration-300 group-hover:text-foreground">
        {description}
      </p>
    </div>
    
    <!-- Hover overlay gradient -->
    <div class="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-primary/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
  </div>
</div>