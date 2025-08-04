<script>
	import '../app.css';
	import { Header, Footer } from '$lib/components/layout';

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
		content={seo.description || 'Transform how you share files with AI. CopyTree creates intelligent, structured representations of your projects that AI models can easily understand and work with.'}
	/>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	
	<!-- Canonical URL -->
	{#if seo.canonical}
		<link rel="canonical" href={seo.canonical} />
	{/if}

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={seo.ogType || 'website'} />
	<meta property="og:url" content={seo.canonical || 'https://copytree.dev'} />
	<meta property="og:title" content={seo.ogTitle || seo.title || 'CopyTree - AI-Friendly File Sharing'} />
	<meta property="og:description" content={seo.ogDescription || seo.description || 'Transform how you share files with AI. CopyTree creates intelligent, structured representations of your projects that AI models can easily understand and work with.'} />
	<meta property="og:image" content={seo.ogImage || 'https://copytree.dev/og-image.png'} />
	<meta property="og:site_name" content="CopyTree" />
	<meta property="og:locale" content="en_US" />

	<!-- Twitter -->
	<meta property="twitter:card" content={seo.twitterCard || 'summary_large_image'} />
	<meta property="twitter:url" content={seo.canonical || 'https://copytree.dev'} />
	<meta property="twitter:title" content={seo.ogTitle || seo.title || 'CopyTree - AI-Friendly File Sharing'} />
	<meta property="twitter:description" content={seo.ogDescription || seo.description || 'Transform how you share files with AI. CopyTree creates intelligent, structured representations of your projects that AI models can easily understand and work with.'} />
	<meta property="twitter:image" content={seo.ogImage || 'https://copytree.dev/og-image.png'} />
	<meta property="twitter:creator" content="@copytree_dev" />

	<!-- Additional Meta Tags -->
	<meta name="robots" content="index, follow" />
	<meta name="author" content="CopyTree" />
	<meta name="keywords" content="AI, file sharing, codebase, developer tools, Claude, ChatGPT, Gemini, code transformation" />
	<meta name="theme-color" content="#16a34a" />

	<!-- Additional custom meta tags -->
	{#if seo.additional}
		{#each Object.entries(seo.additional) as [name, content]}
			<meta {name} {content} />
		{/each}
	{/if}

	<!-- Structured Data -->
	{#if structuredData.organization}
		<script type="application/ld+json">
			{JSON.stringify(structuredData.organization)}
		</script>
	{/if}
	
	{#if structuredData.breadcrumb}
		<script type="application/ld+json">
			{JSON.stringify(structuredData.breadcrumb)}
		</script>
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
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
		rel="stylesheet"
	/>
	
	<!-- Preload critical assets -->
	<link rel="preload" href="/logo/copytree-logo-light.svg" as="image" type="image/svg+xml" />
	<link rel="preload" href="/noise-texture.png" as="image" />
</svelte:head>

<div class="min-h-screen bg-background text-foreground">
	<Header />
	<main>
		{@render children?.()}
	</main>
	<Footer />
</div>
