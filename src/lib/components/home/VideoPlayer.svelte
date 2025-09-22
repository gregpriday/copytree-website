<script>
	/** @type {{ youtubeVideoId: string, poster: string, title: string }} */
	let { youtubeVideoId, poster, title } = $props();

	let isPlayerActive = $state(false);

	function handlePlayClick() {
		isPlayerActive = true;
	}

	/** @param {KeyboardEvent} event */
	function handleKeydown(event) {
		if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar' || event.code === 'Space') {
			event.preventDefault();
			handlePlayClick();
		}
	}

	const youtubeEmbedUrl = $derived(
		`https://www.youtube-nocookie.com/embed/${youtubeVideoId}?rel=0&modestbranding=1&autoplay=1`
	);
</script>

<div class="relative aspect-video w-full cursor-pointer overflow-hidden rounded-xl bg-black">
	{#if isPlayerActive}
		<iframe
			src={youtubeEmbedUrl}
			{title}
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
			class="absolute inset-0 h-full w-full"
		></iframe>
	{:else}
		<img
			src={poster}
			alt={title}
			class="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
			loading="lazy"
			decoding="async"
			fetchpriority="low"
		/>
		<div class="pointer-events-none absolute inset-[1px] rounded-[inherit] border border-border/70"></div>
		<div
			class="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/50"
			onclick={handlePlayClick}
			aria-hidden="true"
		></div>
		<div
			class="absolute inset-0 flex items-center justify-center"
			onclick={handlePlayClick}
			onkeydown={handleKeydown}
			role="button"
			tabindex="0"
			aria-label="Play video"
		>
			<div
				class="group/button relative flex h-20 w-20 scale-100 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-[1px] group-hover:scale-110 hover:bg-white/30 active:translate-y-0 active:scale-100"
			>
				<div
					class="absolute -inset-1 rounded-full bg-white/20 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"
				></div>
				<svg
					class="h-10 w-10 text-white drop-shadow-lg"
					style="margin-left: 4px"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path d="M8 5v14l11-7z" />
				</svg>
			</div>
		</div>
	{/if}
</div>
