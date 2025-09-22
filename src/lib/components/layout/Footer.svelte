<script>
	const currentYear = new Date().getFullYear();
</script>

<!--
  Footer: subtle, glassy surface that follows the CopyTree Design Language.
  - Neutral base with thin top hairline and soft depth
  - Backdrop blur + tint, very light noise overlay
  - Muted → foreground link hover with primary accent
  - Clear focus ring for accessibility
-->
<footer class="relative text-foreground" aria-label="Site footer">
	<!-- top hairline gradient for crisp edge depth -->
	<div
		aria-hidden="true"
		class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/80 to-transparent"
	></div>

	<!-- glass/tint layer -->
	<div class="border-t border-border/60 bg-background/70 backdrop-blur-xl dark:bg-zinc-950/55">
		<!-- low-contrast noise for materiality -->
		<div
			aria-hidden="true"
			class="pointer-events-none absolute inset-0 bg-[url('/noise-texture.png')] opacity-[0.04] mix-blend-overlay"
		></div>

		<div class="relative">
			<div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
				<div
					class="flex flex-col items-center justify-between gap-4 py-6 md:flex-row md:gap-6 md:py-8"
				>
					<!-- Brand -->
					<div class="flex items-center gap-3">
						<!-- Use the existing logo asset, swap per theme using CSS currentColor -->
						<img
							src="/logo/copytree-logo-light.svg"
							alt="CopyTree"
							class="block h-5 w-auto dark:hidden"
							height="20"
							loading="lazy"
							decoding="async"
						/>
						<img
							src="/logo/copytree-logo-dark.svg"
							alt="CopyTree"
							class="hidden h-5 w-auto dark:block"
							height="20"
							loading="lazy"
							decoding="async"
						/>
						<div class="text-xs text-muted-foreground/90">
							© {currentYear} CopyTree
						</div>
					</div>

					<!-- Nav -->
					<nav class="flex flex-wrap items-center gap-x-6 gap-y-2">
						<a
							href="/docs"
							class="rounded-md text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background focus:outline-none"
						>
							Documentation
						</a>
						<a
							href="/privacy"
							class="rounded-md text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background focus:outline-none"
						>
							Privacy
						</a>
						<a
							href="/licenses"
							class="rounded-md text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background focus:outline-none"
						>
							Licenses
						</a>
						<a
							href="/terms"
							class="rounded-md text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background focus:outline-none"
						>
							Terms
						</a>
						<a
							href="https://github.com/gregpriday/copytree"
							target="_blank"
							rel="noopener noreferrer"
							class="group inline-flex items-center gap-1 rounded-md text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background focus:outline-none"
						>
							<span>GitHub</span>
							<!-- subtle, calm hover nudge -->
							<svg
								aria-hidden="true"
								viewBox="0 0 20 20"
								fill="none"
								stroke="currentColor"
								class="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1.5"
									d="M7 4h9m0 0v9m0-9L4 16"
								/>
							</svg>
						</a>
					</nav>
				</div>
			</div>
		</div>
	</div>
</footer>
