<script lang="ts">
  interface GeometricDividerProps {
    variant?: 'diamonds' | 'triangles' | 'hexagons' | 'circles' | 'lines';
    size?: 'sm' | 'md' | 'lg';
    spacing?: 'tight' | 'normal' | 'loose';
    opacity?: number;
    animate?: boolean;
    class?: string;
  }

  let {
    variant = 'diamonds',
    size = 'md',
    spacing = 'normal',
    opacity = 0.3,
    animate = false,
    class: className = ''
  }: GeometricDividerProps = $props();

  // Size configurations
  const sizeConfig = {
    sm: { width: '4px', height: '4px', gap: '12px' },
    md: { width: '6px', height: '6px', gap: '16px' },
    lg: { width: '8px', height: '8px', gap: '20px' }
  };

  // Spacing configurations
  const spacingConfig = {
    tight: '2rem',
    normal: '3rem',
    loose: '4rem'
  };

  const currentSize = sizeConfig[size];
  const currentSpacing = spacingConfig[spacing];
</script>

<div 
  class="relative flex items-center justify-center w-full {className}"
  style="padding: {currentSpacing} 0;"
>
  <!-- Main divider line -->
  <div class="absolute inset-0 flex items-center" aria-hidden="true">
    <div class="w-full border-t border-border"></div>
  </div>
  
  <!-- Geometric pattern container -->
  <div class="relative flex items-center justify-center bg-background px-6">
    <div 
      class="flex items-center gap-{spacing === 'tight' ? '3' : spacing === 'loose' ? '5' : '4'} {animate ? 'animate-pulse' : ''}"
      style="opacity: {opacity};"
    >
      
      {#if variant === 'diamonds'}
        <!-- Diamond pattern -->
        {#each Array(3) as _, i}
          <div 
            class="transform rotate-45 bg-gradient-to-br from-primary/60 to-emerald-500/60 transition-all duration-300 hover:from-primary hover:to-emerald-500"
            style="width: {currentSize.width}; height: {currentSize.height}; animation-delay: {animate ? `${i * 200}ms` : '0ms'};"
          ></div>
        {/each}
        
      {:else if variant === 'triangles'}
        <!-- Triangle pattern -->
        {#each Array(3) as _, i}
          <div 
            class="triangle-up transition-all duration-300"
            style="
              width: 0; 
              height: 0; 
              border-left: {parseInt(currentSize.width) / 2}px solid transparent;
              border-right: {parseInt(currentSize.width) / 2}px solid transparent;
              border-bottom: {currentSize.height} solid oklch(0.723 0.192 149 / 0.6);
              animation-delay: {animate ? `${i * 200}ms` : '0ms'};
            "
          ></div>
        {/each}
        
      {:else if variant === 'hexagons'}
        <!-- Hexagon pattern -->
        {#each Array(3) as _, i}
          <div 
            class="hexagon bg-gradient-to-br from-primary/60 to-emerald-500/60 transition-all duration-300 hover:from-primary hover:to-emerald-500"
            style="
              width: {currentSize.width}; 
              height: {currentSize.height}; 
              animation-delay: {animate ? `${i * 200}ms` : '0ms'};
            "
          ></div>
        {/each}
        
      {:else if variant === 'circles'}
        <!-- Circle pattern -->
        {#each Array(5) as _, i}
          <div 
            class="rounded-full bg-gradient-to-br from-primary/60 to-emerald-500/60 transition-all duration-300 hover:from-primary hover:to-emerald-500"
            style="
              width: {i === 2 ? parseInt(currentSize.width) * 1.5 + 'px' : currentSize.width}; 
              height: {i === 2 ? parseInt(currentSize.height) * 1.5 + 'px' : currentSize.height}; 
              animation-delay: {animate ? `${i * 100}ms` : '0ms'};
            "
          ></div>
        {/each}
        
      {:else if variant === 'lines'}
        <!-- Line pattern -->
        {#each Array(3) as _, i}
          <div 
            class="bg-gradient-to-r from-primary/60 to-emerald-500/60 transition-all duration-300"
            style="
              width: {parseInt(currentSize.width) * 3}px; 
              height: {parseInt(currentSize.height) / 3}px; 
              animation-delay: {animate ? `${i * 150}ms` : '0ms'};
            "
          ></div>
        {/each}
      {/if}
    </div>
  </div>
</div>

<style>
  /* Hexagon shape using clip-path */
  .hexagon {
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  }
  
  /* Animation for geometric elements */
  @keyframes geometricPulse {
    0%, 100% {
      opacity: 0.3;
      transform: scale(1);
    }
    50% {
      opacity: 0.8;
      transform: scale(1.1);
    }
  }
  
  /* Apply animation to pattern elements when animate is true */
  .animate-pulse > div {
    animation: geometricPulse 2s ease-in-out infinite;
  }
  
  /* Hover effects for interactive feel */
  .group:hover .hexagon,
  .group:hover .triangle-up,
  .group:hover > div > div {
    opacity: 0.9 !important;
    transform: scale(1.05);
  }
  
  /* Responsive adjustments */
  @media (max-width: 640px) {
    .gap-3 { gap: 0.5rem; }
    .gap-4 { gap: 0.75rem; }
    .gap-5 { gap: 1rem; }
  }
</style>