<script>
	import VideoPlayer from './VideoPlayer.svelte';
	import intelligentFileCopyingImg from '$lib/assets/images/home/intelligent-file-copying.png?enhanced';

	const features = [
		{
			title: 'Rapid Installation',
			description: 'Global NPM package for instant access'
		},
		{
			title: 'Intelligent Defaults',
			description: 'Works out-of-the-box with no config'
		},
		{
			title: 'Broad Compatibility',
			description: 'Supports any project, any framework'
		}
	];

	// Enhanced images have an 'img' property that contains the traditional image object
	const posterUrl = intelligentFileCopyingImg.img.src;

	// Video identifier used for player and external link
	const videoId = 'jGztGfRujSE';
</script>

<section
	id="video"
	aria-label="Video demo"
	class="relative overflow-hidden bg-background px-4 py-24 sm:px-6 md:py-32 lg:px-8"
>
	<!-- Subtle gradient background -->
	<div
		class="absolute inset-0"
		style="background: radial-gradient(ellipse at top, color-mix(in oklch, var(--color-border) 35%, transparent) 0%, transparent 70%);"
	></div>
	<!-- Noise overlay -->
	<div class="noise-overlay absolute inset-0"></div>

	<div class="relative z-10 mx-auto max-w-5xl">
		<div class="mb-12 text-center md:mb-16">
			<div
				class="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
				aria-hidden="true"
			>
				<svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
					<path
						fill-rule="evenodd"
						d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
						clip-rule="evenodd"
					/>
				</svg>
				Start Guide
			</div>

			<h2 class="mb-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl" style="letter-spacing: -0.01em;">
				Install, then copy
				<span class="text-muted-foreground"> your codebase</span>
			</h2>

			<p class="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl" style="line-height: 1.6;">
				Watch how CopyTree transforms your workflow. From installation to your first AI-ready code
				copy with ease.
			</p>
		</div>

		<!-- Video container -->
		<div class="relative mx-auto w-full max-w-4xl">
			<!-- Video wrapper with hover effects constrained to video dimensions -->
			<div
				class="group relative aspect-video overflow-hidden rounded-xl border border-border bg-muted transition-all duration-300 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-background hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
			>
				<!-- Subtle border highlight on hover - constrained to video dimensions -->
				<div
					class="absolute -inset-px rounded-xl bg-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
				></div>
				<VideoPlayer
					youtubeVideoId={videoId}
					poster={posterUrl}
					title="CopyTree Getting Started"
				/>
			</div>
			<p class="mt-6 text-center text-sm text-muted-foreground">
				Short demo: installation and first run in under a minute ·
				<a
					href={`https://www.youtube.com/watch?v=${videoId}`}
					target="_blank"
					rel="noopener noreferrer"
					class="underline-offset-4 hover:underline"
				>
					Watch on YouTube
				</a>
			</p>
		</div>

		<!-- Refined feature highlights -->
		<div class="mt-12 text-center">
			<p class="mb-6 text-sm font-medium text-muted-foreground">Quick highlights:</p>
			<ul class="flex flex-wrap justify-center gap-x-6 gap-y-4" role="list">
				{#each features as feature}
					<li
						class="inline-flex items-center gap-3 rounded-full border border-border/50 bg-background/40 px-4 py-2.5 text-sm font-medium text-foreground backdrop-blur-sm transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
					>
						<div class="h-1.5 w-1.5 rounded-full bg-primary/60"></div>
						<span class="font-medium">{feature.title}</span>
						<span class="text-muted-foreground">•</span>
						<span class="text-muted-foreground">{feature.description}</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

<style>
	/* Styles handled by Tailwind classes */
</style>
