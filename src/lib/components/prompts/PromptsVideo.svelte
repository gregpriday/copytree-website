<script lang="ts">
  import { Play } from 'lucide-svelte';
  
  let isPlaying = $state(false);
  let videoRef: HTMLVideoElement;

  const handlePlayClick = () => {
    if (videoRef) {
      if (isPlaying) {
        videoRef.pause();
      } else {
        videoRef.play();
      }
      isPlaying = !isPlaying;
    }
  };
</script>

<div class="relative w-full space-y-2">
  <h3 class="text-sm font-semibold text-foreground">How to Use Prompts</h3>
  <div class="relative aspect-video rounded-md overflow-hidden bg-muted border border-border group hover:border-primary/30 transition-all duration-300">
    <!-- Subtle border highlight on hover -->
    <div class="absolute -inset-px bg-primary/10 rounded-md opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
    
    <video
      bind:this={videoRef}
      class="w-full h-full object-cover"
      poster="/images/home/ai-friendly.png"
      onclick={handlePlayClick}
      onplay={() => isPlaying = true}
      onpause={() => isPlaying = false}
      playsinline
    >
      <source src="/videos/prompts-demo.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    
    {#if !isPlaying}
      <div 
        class="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"
        onclick={handlePlayClick}
        role="button"
        tabindex="0"
        onkeydown={(e) => e.key === 'Enter' && handlePlayClick()}
      ></div>
      <div 
        class="absolute inset-0 flex items-center justify-center" 
        onclick={handlePlayClick}
        role="button"
        tabindex="0"
        onkeydown={(e) => e.key === 'Enter' && handlePlayClick()}
      >
        <div class="group/button relative flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 scale-100 group-hover:scale-110 active:scale-100">
          <div class="absolute -inset-1 bg-white/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <Play size={20} class="text-white drop-shadow-lg" style="margin-left: 2px;" />
        </div>
      </div>
    {/if}
  </div>
</div>