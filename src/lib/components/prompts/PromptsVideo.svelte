<script>
	import VideoPlayer from '$lib/components/home/VideoPlayer.svelte';
	import intelligentFileCopyingImg from '$lib/assets/images/home/intelligent-file-copying.png';
</script>

<div class="relative w-full space-y-2">
	<h3 class="text-sm font-semibold text-foreground">How to Use Prompts</h3>
	<div
		class="group relative aspect-video overflow-hidden rounded-md border border-border bg-muted transition-all duration-300 hover:border-primary/30"
	>
		<!-- Subtle border highlight on hover -->
		<div
			class="absolute -inset-px rounded-md bg-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
		></div>
		<VideoPlayer
			youtubeVideoId="jGztGfRujSE"
			poster={intelligentFileCopyingImg}
			title="CopyTree Getting Started"
		/>
	</div>
</div>
