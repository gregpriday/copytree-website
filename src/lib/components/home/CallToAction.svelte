<script>
	import { Button } from '../shared';
</script>

<section
	aria-label="Call to Action"
	class="relative overflow-hidden bg-zinc-950 py-24 md:py-32"
>
	<!-- Force consistent dark motif with dark grid only; remove light fallback -->
	<!-- Left side background image -->
	<div
		class="absolute top-1/2 -left-1/4 left-0 z-0 -translate-y-1/2 opacity-[0.18] blur-sm animate-fadeIn"
		style="
			mask-image: radial-gradient(ellipse 70% 80% at center, white 20%, transparent 80%);
			-webkit-mask-image: radial-gradient(ellipse 70% 80% at center, white 20%, transparent 80%);
			animation-delay: 0.35s;
			animation-fill-mode: both;
		"
	>
		<enhanced:img
			src="$lib/assets/images/home/intelligent-file-copying.png"
			alt="Background decoration"
			class="h-[400px] w-[600px] object-cover"
			loading="lazy"
			decoding="async"
		/>
	</div>

	<!-- Right side background image -->
	<div
		class="absolute top-1/2 -right-1/4 right-0 z-0 -translate-y-1/2 opacity-[0.18] blur-sm animate-fadeIn"
		style="
			mask-image: radial-gradient(ellipse 70% 80% at center, white 20%, transparent 80%);
			-webkit-mask-image: radial-gradient(ellipse 70% 80% at center, white 20%, transparent 80%);
			animation-delay: 0.45s;
			animation-fill-mode: both;
		"
	>
		<enhanced:img
			src="$lib/assets/images/home/ai-friendly.png"
			alt="Background decoration"
			class="h-[400px] w-[600px] object-cover"
			loading="lazy"
			decoding="async"
		/>
	</div>

	<!-- Dark-only readability gradient (further reduced intensity to soften contrast) -->
	<div
		class="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-zinc-900/60 to-transparent"
	></div>

	<div class="relative z-20 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
		<h2 class="mb-4 text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl">
			Ship context to AI in seconds
		</h2>

		<p class="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-zinc-200/90">
			Install CopyTree and start sharing AI-ready codebases in seconds.
		</p>

		<div class="flex flex-col items-center justify-center gap-4 p-4 sm:flex-row">
			<a href="#getting-started" aria-label="Install CopyTree and get started">
				<Button
					variant="primary"
					size="lg"
					class="px-8 py-4 text-base font-medium shadow-lg shadow-primary/30 hover:shadow-xl hover:translate-y-[-2px] transition-all duration-200 animate-fadeIn"
					style="animation-delay: 0.1s; animation-fill-mode: both;"
				>
					Install CopyTree
				</Button>
			</a>

			<a href="/docs" aria-label="Read documentation">
				<Button
					variant="secondary"
					size="lg"
					class="px-6 py-4 text-base border border-border/70 hover:border-border hover:bg-secondary/50 transition-all duration-200 animate-fadeIn"
					style="animation-delay: 0.2s; animation-fill-mode: both;"
				>
					Read Documentation
				</Button>
			</a>
		</div>

		<p class="mt-2 text-sm text-zinc-400">
			Prefer GitHub?
			<a
				href="https://github.com/gregpriday/copytree"
				target="_blank"
				rel="noopener noreferrer"
				class="ml-1 inline-flex items-center gap-1 text-zinc-300 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:text-white focus-visible:underline focus-visible:outline-none"
			>
				View the repo
				<svg class="h-3 w-3" viewBox="0 0 20 20" fill="none" stroke="currentColor" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 4h9m0 0v9m0-9L4 16" />
				</svg>
			</a>
		</p>

		<p class="mt-8 text-sm text-zinc-300">Free and open-source CLI tool</p>
	</div>
</section>

<style>
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fadeIn {
		animation: fadeIn 0.3s ease-out;
	}
</style>
