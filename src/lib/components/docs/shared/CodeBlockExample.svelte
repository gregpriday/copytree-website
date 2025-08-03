<script>
	import CodeBlock from './CodeBlock.svelte';

	/** @type {{ code: string, language?: string, filename?: string, title?: string, description?: string, class?: string }} */
	let { code, language = 'text', filename, title, description, class: className = '' } = $props();
</script>

<div class="not-prose my-6 {className}">
	{#if title || description}
		<div class="mb-4">
			{#if title}
				<h3 class="mb-2 text-lg font-semibold text-foreground">{title}</h3>
			{/if}
			{#if description}
				<p class="text-sm text-muted-foreground">{description}</p>
			{/if}
		</div>
	{/if}

	{#if filename}
		<CodeBlock {code} {language} {filename} />
	{:else}
		<CodeBlock {code} {language} />
	{/if}
</div>
