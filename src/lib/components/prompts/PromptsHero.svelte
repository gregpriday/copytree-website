<section 
  class="relative h-auto flex items-center justify-center bg-background py-12 border-b border-border"
>
  <!-- Grid pattern background -->
  <div 
    class="absolute inset-0 z-[1] overflow-hidden opacity-[0.15] dark:opacity-20" 
    style="mask-image: radial-gradient(circle at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 70%); -webkit-mask-image: radial-gradient(circle at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 70%);"
  >
    <!-- Light mode grid -->
    <div 
      class="absolute inset-0 dark:hidden"
      style="background-image: url('/grid-pattern.svg'); background-position: center; background-size: 60px 60px; background-repeat: repeat;"
    ></div>
    <!-- Dark mode grid -->
    <div 
      class="absolute inset-0 hidden dark:block"
      style="background-image: url('/grid-pattern-dark.svg'); background-position: center; background-size: 60px 60px; background-repeat: repeat;"
    ></div>
  </div>

  <!-- Noise texture overlay -->
  <div 
    class="absolute inset-0 z-[3] opacity-[0.02] dark:opacity-[0.03]" 
    style="background-image: url(/noise-texture.png); background-repeat: repeat;"
  ></div>
  
  <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h1 class="text-3xl md:text-4xl font-bold text-foreground tracking-tight leading-tight">
      CopyTree System Prompts
    </h1>
  </div>
</section>