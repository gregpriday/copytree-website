<script>
	import { prompts } from '$lib/prompts/prompts-config.js';
	import * as LucideIcons from 'lucide-svelte';
	import PromptsVideo from './PromptsVideo.svelte';

	/** @type {{ currentSlug: string }} */
	let { currentSlug } = $props();

	/**
	 * Get the icon component by name
	 * @param {string} iconName
	 * @returns {any}
	 */
	const getIconComponent = (iconName) => {
		return /** @type {any} */ (LucideIcons)[iconName] || LucideIcons.FileText;
	};
</script>

<div class="flex h-full w-80 flex-col border-r border-border bg-background">
	<div class="flex-1 space-y-4 overflow-y-auto p-2">
		<div class="space-y-2">
			<div class="px-2 py-1">
				<h2 class="text-sm font-semibold text-foreground">System Prompts</h2>
			</div>
			<nav class="space-y-1">
				{#each prompts as prompt (prompt.id)}
					{@const isActive = currentSlug === prompt.slug}
					{@const IconComponent = getIconComponent(prompt.icon)}
					<a
						href="/prompts/{prompt.slug}"
						class="flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all duration-200 {isActive
							? 'bg-primary/10 font-medium text-primary'
							: 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'}"
					>
						<IconComponent class="h-4 w-4 flex-shrink-0 {isActive ? 'text-primary' : ''}" />
						<span class="truncate">{prompt.title}</span>
					</a>
				{/each}
			</nav>
		</div>
	</div>
	<div class="border-t border-border bg-background p-4">
		<PromptsVideo />
	</div>
</div>
