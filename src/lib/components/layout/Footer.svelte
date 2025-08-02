<script>
	const currentYear = new Date().getFullYear();
</script>

<footer class="border-t border-border bg-background py-6 text-foreground md:py-8">
	<div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex flex-col items-center justify-between gap-4 md:flex-row md:gap-0">
			<div class="text-xs text-muted-foreground opacity-80">
				© {currentYear} CopyTree. All rights reserved.
			</div>
			<nav class="flex gap-6">
				<a
					href="/docs"
					class="rounded-md text-sm text-foreground transition-colors duration-200 hover:text-primary focus:ring-2 focus:ring-primary focus:outline-none"
				>
					Documentation
				</a>
				<a
					href="/privacy"
					class="rounded-md text-sm text-foreground transition-colors duration-200 hover:text-primary focus:ring-2 focus:ring-primary focus:outline-none"
				>
					Privacy
				</a>
				<a
					href="/terms"
					class="rounded-md text-sm text-foreground transition-colors duration-200 hover:text-primary focus:ring-2 focus:ring-primary focus:outline-none"
				>
					Terms
				</a>
				<a
					href="https://github.com/gregpriday/copytree"
					target="_blank"
					rel="noopener noreferrer"
					class="rounded-md text-sm text-foreground transition-colors duration-200 hover:text-primary focus:ring-2 focus:ring-primary focus:outline-none"
				>
					GitHub
				</a>
			</nav>
		</div>
	</div>
</footer>
