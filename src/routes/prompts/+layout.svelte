<script>
	import { browser } from '$app/environment';
	import { SharedHero } from '$lib/components/shared';
	import { PromptCommandPalette } from '$lib/components/prompts';

	let { children } = $props();
	
	// Command palette state
	let commandPaletteOpen = $state(false);
	
	// Handle keyboard shortcut for command palette
	$effect(() => {
		if (browser) {
			function handleKeyDown(e) {
				// Cmd+K or Ctrl+K
				if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
					e.preventDefault();
					commandPaletteOpen = true;
				}
			}
			
			document.addEventListener('keydown', handleKeyDown);
			
			return () => {
				document.removeEventListener('keydown', handleKeyDown);
			};
		}
	});
	
	function closeCommandPalette() {
		commandPaletteOpen = false;
	}
</script>

<svelte:head>
	<title>AI System Prompts - CopyTree</title>
	<meta
		name="description"
		content="Optimized system prompts for AI coding agents. Copy and adapt prompts for Claude, ChatGPT, Grok, and Gemini to enhance your development workflow."
	/>
</svelte:head>

<SharedHero title="System Prompts" />
<div class="max-w-container mx-auto px-6 py-8 md:px-9">
	{@render children?.()}
</div>

<!-- Command Palette -->
<PromptCommandPalette open={commandPaletteOpen} onClose={closeCommandPalette} />