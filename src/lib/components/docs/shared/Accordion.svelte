<script>
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	/**
	 * @typedef {Object} AccordionItem
	 * @property {string} id
	 * @property {string} title
	 * @property {() => void} content
	 */

	/** @type {{ items: AccordionItem[], defaultOpen?: string[], allowMultiple?: boolean, class?: string }} */
	let { items, defaultOpen = [], allowMultiple = true, class: className = '' } = $props();

	// State management using Svelte 5 runes
	let openItems = $state(new Set(defaultOpen));

	/**
	 * Toggle accordion item
	 * @param {string} itemId
	 */
	function toggleItem(itemId) {
		const newOpenItems = new Set(openItems);

		if (newOpenItems.has(itemId)) {
			// Close the item
			newOpenItems.delete(itemId);
		} else {
			// Open the item
			if (!allowMultiple) {
				// If only single item allowed, clear all others
				newOpenItems.clear();
			}
			newOpenItems.add(itemId);
		}

		openItems = newOpenItems;
	}

	/**
	 * Handle keyboard navigation
	 * @param {KeyboardEvent} event
	 * @param {string} itemId
	 */
	function handleKeydown(event, itemId) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			toggleItem(itemId);
		}
	}

	/**
	 * Check if item is open
	 * @param {string} itemId
	 * @returns {boolean}
	 */
	function isOpen(itemId) {
		return openItems.has(itemId);
	}
</script>

<div class="w-full space-y-2 {className}">
	{#each items as item (item.id)}
		<div class="overflow-hidden rounded-lg border border-border bg-background/50 backdrop-blur-sm">
			<!-- Accordion Header -->
			<button
				class="group flex w-full items-center justify-between px-6 py-4
               text-left transition-all duration-200
               ease-out hover:bg-muted/30
               focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
				onclick={() => toggleItem(item.id)}
				onkeydown={(e) => handleKeydown(e, item.id)}
				aria-expanded={isOpen(item.id)}
				aria-controls="accordion-content-{item.id}"
				id="accordion-button-{item.id}"
			>
				<!-- Title -->
				<span class="pr-4 text-sm font-medium text-foreground">
					{item.title}
				</span>

				<!-- Expand/Collapse Icon -->
				<div
					class="flex-shrink-0 transition-transform duration-200 ease-out {isOpen(item.id)
						? 'rotate-180'
						: 'rotate-0'}"
				>
					<svg
						class="h-5 w-5 text-muted-foreground group-hover:text-foreground"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</div>
			</button>

			<!-- Accordion Content -->
			{#if isOpen(item.id)}
				<div
					id="accordion-content-{item.id}"
					class="border-t border-border"
					role="region"
					aria-labelledby="accordion-button-{item.id}"
					transition:slide={{ duration: 300, easing: quintOut }}
				>
					<div class="px-6 py-4">
						{@render item.content()}
					</div>
				</div>
			{/if}
		</div>
	{/each}
</div>
