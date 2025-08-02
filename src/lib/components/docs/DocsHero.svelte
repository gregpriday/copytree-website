<script>
	import SearchBar from './shared/SearchBar.svelte';
</script>

<section
	class="relative flex h-auto items-center justify-center border-b border-border bg-background py-12"
>
	<!-- Grid pattern background -->
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
		class="absolute inset-0 z-[3] opacity-[0.02] dark:opacity-[0.03]"
		style="background-image: url(/noise-texture.png); background-repeat: repeat;"
	></div>

	<div class="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
		<h1 class="mb-8 text-3xl leading-tight font-bold tracking-tight text-foreground md:text-4xl">
			CopyTree Documentation
		</h1>

		<!-- Search Bar -->
		<div>
			<SearchBar />
		</div>
	</div>
</section>
