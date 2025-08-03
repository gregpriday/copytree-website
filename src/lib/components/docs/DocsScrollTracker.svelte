<script>
	import { browser } from '$app/environment';
	import DocsSidebar from './DocsSidebar.svelte';

	let { sections } = $props();

	let activeSection = $state('overview');

	const HEADER_OFFSET = 90;

	function updateActiveSection() {
		if (!browser) return;

		const scrollY = window.scrollY + HEADER_OFFSET;

		// Get all section elements with proper null filtering
		const sectionElements = sections
			.map((section) => {
				const element = document.getElementById(section.id);
				return element ? { ...section, element } : null;
			})
			.filter((section) => section !== null);

		if (sectionElements.length === 0) return;

		// Find the current active section
		let currentActiveSection = sectionElements[0].id;

		for (let i = 0; i < sectionElements.length; i++) {
			const current = sectionElements[i];
			const next = sectionElements[i + 1];

			// These are now guaranteed to be non-null due to our filtering above
			const currentTop = current.element.offsetTop;
			const nextTop = next?.element.offsetTop ?? Infinity;

			if (scrollY >= currentTop && scrollY < nextTop) {
				currentActiveSection = current.id;
				break;
			}
		}

		// Handle edge case for last section
		const lastSection = sectionElements[sectionElements.length - 1];
		// This is now guaranteed to be non-null due to our filtering above
		if (lastSection && scrollY >= lastSection.element.offsetTop) {
			currentActiveSection = lastSection.id;
		}

		if (activeSection !== currentActiveSection) {
			activeSection = currentActiveSection;
		}
	}

	let throttleTimeout = null;

	function handleScroll() {
		if (throttleTimeout) return;

		throttleTimeout = window.setTimeout(() => {
			updateActiveSection();
			throttleTimeout = null;
		}, 16); // ~60fps
	}

	// Use $effect instead of onMount/onDestroy for Svelte 5
	$effect(() => {
		if (!browser) return;

		// Initial active section detection
		updateActiveSection();

		// Add scroll listener
		window.addEventListener('scroll', handleScroll, { passive: true });

		// Also listen for resize to recalculate positions
		window.addEventListener('resize', updateActiveSection, { passive: true });

		// Cleanup function (equivalent to onDestroy)
		return () => {
			if (throttleTimeout) {
				clearTimeout(throttleTimeout);
			}
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', updateActiveSection);
		};
	});
</script>

<DocsSidebar {sections} {activeSection} />
