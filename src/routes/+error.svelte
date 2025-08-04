<script>
	import { page } from '$app/stores';
	import { Button, LogoIcon } from '$lib/components/shared';

	let status = $derived(page.status);
	let error = $derived(page.error);

	function refresh() {
		if (typeof window !== 'undefined') window.location.reload();
	}

	const is404 = $derived(status === 404);
	const code = $derived(status ?? 500);
	const title = $derived(is404 ? 'Page Not Found' : 'Something Went Wrong');
	const description = $derived(
		is404
			? "The page you're looking for doesn't exist or has moved."
			: error?.message || 'An unexpected error occurred. Please try again.'
	);
</script>

<!-- Full-viewport container with layered background -->
<section
	class="relative w-full overflow-hidden overflow-y-hidden bg-background"
	style="min-height: 100vh;"
>
	<!-- Theme-aware grid pattern -->
	<div
		class="absolute inset-0 z-[1] opacity-[0.10] dark:opacity-[0.18]"
		style="
      mask-image: radial-gradient(ellipse at center, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 75%);
      -webkit-mask-image: radial-gradient(ellipse at center, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 75%);
    "
		aria-hidden="true"
	>
		<div
			class="absolute inset-0 dark:hidden"
			style="
        background-image: url('/grid-pattern.svg');
        background-position: center;
        background-size: 60px 60px;
        background-repeat: repeat;
      "
		></div>
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

	<!-- Noise overlay -->
	<div
		class="pointer-events-none absolute inset-0 z-[2] opacity-[0.02] dark:opacity-[0.035]"
		style="background-image: url('/noise-texture.png'); background-repeat: repeat;"
		aria-hidden="true"
	></div>

	<!-- Centered content -->
	<div
		class="relative z-10 mx-auto flex max-w-2xl flex-col items-center justify-center px-6"
		style="
      /* Reserve room for site header and footer to eliminate scroll on standard viewports */
      min-height: calc(100vh - var(--reserved-header, 0px) - var(--reserved-footer, 0px));
      padding-top: var(--reserved-header, 80px);
      padding-bottom: var(--reserved-footer, 88px);
    "
	>
		<!-- Constrain vertical size to avoid scroll on standard viewports; also cap width/height -->
		<div
			class="flex w-full animate-fadeIn flex-col items-center justify-center gap-6 text-center md:gap-8"
			style="
        animation-delay: 0.2s; animation-fill-mode: both;
        max-height: min(80vh, calc(100vh - var(--reserved-header, 80px) - var(--reserved-footer, 88px) - 16px));
      "
			role="alert"
			aria-live="polite"
		>
			<!-- Logo -->
			<div class="relative mx-auto w-fit">
				<LogoIcon size="lg" class="mx-auto transition hover:brightness-110" />
				<div
					class="pointer-events-none absolute inset-0 rounded-full bg-primary/15 opacity-0 blur-xl transition-opacity duration-500 hover:opacity-100"
				></div>
			</div>

			<!-- Error code -->
			<div
				class="font-bold tracking-tight text-destructive"
				style="font-family: var(--font-space-grotesk);"
			>
				<span class="text-7xl leading-none select-none md:text-8xl lg:text-9xl">{code}</span>
			</div>

			<!-- Heading -->
			<h1
				class="text-2xl font-bold text-foreground md:text-3xl"
				style="font-family: var(--font-space-grotesk);"
			>
				{title}
			</h1>

			<!-- Description -->
			<p class="max-w-md text-base leading-relaxed text-muted-foreground">
				{description}
			</p>

			<!-- Actions -->
			<div class="mt-2 flex flex-col items-center justify-center gap-3 sm:flex-row">
				<a href="/" aria-label="Go to homepage">
					<Button size="lg" class="px-6 py-3 shadow-md transition-all hover:bg-primary/90">
						<span>Go Home</span>
					</Button>
				</a>

				<Button
					variant="secondary"
					size="lg"
					class="border border-border bg-secondary/60 px-6 py-3 text-foreground backdrop-blur-sm hover:bg-secondary/80"
					onclick={refresh}
					aria-label="Refresh the page"
				>
					<span>Refresh</span>
				</Button>
			</div>

			<!-- Footer link -->
			<div class="mt-2">
				<a
					href="https://github.com/gregpriday/copytree-website/issues"
					target="_blank"
					rel="noopener noreferrer"
					class="rounded text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
				>
					Report an issue
				</a>
			</div>
		</div>

		<!-- Subtle top/bottom separators for polish -->
		<div
			class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent"
		></div>
		<div
			class="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent"
		></div>
	</div>
</section>

<!-- Reserve header/footer height so error content never forces page scroll.
     Tune the CSS variables below if header/footer sizes change. -->
<style>
	:root {
		/* Header computed height:
       Mobile: nav content h-[60px] plus borders/margins ≈ 64-72px; reserving 80px for safety.
       Desktop: lg:h-16 = 64px; reserving 96px to cover borders and scroll-state layers. */
		--reserved-header: 80px;
		/* Footer with py-6..md:py-8 and content cluster ≈ 72-96px depending on wrap; reserve 88/96. */
		--reserved-footer: 88px;
	}
	@media (min-width: 768px) {
		:root {
			--reserved-header: 96px;
			--reserved-footer: 96px;
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(16px);
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
