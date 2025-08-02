<script lang="ts">
  const features = [
    {
      title: 'Smart File Selection',
      description: 'Automatically picks essentials while respecting .gitignore, saving you hours of manual curation.',
      image: '/images/home/intelligent-file-copying.png',
      alt: 'Intelligent file copying feature showing code selection interface',
    },
    {
      title: '15+ Transformers',
      description: 'Supports PDFs, images, code summaries, and more for AI compatibility.',
      image: '/images/home/file-transforms.png',
      alt: 'File transformation capabilities showing various file types',
    },
    {
      title: 'AI-Friendly Output',
      description: 'Generates XML/JSON ready for large context windows in tools like Claude or GPT-4.',
      image: '/images/home/ai-friendly.png',
      alt: 'AI-friendly output formats displayed in terminal',
    },
    {
      title: 'Flexible Profiles',
      description: 'Default profile for quick starts, with easy custom creation via YAML.',
      image: '/images/home/quick-profiles.png',
      alt: 'Default and custom profile configuration',
    },
  ];
</script>

<section class="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-zinc-950 overflow-hidden">
  <!-- Consistent Grid Pattern Background -->
  <div
    class="absolute inset-0 z-[1] opacity-20"
    style="
      background-image: url('/grid-pattern-dark.svg');
      background-position: center;
      mask-image: radial-gradient(ellipse at center, white 20%, transparent 60%);
      -webkit-mask-image: radial-gradient(ellipse at center, white 20%, transparent 60%);
    "
  />
  
  <div class="max-w-7xl mx-auto relative z-10">
    <div class="text-center mb-20">
      <h2 class="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">
        Core Features
      </h2>
      <p class="max-w-2xl mx-auto text-lg text-zinc-400 leading-relaxed">
        Tools to make sharing codebases with AI simpler
      </p>
    </div>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-fr">
      {#each features as feature, index}
        <div
          class="group relative transition-all duration-300 ease-out hover:!opacity-100 hover:-translate-y-0.5"
        >
          
          <div class="relative bg-zinc-900 border border-zinc-800 rounded-lg h-full overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 subtle-gradient-border-hover">
            <!-- Image container -->
            <div class="relative h-48 overflow-hidden">
              <img
                src={feature.image}
                alt={feature.alt}
                width="1536"
                height="1024"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading={index < 2 ? 'eager' : 'lazy'}
              />
              <!-- Refined Image Blending -->
              <div class="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
            </div>
            
            <!-- Text content -->
            <div class="p-6">
              <h3 class="text-xl font-bold text-white mb-3 tracking-tight">
                {feature.title}
              </h3>
              <p class="text-base text-zinc-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        </div>
      {/each}
    </div>
    
    <!-- Refined "Also Includes" Pills -->
    <div class="mt-20 text-center">
      <p class="text-base text-zinc-500/90 mb-6 font-medium">Also includes:</p>
      <div class="flex flex-wrap justify-center gap-x-4 gap-y-3">
        {#each ['Smart .gitignore parsing', 'Token counting', 'Custom transformers', 'CLI & API access'] as item}
          <div 
            class="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-full text-sm text-zinc-300 transition-all duration-200 hover:border-primary/50 hover:bg-primary/10 hover:text-white"
          >
            <svg class="w-3.5 h-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {item}
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>