<script>
	import '../app.css';
    import { Header, Footer } from '$lib/components/layout';
    import { injectAnalytics } from '@vercel/analytics/sveltekit';
    import { dev } from '$app/environment';

    // Inject Vercel analytics only in production
    if (!dev) injectAnalytics();

	let { children, data } = $props();

	// Extract SEO data from server load
	const seo = data?.seo || {};
	const structuredData = data?.structuredData || {};
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{seo.title || 'CopyTree - AI-Friendly File Sharing'}</title>
	<meta
		name="description"
		content={seo.description ||
			'Transform how you share files with AI. CopyTree creates intelligent, structured representations of your projects that AI models can easily understand and work with.'}
	/>
	<meta name="viewport" content="width=device-width, initial-scale=1" />

	<!-- Canonical URL -->
	{#if seo.canonical}
		<link rel="canonical" href={seo.canonical} />
	{/if}

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={seo.ogType || 'website'} />
	<meta property="og:url" content={seo.canonical || 'https://copytree.dev'} />
	<meta
		property="og:title"
		content={seo.ogTitle || seo.title || 'CopyTree - AI-Friendly File Sharing'}
	/>
	<meta
		property="og:description"
		content={seo.ogDescription ||
			seo.description ||
			'Transform how you share files with AI. CopyTree creates intelligent, structured representations of your projects that AI models can easily understand and work with.'}
	/>
	<meta property="og:image" content={seo.ogImage || 'https://copytree.dev/og-image.png'} />
	<meta property="og:site_name" content="CopyTree" />
	<meta property="og:locale" content="en_US" />

	<!-- Twitter -->
	<meta property="twitter:card" content={seo.twitterCard || 'summary_large_image'} />
	<meta property="twitter:url" content={seo.canonical || 'https://copytree.dev'} />
	<meta
		property="twitter:title"
		content={seo.ogTitle || seo.title || 'CopyTree - AI-Friendly File Sharing'}
	/>
	<meta
		property="twitter:description"
		content={seo.ogDescription ||
			seo.description ||
			'Transform how you share files with AI. CopyTree creates intelligent, structured representations of your projects that AI models can easily understand and work with.'}
	/>
	<meta property="twitter:image" content={seo.ogImage || 'https://copytree.dev/og-image.png'} />
	<meta property="twitter:creator" content="@copytree_dev" />

	<!-- Additional Meta Tags -->
	<meta name="robots" content="index, follow" />
	<meta name="author" content="CopyTree" />
	<meta name="theme-color" content="#16a34a" />

	<!-- Additional custom meta tags -->
	{#if seo.additional}
		{#each Object.entries(seo.additional) as [name, content]}
			<meta {name} {content} />
		{/each}
	{/if}

	<!-- Structured Data -->
	{#if structuredData.organization}
		{@html `<script type="application/ld+json">${JSON.stringify(structuredData.organization)}</script>`}
	{/if}

	{#if structuredData.breadcrumb}
		{@html `<script type="application/ld+json">${JSON.stringify(structuredData.breadcrumb)}</script>`}
	{/if}

	{#if structuredData.software}
		{@html `<script type="application/ld+json">${JSON.stringify(structuredData.software)}</script>`}
	{/if}

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

	<!-- Fonts with preloading for performance -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	<link
		rel="preload"
		as="font"
		href="https://fonts.gstatic.com/s/spacegrotesk/v22/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj4PVksj.ttf"
		type="font/ttf"
		crossorigin=""
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
		rel="stylesheet"
	/>

	<!-- Preload critical assets -->
	<link rel="preload" href="/logo/copytree-logo-light.svg" as="image" type="image/svg+xml" />
	<link rel="preload" href="/noise-texture.png" as="image" />
	<link rel="preload" href="/grid-pattern.svg" as="image" type="image/svg+xml" />
	<link rel="preload" href="/grid-pattern-dark.svg" as="image" type="image/svg+xml" />
</svelte:head>

<!-- Skip link for keyboard users -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<div class="min-h-screen bg-[var(--color-background)] text-foreground">
	<Header />
	<main id="main-content" tabindex="-1" class="bg-[var(--color-background)]">
		{@render children?.()}
	</main>
	<Footer />
</div>

<!-- Ensure background color extends beyond viewport -->
<style>
	:global(html, body) {
		background-color: var(--color-background);
		min-height: 100vh;
	}

	/* Ensure overscroll shows theme background color, not green */
	:global(html) {
		background: var(--color-background);
		/* Prevent rubber-band overscroll flashing the UA default bg on iOS/Safari */
		overscroll-behavior: none;
	}

	/* Skip link styles */
	.skip-link {
		position: absolute;
		top: 12px;
		left: 12px;
		background: var(--color-background);
		color: var(--color-foreground);
		padding: 8px 12px;
		z-index: 1000;
		border: 1px solid var(--color-border);
		border-radius: 6px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
		transform: translateY(-200%);
		opacity: 0;
		pointer-events: none;
		transition: transform 0.2s ease, opacity 0.2s ease;
	}

	.skip-link:focus {
		transform: translateY(0%);
		opacity: 1;
		pointer-events: auto;
	}
</style>
