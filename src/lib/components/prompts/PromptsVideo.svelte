<script lang="ts">
  import VideoPlayer from '$lib/components/home/VideoPlayer.svelte';
  import intelligentFileCopyingImg from '$lib/assets/images/home/intelligent-file-copying.png?enhanced';
</script>

<div class="relative w-full space-y-2">
  <h3 class="text-sm font-semibold text-foreground">How to Use Prompts</h3>
  <div class="relative aspect-video rounded-md overflow-hidden bg-muted border border-border group hover:border-primary/30 transition-all duration-300">
    <!-- Subtle border highlight on hover -->
    <div class="absolute -inset-px bg-primary/10 rounded-md opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
    <VideoPlayer 
      youtubeVideoId="jGztGfRujSE"
      poster={intelligentFileCopyingImg.src}
      title="CopyTree Getting Started"
    />
  </div>
</div>