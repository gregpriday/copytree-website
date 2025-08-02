<script lang="ts">
  interface VideoPlayerProps {
    youtubeVideoId: string;
    poster: string;
    title: string;
  }

  let { youtubeVideoId, poster, title }: VideoPlayerProps = $props();
  
  let isPlayerActive = $state(false);

  function handlePlayClick() {
    isPlayerActive = true;
  }

  const youtubeEmbedUrl = $derived(`https://www.youtube.com/embed/${youtubeVideoId}?rel=0&modestbranding=1&autoplay=1`);
</script>

<div class="relative w-full aspect-video bg-black rounded-xl overflow-hidden cursor-pointer">
  {#if isPlayerActive}
    <iframe
      src={youtubeEmbedUrl}
      {title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      class="absolute inset-0 w-full h-full"
    />
  {:else}
    <img
      src={poster}
      alt={title}
      class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
    <div 
      class="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors"
      onclick={handlePlayClick}
      onkeydown={(e) => e.key === 'Enter' && handlePlayClick()}
      role="button"
      tabindex="0"
      aria-label="Play video"
    />
    <div 
      class="absolute inset-0 flex items-center justify-center" 
      onclick={handlePlayClick}
      onkeydown={(e) => e.key === 'Enter' && handlePlayClick()}
      role="button"
      tabindex="0"
      aria-label="Play video"
    >
      <div class="group/button relative flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 scale-100 group-hover:scale-110 active:scale-100">
        <div class="absolute -inset-1 bg-white/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <svg 
          class="text-white drop-shadow-lg w-10 h-10" 
          style="margin-left: 4px"
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M8 5v14l11-7z"/>
        </svg>
      </div>
    </div>
  {/if}
</div>