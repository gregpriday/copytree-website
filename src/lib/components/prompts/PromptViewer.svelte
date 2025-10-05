<script>
	import PromptCodeViewer from './PromptCodeViewer.svelte';
	import CopyButton from './CopyButton.svelte';
	import Button from '$lib/components/shared/Button.svelte';
	import { Copy, Check, Download, ExternalLink, ChevronDown, Calendar } from 'lucide-svelte';

	/** @type {{ prompt: import('$lib/prompts/prompts-config.js').PromptConfig }} */
	let { prompt } = $props();

	// Component state
	let activeTab = $state('markdown');
	let variableValues = $state({});
	let copied = $state(false);
	let copiedWithVariables = $state(false);
	let showAiDropdown = $state(false);
	let variables = $state([]);

	// Extract variables from prompt content on mount
	$effect(() => {
		if (prompt.content) {
			const variablePattern = /\{\{([^}]+)\}\}/g;
			const foundVariables = [];
			let match;
			while ((match = variablePattern.exec(prompt.content)) !== null) {
				const variableName = match[1].trim();
				if (!foundVariables.includes(variableName)) {
					foundVariables.push(variableName);
					// Initialize with empty value if not already set
					if (!(variableName in variableValues)) {
						variableValues[variableName] = '';
					}
				}
			}
			variables = foundVariables;
		}
	});

	// Copy prompt content
	const handleCopy = async () => {
		if (!prompt.content) return;
		try {
			await navigator.clipboard.writeText(prompt.content);
			copied = true;
			setTimeout(() => (copied = false), 1600);
		} catch (e) {
			console.error('Failed to copy', e);
		}
	};

	// Copy prompt content with variables replaced
	const handleCopyWithVariables = async () => {
		if (!prompt.content) return;
		let contentWithVariables = prompt.content;
		
		// Replace variables with values
		variables.forEach(variable => {
			const value = variableValues[variable] || `{{${variable}}}`;
			contentWithVariables = contentWithVariables.replace(new RegExp(`\\{\\{${variable}\\}\\}`, 'g'), value);
		});

		try {
			await navigator.clipboard.writeText(contentWithVariables);
			copiedWithVariables = true;
			setTimeout(() => (copiedWithVariables = false), 1600);
		} catch (e) {
			console.error('Failed to copy with variables', e);
		}
	};

	// Download as markdown file
	const handleDownload = () => {
		const blob = new Blob([prompt.content], { type: 'text/markdown' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `${prompt.slug}.md`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	// Generate AI platform URLs
	const getAiPlatformUrl = (platform) => {
		let contentToEncode = prompt.content;
		
		// If variables exist and have values, replace them
		if (variables.length > 0) {
			variables.forEach(variable => {
				if (variableValues[variable]) {
					contentToEncode = contentToEncode.replace(new RegExp(`\\{\\{${variable}\\}\\}`, 'g'), variableValues[variable]);
				}
			});
		}

		switch (platform) {
			case 'claude':
				return `https://claude.ai/chat/new?content=${encodeURIComponent(contentToEncode)}`;
			case 'chatgpt':
				return `https://chat.openai.com/?q=${encodeURIComponent(contentToEncode)}`;
			case 'gemini':
				return `https://gemini.google.com/app?q=${encodeURIComponent(contentToEncode)}`;
			default:
				return '#';
		}
	};

	// Handle AI platform selection
	const handleOpenInAi = (platform) => {
		const url = getAiPlatformUrl(platform);
		window.open(url, '_blank');
		showAiDropdown = false;
	};

	// Handle variable input changes
	const updateVariable = (variableName, value) => {
		variableValues[variableName] = value;
	};

	// Get processed content for different tabs
	const getProcessedContent = () => {
		if (activeTab === 'raw') {
			return prompt.content;
		}
		return prompt.content; // For markdown tab, we'll still use the highlighted version
	};

	// Close dropdown when clicking outside
	const handleClickOutside = (event) => {
		if (showAiDropdown && !event.target.closest('[data-ai-dropdown]')) {
			showAiDropdown = false;
		}
	};

	$effect(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<!-- Content Panel -->
<section class="flex min-w-0 flex-1 flex-col">
	<!-- Enhanced Content header card -->
	<div
		class="sticky top-0 z-10 border-b border-border/60 bg-background/70 px-5 py-4 backdrop-blur-xl"
	>
		<div class="flex items-start justify-between gap-4">
			<div class="min-w-0">
				<div class="flex items-center gap-3">
					<h1 class="truncate text-lg font-semibold text-foreground">{prompt.title}</h1>
					{#if prompt.version}
						<span class="rounded-md border border-border/60 bg-background/60 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
							v{prompt.version}
						</span>
					{/if}
				</div>
				{#if prompt.description}
					<p class="mt-1 line-clamp-2 text-sm text-muted-foreground">{prompt.description}</p>
				{/if}
				<div class="mt-2 flex flex-wrap items-center gap-2">
					<!-- tags if present -->
					{#if prompt.tags}
						{#each prompt.tags as tag (tag)}
							<span
								class="rounded-md border border-border/60 bg-background/60 px-2 py-0.5 text-[11px] text-muted-foreground"
							>
								{tag}
							</span>
						{/each}
					{/if}
					<!-- last updated -->
					{#if prompt.updated}
						<div class="flex items-center gap-1 text-[11px] text-muted-foreground">
							<Calendar class="h-3 w-3" />
							<span>Updated {prompt.updated}</span>
						</div>
					{/if}
				</div>
			</div>
			<!-- Enhanced Actions Cluster -->
			<div class="flex shrink-0 items-center gap-2">
				<!-- Copy Button -->
				<Button variant="secondary" size="sm" onclick={handleCopy}>
					{#if copied}
						<Check class="h-4 w-4" />
						<span class="hidden sm:inline">Copied</span>
					{:else}
						<Copy class="h-4 w-4" />
						<span class="hidden sm:inline">Copy</span>
					{/if}
				</Button>

				<!-- Copy with Variables Button (only if variables exist) -->
				{#if variables.length > 0}
					<Button variant="secondary" size="sm" onclick={handleCopyWithVariables}>
						{#if copiedWithVariables}
							<Check class="h-4 w-4" />
							<span class="hidden sm:inline">Copied</span>
						{:else}
							<Copy class="h-4 w-4" />
							<span class="hidden sm:inline">Copy with Vars</span>
						{/if}
					</Button>
				{/if}

				<!-- Download Button -->
				<Button variant="secondary" size="sm" onclick={handleDownload}>
					<Download class="h-4 w-4" />
					<span class="hidden sm:inline">Download</span>
				</Button>

				<!-- Open in AI Dropdown -->
				<div class="relative" data-ai-dropdown>
					<Button 
						variant="secondary" 
						size="sm" 
						onclick={() => showAiDropdown = !showAiDropdown}
					>
						<ExternalLink class="h-4 w-4" />
						<span class="hidden sm:inline">Open in</span>
						<ChevronDown class="h-3 w-3" />
					</Button>

					{#if showAiDropdown}
						<div class="absolute right-0 top-full z-20 mt-1 w-40 rounded-lg border border-border bg-background/95 py-1 shadow-lg backdrop-blur-sm">
							<button 
								class="flex w-full items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent/50"
								onclick={() => handleOpenInAi('claude')}
							>
								<ExternalLink class="h-3 w-3" />
								Claude
							</button>
							<button 
								class="flex w-full items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent/50"
								onclick={() => handleOpenInAi('chatgpt')}
							>
								<ExternalLink class="h-3 w-3" />
								ChatGPT
							</button>
							<button 
								class="flex w-full items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent/50"
								onclick={() => handleOpenInAi('gemini')}
							>
								<ExternalLink class="h-3 w-3" />
								Gemini
							</button>
						</div>
					{/if}
				</div>

				<!-- Fallback copy button for small screens -->
				<div class="sm:hidden">
					<CopyButton content={prompt.content} />
				</div>
			</div>
		</div>
	</div>

	<!-- Content Tabs -->
	<div class="border-b border-border/60 bg-background/60">
		<div class="flex items-center px-4">
			<div class="flex gap-1">
				<button
					class="px-3 py-2 text-sm font-medium transition-colors {activeTab === 'markdown' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}"
					onclick={() => activeTab = 'markdown'}
				>
					Markdown
				</button>
				<button
					class="px-3 py-2 text-sm font-medium transition-colors {activeTab === 'raw' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}"
					onclick={() => activeTab = 'raw'}
				>
					Raw
				</button>
				{#if variables.length > 0}
					<button
						class="px-3 py-2 text-sm font-medium transition-colors {activeTab === 'variables' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}"
						onclick={() => activeTab = 'variables'}
					>
						Variables ({variables.length})
					</button>
				{/if}
			</div>
			<div class="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
				{#if activeTab !== 'variables'}
					<span class="inline-flex items-center gap-1 rounded border border-border/60 bg-background/60 px-2 py-0.5">
						<span class="h-2 w-2 rounded-full bg-emerald-500/80"></span> 
						{activeTab === 'markdown' ? 'Markdown' : 'Plain Text'}
					</span>
					<span class="hidden text-muted-foreground md:inline">Read-only</span>
				{/if}
			</div>
		</div>
	</div>

	<!-- Code viewer card -->
	<div class="flex-1 overflow-hidden">
		<div class="h-full">
			{#if activeTab === 'markdown'}
				<PromptCodeViewer code={prompt.content} language="markdown" />
			{:else if activeTab === 'raw'}
				<div class="h-full overflow-auto bg-background p-4">
					<pre class="text-sm text-foreground whitespace-pre-wrap">{prompt.content}</pre>
				</div>
			{:else if activeTab === 'variables' && variables.length > 0}
				<div class="h-full overflow-auto bg-background p-6">
					<div class="max-w-2xl">
						<div class="mb-6">
							<h3 class="text-lg font-semibold text-foreground mb-2">Template Variables</h3>
							<p class="text-sm text-muted-foreground">
								Customize the prompt by filling in the variables below. Use "Copy with Variables" to get the processed version.
							</p>
						</div>
						<div class="space-y-4">
							{#each variables as variable (variable)}
								<div>
									<label for="var-{variable}" class="block text-sm font-medium text-foreground mb-2">
										{variable}
									</label>
									<textarea
										id="var-{variable}"
										class="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-y min-h-[80px]"
										placeholder="Enter value for {variable}..."
										bind:value={variableValues[variable]}
										oninput={(e) => updateVariable(variable, e.target.value)}
									></textarea>
								</div>
							{/each}
						</div>
						<div class="mt-6 flex gap-2">
							<Button onclick={handleCopyWithVariables}>
								{#if copiedWithVariables}
									<Check class="h-4 w-4" />
									Copied with Variables
								{:else}
									<Copy class="h-4 w-4" />
									Copy with Variables
								{/if}
							</Button>
							<Button variant="secondary" onclick={() => activeTab = 'markdown'}>
								View Result
							</Button>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</section>
