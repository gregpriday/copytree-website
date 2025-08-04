<script>
	import intelligentFileCopyingImg from '$lib/assets/images/home/intelligent-file-copying.png?enhanced';
	import fileTransformsImg from '$lib/assets/images/home/file-transforms.png?enhanced';
	import aiFriendlyImg from '$lib/assets/images/home/ai-friendly.png?enhanced';
	import quickProfilesImg from '$lib/assets/images/home/quick-profiles.png?enhanced';

	const features = [
		{
			title: 'Smart File Selection',
			description:
				'Automatically picks essentials while respecting .gitignore, saving you hours of manual curation.',
			image: intelligentFileCopyingImg,
			alt: 'Intelligent file copying feature showing code selection interface'
		},
		{
			title: '15+ Transformers',
			description: 'Supports PDFs, images, code summaries, and more for AI compatibility.',
			image: fileTransformsImg,
			alt: 'File transformation capabilities showing various file types'
		},
		{
			title: 'AI-Friendly Output',
			description:
				'Generates XML/JSON ready for large context windows in tools like Claude or GPT-4.',
			image: aiFriendlyImg,
			alt: 'AI-friendly output formats displayed in terminal'
		},
		{
			title: 'Flexible Profiles',
			description: 'Default profile for quick starts, with easy custom creation via YAML.',
			image: quickProfilesImg,
			alt: 'Default and custom profile configuration'
		}
	];
</script>

<section class="relative overflow-hidden bg-zinc-950 px-4 py-24 sm:px-6 md:py-32 lg:px-8">
	<!-- Edge gradients for subtle depth -->
	<div class="pointer-events-none absolute inset-x-0 top-0 z-[2] h-px bg-gradient-to-r from-transparent via-zinc-700/70 to-transparent"></div>
	<div class="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>

	<!-- Noise texture overlay -->
	<div class="absolute inset-0 z-[2] opacity-[0.03]" style="background-image: url(/noise-texture.png); background-repeat: repeat;"></div>

	<!-- Consistent Grid Pattern Background -->
	<div
		class="absolute inset-0 z-[1] opacity-20"
		style="
      background-image: url('/grid-pattern-dark.svg');
      background-position: center;
      mask-image: radial-gradient(ellipse at center, white 20%, transparent 60%);
      -webkit-mask-image: radial-gradient(ellipse at center, white 20%, transparent 60%);
    "
	></div>

	<div class="relative z-10 mx-auto max-w-7xl">
		<div class="mb-20 text-center">
			<h2 class="mb-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
				Core Features
			</h2>
			<p class="mx-auto max-w-2xl text-lg leading-relaxed text-zinc-300">
				Tools to make sharing codebases with AI simpler
			</p>
		</div>

		<div class="grid auto-rows-fr grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
			{#each features as feature, index}
				<div
					class="group relative transition-all duration-300 ease-out hover:-translate-y-0.5 hover:!opacity-100"
				>
					<div
						class="subtle-gradient-border-hover relative h-full overflow-hidden rounded-lg border border-zinc-700 bg-zinc-800 shadow-sm transition-all duration-200 hover:shadow-md"
					>
						<!-- Image container -->
						<div class="relative h-48 overflow-hidden">
							<enhanced:img
								src={feature.image}
								alt={feature.alt}
								class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
								loading={index < 2 ? 'eager' : 'lazy'}
							/>
							<!-- Refined Image Blending -->
							<div class="absolute inset-0 bg-gradient-to-t from-zinc-800 to-transparent"></div>
						</div>

						<!-- Text content -->
						<div class="p-6">
							<h3 class="mb-3 text-xl font-bold tracking-tight text-white">
								{feature.title}
							</h3>
							<p class="text-base leading-relaxed text-zinc-300">
								{feature.description}
							</p>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Refined "Also Includes" Pills -->
		<div class="mt-20 text-center">
			<p class="mb-6 text-base font-medium text-zinc-400">Also includes:</p>
			<div class="flex flex-wrap justify-center gap-x-4 gap-y-3">
				{#each ['Smart .gitignore parsing', 'Token counting', 'Custom transformers', 'CLI & API access'] as item}
					<div
						class="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-800/50 px-4 py-2 text-sm text-zinc-300 transition-all duration-200 hover:border-primary/50 hover:bg-primary/10 hover:text-white"
					>
						<svg
							class="h-3.5 w-3.5 text-emerald-400"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="3"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
						</svg>
						{item}
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
