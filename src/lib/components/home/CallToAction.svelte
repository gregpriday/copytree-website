<script>
	import { Button } from '../shared';
</script>

<section role="region" aria-label="Call to Action" class="relative overflow-hidden bg-zinc-950 py-24 md:py-32">
	<!-- Force consistent dark motif with dark grid only; remove light fallback -->
	<div
		class="pointer-events-none absolute inset-0 z-0 opacity-20"
		style="
			background-image: url('/grid-pattern-dark.svg');
			background-position: center;
			background-size: 60px 60px;
			background-repeat: repeat;
			mask-image: radial-gradient(ellipse at center, white 22%, transparent 62%);
			-webkit-mask-image: radial-gradient(ellipse at center, white 22%, transparent 62%);
		"
	></div>

	<!-- Left side background image -->
	<div 
		class="absolute top-1/2 -left-1/4 left-0 z-0 -translate-y-1/2 opacity-20 blur-sm"
		style="
			mask-image: radial-gradient(ellipse 70% 80% at center, white 20%, transparent 80%);
			-webkit-mask-image: radial-gradient(ellipse 70% 80% at center, white 20%, transparent 80%);
		"
	>
		<enhanced:img
			src="$lib/assets/images/home/intelligent-file-copying.png"
			alt="Background decoration"
			class="h-[400px] w-[600px] object-cover"
			loading="lazy"
		/>
	</div>

	<!-- Right side background image -->
	<div 
		class="absolute top-1/2 -right-1/4 right-0 z-0 -translate-y-1/2 opacity-20 blur-sm"
		style="
			mask-image: radial-gradient(ellipse 70% 80% at center, white 20%, transparent 80%);
			-webkit-mask-image: radial-gradient(ellipse 70% 80% at center, white 20%, transparent 80%);
		"
	>
		<enhanced:img
			src="$lib/assets/images/home/ai-friendly.png"
			alt="Background decoration"
			class="h-[400px] w-[600px] object-cover"
			loading="lazy"
		/>
	</div>

	<!-- Dark-only readability gradient (further reduced intensity to soften contrast) -->
	<div class="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-zinc-900/60 to-transparent"></div>

	<div class="relative z-20 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
		<h2 class="mb-4 text-3xl font-semibold tracking-tight text-zinc-100 md:text-4xl">
			Ready to transform your workflow?
		</h2>

		<p class="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-zinc-300/80">
			Install CopyTree and start sharing AI-ready codebases in seconds.
		</p>

		<div class="flex flex-col items-center justify-center gap-4 p-4 sm:flex-row">
			<a href="#getting-started" aria-label="Install CopyTree and get started">
				<Button
					variant="dark-primary"
					size="lg"
					class="px-6 py-3 text-base font-medium"
				>
					Install CopyTree
				</Button>
			</a>

			<a href="/docs" aria-label="Read documentation">
				<Button
					variant="dark-secondary"
					size="lg"
					class="px-6 py-3 text-base"
				>
					Read Documentation
				</Button>
			</a>

			<a href="https://github.com/gregpriday/copytree" target="_blank" rel="noopener noreferrer" aria-label="View CopyTree on GitHub">
				<Button
					variant="dark-secondary"
					size="lg"
					class="px-6 py-3 text-base"
				>
					View on GitHub
				</Button>
			</a>
		</div>

		<p class="mt-8 text-sm text-zinc-400">Free and open-source CLI tool</p>
	</div>
</section>
