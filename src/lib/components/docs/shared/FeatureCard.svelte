<script>
	/** @type {{ icon?: any, title: string, description: string, highlight?: boolean, class?: string }} */
	let { icon, title, description, highlight = false, class: className = '' } = $props();
</script>

<div
	class="group relative h-full transition-all duration-300 ease-out hover:-translate-y-0.5 {className}"
>
	<!-- Card container -->
	<div
		class="relative h-full overflow-hidden rounded-xl border border-border bg-background/50 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-xl"
	>
		<!-- Card content -->
		<div class="flex h-full flex-col p-6">
			<!-- Icon -->
			{#if icon}
				{@const IconComponent = icon}
				<div class="mb-4 flex-shrink-0">
					<div
						class="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 transition-all duration-300 group-hover:border-primary/50 group-hover:bg-primary/20"
					>
						<IconComponent class="h-6 w-6 text-primary" />
					</div>
				</div>
			{/if}

			<!-- Title -->
			<h3
				class="mb-3 flex-shrink-0 text-xl font-bold tracking-tight text-foreground transition-colors duration-300 {highlight
					? 'group-hover:text-primary'
					: ''}"
			>
				{title}
			</h3>

			<!-- Description -->
			<p
				class="flex-grow text-base leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground"
			>
				{description}
			</p>
		</div>

		<!-- Hover overlay gradient -->
		<div
			class="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-primary/[0.01] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
		></div>
	</div>
</div>
