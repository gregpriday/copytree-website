<script>
	import AnimatedTerminal from './AnimatedTerminal.svelte';
	import { LogoIcon, Button } from '../shared';
</script>

<section
	aria-label="Hero"
	class="relative flex h-auto min-h-screen items-center justify-center overflow-hidden border-b border-border bg-background pt-0 pb-16 md:pb-24 lg:pb-32"
>
	<!-- Edge gradients for subtle depth -->
	<div
		class="pointer-events-none absolute inset-x-0 top-0 z-[2] h-px bg-gradient-to-r from-transparent via-border/50 to-transparent"
	></div>
	<div
		class="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-px bg-gradient-to-r from-transparent via-border/50 to-transparent"
	></div>

	<!-- Background pattern and vignette -->
	<div
		class="absolute inset-0 z-[1] overflow-hidden opacity-[0.16] dark:opacity-[0.22]"
		style="
	     mask-image: radial-gradient(circle at center, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 62%);
	     -webkit-mask-image: radial-gradient(circle at center, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 62%);
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
		class="absolute inset-0 z-[3] opacity-[0.024] dark:opacity-[0.032]"
		style="background-image: url(/noise-texture.png); background-repeat: repeat;"
	></div>

	<div class="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
		<div>
			<!-- Logo with subtle glow effect - theme-aware -->
			<div class="relative mx-auto mb-6 w-fit animate-fadeIn opacity-0" style="animation-delay: 0.1s; animation-fill-mode: forwards;">
				<LogoIcon size="xl" class="mx-auto hover:brightness-110" />
				<!-- Subtle ambient glow -->
				<div
					class="absolute inset-0 rounded-full bg-primary/15 opacity-0 blur-[20px] transition-opacity duration-500 hover:opacity-100"
				></div>
			</div>

			<!-- Updated tagline -->
			<p class="mb-3 text-sm font-medium tracking-widest text-muted-foreground uppercase animate-fadeIn opacity-0" style="animation-delay: 0.25s; animation-fill-mode: forwards;">
				AI-Ready Code Sharing for Developers
			</p>

			<!-- Headline -->
			<h1
				class="mb-5 text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl animate-fadeIn opacity-0"
				style="animation-delay: 0.4s; animation-fill-mode: forwards; letter-spacing: -0.02em"
			>
				Copy your project to the clipboard — structured for AI.
			</h1>

			<!-- Subhead -->
			<p class="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl animate-fadeIn opacity-0" style="animation-delay: 0.55s; animation-fill-mode: forwards;">
				CopyTree is a simple CLI that exports any codebase as XML, JSON, or a tree view — perfect for Claude, ChatGPT, Grok, or Gemini.
			</p>

			<!-- Animated terminal demo -->
			<div
				class="mx-auto mb-10 max-w-full px-4 text-left sm:max-w-[90%] sm:px-0 md:max-w-[80%] lg:max-w-[70%] animate-fadeIn opacity-0"
				style="animation-delay: 0.75s; animation-fill-mode: forwards;"
			>
				<AnimatedTerminal />
			</div>

			<!-- CTAs -->
			<div class="mb-10 flex flex-col items-center justify-center gap-3 sm:flex-row animate-fadeIn opacity-0" style="animation-delay: 0.9s; animation-fill-mode: forwards;">
				<a
					href="/docs#installation"
					class="inline-flex items-center justify-center rounded-xl bg-foreground px-5 py-3 font-medium text-background transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
				>
					Install via npm
				</a>
				<a
					href="/docs"
					class="inline-flex items-center justify-center rounded-xl border border-border px-5 py-3 font-medium text-foreground hover:bg-muted/30"
				>
					Read the docs
				</a>
				<a
					href="https://github.com/gregpriday/copytree"
					class="inline-flex items-center justify-center rounded-xl border border-border px-5 py-3 font-medium text-foreground hover:bg-muted/30"
					rel="noopener"
				>
					GitHub
				</a>
			</div>

			<!-- Trust badges -->
			<div class="mx-auto mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
				<span>Open-source (MIT)</span>
				<span aria-hidden="true">•</span>
				<span>Works with popular AI assistants</span>
				<span aria-hidden="true">•</span>
				<span>No account required</span>
			</div>
		</div>
	</div>

	<!-- Scroll indicator (respects reduced motion) -->
	<div class="absolute bottom-6 left-1/2 -translate-x-1/2 transform animate-fadeIn opacity-0" style="animation-delay: 1.05s; animation-fill-mode: forwards; animation-duration: 0.6s;">
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
				d="M6 9l6 6 6-6"
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
		animation: fadeIn 0.8s ease-out;
	}
</style>
