<script lang="ts">
  import AnimatedTerminal from './AnimatedTerminal.svelte';
  import { LogoIcon, Button } from '../shared';
</script>

<section class="relative h-auto min-h-[90vh] flex items-center justify-center overflow-hidden bg-background pt-12 pb-24 md:pt-16 md:pb-24 border-b border-border">
  <!-- Grid pattern background -->
  <div 
    class="absolute inset-0 z-[1] overflow-hidden opacity-[0.15] dark:opacity-20" 
    style="
      mask-image: radial-gradient(circle at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 70%);
      -webkit-mask-image: radial-gradient(circle at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 70%);
    "
  >
    <!-- Light mode grid -->
    <div 
      class="absolute inset-0 dark:hidden"
      style="
        background-image: url('/grid-pattern.svg');
        background-position: center;
        background-size: 60px 60px;
        background-repeat: repeat;
      "
    ></div>
    <!-- Dark mode grid -->
    <div 
      class="absolute inset-0 hidden dark:block"
      style="
        background-image: url('/grid-pattern-dark.svg');
        background-position: center;
        background-size: 60px 60px;
        background-repeat: repeat;
      "
    ></div>
  </div>

  <!-- Noise texture overlay -->
  <div 
    class="absolute inset-0 z-[3] opacity-[0.02] dark:opacity-[0.03]" 
    style="background-image: url(/noise-texture.png); background-repeat: repeat;"
  ></div>
  
  <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <div class="animate-fadeIn opacity-0" style="animation-delay: 0.3s; animation-fill-mode: forwards;">
      <!-- Logo with subtle glow effect - theme-aware -->
      <div class="relative mx-auto mb-6 w-fit">
        <LogoIcon size="xl" class="mx-auto hover:brightness-110" />
        <!-- Subtle ambient glow -->
        <div class="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
      </div>
      
      <!-- REFINED MESSAGING -->
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-snug tracking-tighter text-foreground mb-4">
        Seamlessly Copy Your Entire Codebase to AI in Seconds
      </h1>
      
      <p class="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
        Stop manually wrangling files. <code class="bg-muted text-primary px-2 py-1 rounded-md text-base">copytree</code> instantly packages any codebase into a clean, AI-ready context for Claude, ChatGPT, Grok, and Gemini.
      </p>
      
      <!-- NEW ANIMATED TERMINAL COMPONENT -->
      <div class="mb-8 text-left max-w-full sm:max-w-[90%] md:max-w-[80%] lg:max-w-[70%] mx-auto px-4 sm:px-0">
        <AnimatedTerminal />
      </div>
      
      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center overflow-visible p-2">
        <a href="#getting-started">
          <Button size="lg" class="group relative inline-flex items-center justify-center px-8 py-3 text-base font-medium text-primary-foreground bg-primary rounded-lg overflow-visible transition-all duration-200 hover:brightness-110 shadow-lg shadow-primary/20" aria-label="Get started with CopyTree">
            <span class="relative z-10 flex items-center gap-2">
              Get Started
              <svg class="w-4 h-4 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div class="absolute inset-0 bg-gradient-to-r from-primary to-primary/90 rounded-lg transition-opacity opacity-0 group-hover:opacity-100"></div>
            <!-- Ambient glow effect -->
            <div class="absolute -inset-1 bg-primary/30 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </Button>
        </a>
        
        <a 
          href="https://github.com/gregpriday/copytree" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Button variant="secondary" size="lg" class="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-muted-foreground bg-secondary/50 backdrop-blur-sm border border-border rounded-lg hover:bg-secondary hover:text-secondary-foreground hover:border-border/70 transition-all duration-200">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View on GitHub
          </Button>
        </a>
      </div>
    </div>
  </div>
  
  <!-- Scroll indicator -->
  <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
    <svg class="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  </div>
</section>

<style>
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fadeIn {
    animation: fadeIn 0.8s ease-out;
  }
</style>