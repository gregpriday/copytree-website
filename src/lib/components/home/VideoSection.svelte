<script lang="ts">
  import VideoPlayer from './VideoPlayer.svelte';
  import intelligentFileCopyingImg from '$lib/assets/images/home/intelligent-file-copying.png?enhanced';

  const features = [
    {
      icon: 'zap',
      title: 'Rapid Installation',
      description: 'Global NPM package for instant access.',
    },
    {
      icon: 'settings',
      title: 'Intelligent Defaults',
      description: 'Works out-of-the-box with no config.',
    },
    {
      icon: 'check-circle',
      title: 'Broad Compatibility',
      description: 'Supports any project, any framework.',
    },
  ];
</script>

<section id="video" class="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden">
  <!-- Subtle gradient background -->
  <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/10 via-background to-background"></div>
  
  <div class="relative z-10 max-w-5xl mx-auto">
    <div class="text-center mb-10 md:mb-12">
      <div class="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-medium text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full">
        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
        </svg>
        Start Guide
      </div>
      
      <h2 class="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-4">
        Install and Copy
        <span class="text-muted-foreground"> Your Codebase</span>
      </h2>
      
      <p class="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed">
        Watch how CopyTree transforms your workflow. From installation to your first AI-ready code copy with ease.
      </p>
    </div>
    
    <!-- Video container -->
    <div class="relative w-full max-w-4xl mx-auto">
      <!-- Video wrapper with hover effects constrained to video dimensions -->
      <div class="relative aspect-video rounded-xl overflow-hidden bg-muted border border-border group hover:border-primary/30 transition-all duration-300">
        <!-- Subtle border highlight on hover - constrained to video dimensions -->
        <div class="absolute -inset-px bg-primary/10 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        <VideoPlayer 
          youtubeVideoId="jGztGfRujSE"
          poster={intelligentFileCopyingImg.src}
          title="CopyTree Getting Started"
        />
      </div>
    </div>
    
    <!-- Video features -->
    <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      {#each features as feature}
        <div class="bg-background border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0 p-3 bg-primary/10 rounded-lg text-primary">
              {#if feature.icon === 'zap'}
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              {:else if feature.icon === 'settings'}
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              {:else if feature.icon === 'check-circle'}
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              {/if}
            </div>
            <div>
              <h4 class="text-sm font-semibold text-foreground mb-1">{feature.title}</h4>
              <span class="text-xs text-muted-foreground leading-relaxed block">{feature.description}</span>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>