<script>
	import { theme, cycleTheme } from '$lib/stores/theme.js';
	import { browser } from '$app/environment';

	/** @type {{ class?: string, showLabel?: boolean }} */
	let { class: className = '', showLabel = false } = $props();

	let mounted = $state(false);

	// Use auto-subscription with $ prefix - this automatically subscribes/unsubscribes
	$effect(() => {
		if (browser) {
			mounted = true;
		}
	});

	/** @param {string} theme */
	const getIcon = (theme) => {
		if (theme === 'system') {
			return `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>`;
		}

		if (theme === 'dark') {
			return `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>`;
		}

		return `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>`;
	};

	/** @param {string} themeValue */
	const getLabel = (themeValue) => {
		switch (themeValue) {
			case 'light':
				return 'Light';
			case 'dark':
				return 'Dark';
			case 'system':
				return 'System';
			default:
				return 'Theme';
		}
	};
</script>

{#if !mounted}
	<div class="h-10 w-10 animate-pulse rounded-lg bg-muted {className}"></div>
{:else}
	<button
		onclick={cycleTheme}
		class="inline-flex items-center justify-center gap-2 rounded-lg bg-muted text-muted-foreground transition-all duration-200 hover:bg-accent hover:text-foreground hover:!shadow-none {className}"
		title="Current theme: {getLabel($theme)}. Click to cycle."
		aria-label="Switch theme. Current: {getLabel($theme)}"
	>
		{@html getIcon($theme)}
		{#if showLabel}
			<span class="text-sm font-medium">
				{getLabel($theme)}
			</span>
		{/if}
	</button>
{/if}
