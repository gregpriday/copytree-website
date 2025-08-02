<script>
	import '../app.css';
	import { Header, Footer } from '$lib/components/layout';

	let { children } = $props();
</script>

<svelte:head>
	<title>CopyTree - AI-Friendly File Sharing</title>
	<meta
		name="description"
		content="Transform how you share files with AI. CopyTree creates intelligent, structured representations of your projects that AI models can easily understand and work with."
	/>
	<meta name="viewport" content="width=device-width, initial-scale=1" />

	<!-- Favicons -->
	<link rel="icon" type="image/x-icon" href="/favicon.ico" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
	<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
	<link rel="icon" type="image/png" sizes="152x152" href="/favicon-152x152.png" />
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<link rel="apple-touch-icon-precomposed" href="/apple-touch-icon-precomposed.png" />
	<link rel="manifest" href="/site.webmanifest" />

	<!-- Fonts -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="min-h-screen bg-background text-foreground">
	<Header />
	<main>
		{@render children?.()}
	</main>
	<Footer />
</div>
