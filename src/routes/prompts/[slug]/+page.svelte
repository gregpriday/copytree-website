<script>
	import { browser } from '$app/environment';
	import PromptExplorer from '$lib/components/prompts/PromptExplorer.svelte';
	import PromptViewer from '$lib/components/prompts/PromptViewer.svelte';

	let { data } = $props();
	
	// Resizable split view state
	let sidebarWidth = $state(320);
	let isResizing = $state(false);
	let minWidth = 240;
	let maxWidth = 560;
	
	// Load saved width from localStorage
	$effect(() => {
		if (browser) {
			const saved = localStorage.getItem('prompts-sidebar-width');
			if (saved) {
				sidebarWidth = Math.min(maxWidth, Math.max(minWidth, parseInt(saved)));
			}
		}
	});
	
	// Save width to localStorage
	$effect(() => {
		if (browser && !isResizing) {
			localStorage.setItem('prompts-sidebar-width', sidebarWidth.toString());
		}
	});
	
	/**
	 * Start resizing
	 * @param {PointerEvent} e
	 */
	function startResize(e) {
		isResizing = true;
		e.preventDefault();
		
		const startX = e.clientX;
		const startWidth = sidebarWidth;
		
		/**
		 * @param {PointerEvent} e
		 */
		function handleResize(e) {
			const delta = e.clientX - startX;
			sidebarWidth = Math.min(maxWidth, Math.max(minWidth, startWidth + delta));
		}
		
		function stopResize() {
			isResizing = false;
			document.removeEventListener('pointermove', handleResize);
			document.removeEventListener('pointerup', stopResize);
		}
		
		document.addEventListener('pointermove', handleResize);
		document.addEventListener('pointerup', stopResize);
	}
	
	/**
	 * Keyboard navigation for resize handle
	 * @param {KeyboardEvent} e
	 */
	function handleKeyResize(e) {
		const step = 24;
		switch(e.key) {
			case 'ArrowLeft':
				e.preventDefault();
				sidebarWidth = Math.max(minWidth, sidebarWidth - step);
				break;
			case 'ArrowRight':
				e.preventDefault();
				sidebarWidth = Math.min(maxWidth, sidebarWidth + step);
				break;
		}
	}
</script>

<div class="flex h-[calc(100vh-310px)] overflow-hidden rounded-lg border border-border bg-background/60 backdrop-blur-sm">
	<!-- Explorer sidebar -->
	<div 
		class="border-r border-border overflow-hidden flex-shrink-0"
		style="width: {sidebarWidth}px"
	>
		<PromptExplorer currentSlug={data.currentSlug} />
	</div>
	
	<!-- Resize handle -->
	<div
		role="separator"
		aria-orientation="vertical"
		aria-label="Resize sidebar"
		aria-valuemin={minWidth}
		aria-valuemax={maxWidth}
		aria-valuenow={sidebarWidth}
		tabindex="0"
		class="group relative w-1 cursor-col-resize bg-border/50 hover:bg-primary/40 transition-colors duration-150 focus:outline-none focus:bg-primary/60"
		onpointerdown={startResize}
		onkeydown={handleKeyResize}
	>
		<!-- Visual indicator on hover/focus -->
		<div class="absolute inset-y-0 left-1/2 -translate-x-1/2 w-4 group-hover:bg-gradient-to-r group-hover:from-transparent group-hover:via-primary/10 group-hover:to-transparent pointer-events-none" />
	</div>
	
	<!-- Viewer pane -->
	<div class="flex-1 overflow-hidden">
		<PromptViewer prompt={data.prompt} />
	</div>
</div>

<style>
	/* Hide resize handle on mobile */
	@media (max-width: 768px) {
		[role="separator"] {
			display: none;
		}
	}
</style>