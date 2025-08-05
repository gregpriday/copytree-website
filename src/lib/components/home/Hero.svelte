<script>
	import AnimatedTerminal from './AnimatedTerminal.svelte';
	import { LogoIcon, Button } from '../shared';
</script>

<section
	role="region"
	aria-label="Hero"
	class="relative flex h-auto min-h-[90vh] items-center justify-center overflow-hidden border-b border-border bg-background py-16 md:py-24 lg:py-32"
>
	<!-- Edge gradients for subtle depth -->
	<div
		class="pointer-events-none absolute inset-x-0 top-0 z-[2] h-px bg-gradient-to-r from-transparent via-border/60 to-transparent"
	></div>
	<div
		class="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-px bg-gradient-to-r from-transparent via-border/60 to-transparent"
	></div>

	<!-- Background pattern and vignette -->
	<div
		class="absolute inset-0 z-[1] overflow-hidden opacity-[0.15] dark:opacity-20"
		style="
	     mask-image: radial-gradient(circle at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 70%);
	     -webkit-mask-image: radial-gradient(circle at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 70%);
	   "
	>
		<!-- Light mode grid -->
		<div
			class="absolute inset-0 dark:hidden"
			style="
	       background-image: url('/grid-pattern.svg');
	       background-position: center;
	       background-size: 60px 60px;
	       background-repeat: repeat;
	     "
		></div>
		<!-- Dark mode grid -->
		<div
			class="absolute inset-0 hidden dark:block"
			style="
	       background-image: url('/grid-pattern-dark.svg');
	       background-position: center;
	       background-size: 60px 60px;
	       background-repeat: repeat;
	     "
		></div>
	</div>

	<!-- Noise texture overlay -->
	<div
		class="absolute inset-0 z-[3] opacity-[0.04] dark:opacity-[0.06]"
		style="background-image: url(/noise-texture.png); background-repeat: repeat;"
	></div>

	<div class="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
		<div>
			<!-- Logo with subtle glow effect - theme-aware -->
			<div class="relative mx-auto mb-6 w-fit animate-fadeIn opacity-0" style="animation-delay: 0.1s; animation-fill-mode: forwards;">
				<LogoIcon size="xl" class="mx-auto hover:brightness-110" />
				<!-- Subtle ambient glow -->
				<div
					class="absolute inset-0 rounded-full bg-primary/20 opacity-0 blur-xl transition-opacity duration-500 hover:opacity-100"
				></div>
			</div>

			<!-- REFINED MESSAGING -->
			<p class="mb-4 text-sm font-semibold tracking-widest text-primary uppercase animate-fadeIn opacity-0" style="animation-delay: 0.2s; animation-fill-mode: forwards;">
				AI-Optimized Developer Workflow
			</p>
			<h1
				class="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl animate-fadeIn opacity-0"
				style="animation-delay: 0.4s; animation-fill-mode: forwards; letter-spacing: -0.02em; font-family: var(--font-space-grotesk);"
			>
				Copy your entire codebase to AI in seconds
			</h1>

			<p class="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl lg:text-2xl animate-fadeIn opacity-0" style="animation-delay: 0.6s; animation-fill-mode: forwards;">
				Stop wrangling files. <code class="rounded-md bg-muted/50 px-2 py-1 text-base text-primary font-mono"
					>copytree</code
				> packages any project into a clean, AI-ready context for Claude, ChatGPT, Grok, and Gemini.
			</p>

			<!-- Animated terminal demo -->
			<div
				class="mx-auto mb-10 max-w-full px-4 text-left sm:max-w-[90%] sm:px-0 md:max-w-[80%] lg:max-w-[70%] animate-fadeIn opacity-0"
				style="animation-delay: 0.8s; animation-fill-mode: forwards;"
			>
				<AnimatedTerminal />
			</div>

			<!-- CTA Buttons -->
			<div class="flex flex-col items-center justify-center gap-4 overflow-visible p-2 sm:flex-row animate-fadeIn opacity-0" style="animation-delay: 1.0s; animation-fill-mode: forwards;">
				<a href="#getting-started" aria-label="Install and Get Started">
					<Button
						size="lg"
						class="group relative inline-flex items-center justify-center overflow-visible rounded-lg bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:brightness-110 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
					>
						<span class="relative z-10 flex items-center gap-2">
							Get Started
							<svg
								class="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width={2}
									d="M13 7l5 5m0 0l-5 5m5-5H6"
								/>
							</svg>
						</span>
						<div
							class="absolute inset-0 rounded-lg bg-gradient-to-r from-primary to-primary/90 opacity-0 transition-opacity group-hover:opacity-100"
						></div>
						<div
							class="pointer-events-none absolute -inset-1 rounded-lg bg-primary/30 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100"
						></div>
					</Button>
				</a>

				<a href="https://github.com/gregpriday/copytree" target="_blank" rel="noopener noreferrer">
					<Button
						variant="secondary"
						size="lg"
						class="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background/70 px-6 py-3 text-base font-medium text-foreground backdrop-blur-sm transition-all duration-200 hover:border-border/70 hover:bg-secondary hover:text-secondary-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
					>
						<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path
								d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
							/>
						</svg>
						View on GitHub
					</Button>
				</a>
			</div>
		</div>
	</div>

	<!-- Scroll indicator (respects reduced motion) -->
	<div class="absolute bottom-6 left-1/2 -translate-x-1/2 transform motion-safe:animate-bounce animate-fadeIn opacity-0" style="animation-delay: 1.2s; animation-fill-mode: forwards;">
		<svg
			class="h-5 w-5 text-muted-foreground"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			aria-hidden="true"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width={2}
				d="M19 14l-7 7m0 0l-7-7m7 7V3"
			/>
		</svg>
	</div>
</section>

<style>
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fadeIn {
		animation: fadeIn 0.6s ease-out;
	}
</style>
