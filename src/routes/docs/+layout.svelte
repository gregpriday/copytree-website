<!-- Docs layout wrapper -->
<script>
	let { children, data } = $props();
	const docsStructuredData = data?.docsStructuredData || {};
</script>

<svelte:head>
	<!-- Documentation-specific structured data -->
	{#if docsStructuredData.software}
		{@html `<script type="application/ld+json">${JSON.stringify(docsStructuredData.software)}</script>`}
	{/if}

	{#if docsStructuredData.faq}
		{@html `<script type="application/ld+json">${JSON.stringify(docsStructuredData.faq)}</script>`}
	{/if}
</svelte:head>

{@render children?.()}
