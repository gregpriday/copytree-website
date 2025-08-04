<script>
	import VideoPlayer from './VideoPlayer.svelte';
	import intelligentFileCopyingImg from '$lib/assets/images/home/intelligent-file-copying.png?enhanced';

	const features = [
		{
			icon: 'zap',
			title: 'Rapid Installation',
			description: 'Global NPM package for instant access.'
		},
		{
			icon: 'settings',
			title: 'Intelligent Defaults',
			description: 'Works out-of-the-box with no config.'
		},
		{
			icon: 'check-circle',
			title: 'Broad Compatibility',
			description: 'Supports any project, any framework.'
		}
	];

	// Enhanced images have an 'img' property that contains the traditional image object
	const posterUrl = intelligentFileCopyingImg.img.src;
</script>

<section
	id="video"
	role="region"
	aria-label="Video demo"
	class="relative overflow-hidden bg-background px-4 py-24 sm:px-6 md:py-32 lg:px-8"
>
	<!-- Subtle gradient background -->
	<div
		class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"
	></div>
	<!-- Noise overlay -->
	<div class="noise-overlay absolute inset-0"></div>

	<div class="relative z-10 mx-auto max-w-5xl">
		<div class="mb-10 text-center md:mb-12">
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

			<h2 class="mb-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
				Install and copy
				<span class="text-muted-foreground"> your codebase</span>
			</h2>

			<p class="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
				Watch how CopyTree transforms your workflow. From installation to your first AI-ready code
				copy with ease.
			</p>
		</div>

		<!-- Video container -->
		<div class="relative mx-auto w-full max-w-4xl">
			<!-- Video wrapper with hover effects constrained to video dimensions -->
			<div
				class="group relative aspect-video overflow-hidden rounded-xl border border-border bg-muted transition-all duration-300 hover:border-primary/30 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-background"
			>
				<!-- Subtle border highlight on hover - constrained to video dimensions -->
				<div
					class="absolute -inset-px rounded-xl bg-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
				></div>
				<VideoPlayer
					youtubeVideoId="jGztGfRujSE"
					poster={posterUrl}
					title="CopyTree Getting Started"
				/>
			</div>
			<p class="mt-4 text-center text-sm text-muted-foreground">
				Short demo: installation and first run in under a minute
			</p>
		</div>

		<!-- Video features -->
		<div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
			{#each features as feature (feature.title)}
				<div
					class="rounded-xl border border-border bg-background/50 p-6 shadow-sm backdrop-blur-sm transition-shadow duration-200 hover:shadow-md"
				>
					<div class="flex items-start gap-4">
						<div class="flex-shrink-0 rounded-lg bg-primary/10 p-3 text-primary" aria-hidden="true">
							{#if feature.icon === 'zap'}
								<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M13 10V3L4 14h7v7l9-11h-7z"
									/>
								</svg>
							{:else if feature.icon === 'settings'}
								<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
									/>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
							{:else if feature.icon === 'check-circle'}
								<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							{/if}
						</div>
						<div>
							<h4 class="mb-1 text-sm font-semibold text-foreground">{feature.title}</h4>
							<span class="block text-xs leading-relaxed text-muted-foreground"
								>{feature.description}</span
							>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
