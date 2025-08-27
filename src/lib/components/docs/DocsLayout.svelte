<script>
	import { SharedHero } from '../shared/index.js';
	import DocsScrollTracker from './DocsScrollTracker.svelte';
	import { GeometricDivider } from '../shared/index.js';
    import { Link as LinkIcon, Pencil } from 'lucide-svelte';

	// Import all section components
	import Overview from './sections/Overview.svelte';
	import Installation from './sections/Installation.svelte';
	import QuickStart from './sections/QuickStart.svelte';
	import Usage from './sections/Usage.svelte';
	import Configuration from './sections/Configuration.svelte';
	import Profiles from './sections/Profiles.svelte';
	import Transformers from './sections/Transformers.svelte';
	import CommandsReference from './sections/CommandsReference.svelte';
	import AdvancedFeatures from './sections/AdvancedFeatures.svelte';
	import Troubleshooting from './sections/Troubleshooting.svelte';

	/**
	 * @typedef {Object} Section
	 * @property {string} id
	 * @property {string} title
	 */

	// Define sections for navigation matching the original React component
	/** @type {Section[]} */
	const sections = [
		{ id: 'overview', title: 'Overview' },
		{ id: 'installation', title: 'Installation' },
		{ id: 'quick-start', title: 'Quick Start' },
		{ id: 'usage', title: 'Usage' },
		{ id: 'configuration', title: 'Configuration' },
		{ id: 'profiles', title: 'Profiles' },
		{ id: 'transformers', title: 'Transformers' },
		{ id: 'commands', title: 'Commands Reference' },
		{ id: 'advanced', title: 'Advanced Features' },
		{ id: 'troubleshooting', title: 'Troubleshooting' }
	];

    // Map section id to repo file for edit links
    const sectionToFile = {
        overview: 'src/lib/components/docs/sections/Overview.svelte',
        installation: 'src/lib/components/docs/sections/Installation.svelte',
        'quick-start': 'src/lib/components/docs/sections/QuickStart.svelte',
        usage: 'src/lib/components/docs/sections/Usage.svelte',
        configuration: 'src/lib/components/docs/sections/Configuration.svelte',
        profiles: 'src/lib/components/docs/sections/Profiles.svelte',
        transformers: 'src/lib/components/docs/sections/Transformers.svelte',
        commands: 'src/lib/components/docs/sections/CommandsReference.svelte',
        advanced: 'src/lib/components/docs/sections/AdvancedFeatures.svelte',
        troubleshooting: 'src/lib/components/docs/sections/Troubleshooting.svelte'
    };
    const repoEditBase = 'https://github.com/gregpriday/copytree/edit/main/';

    // Track active section locally for prev/next nav
    let activeSectionId = $state('overview');
    const HEADER_OFFSET = 90;
    function updateActiveSection() {
        const scrollY = typeof window !== 'undefined' ? window.scrollY + HEADER_OFFSET : 0;
        /** @type {{id:string, element:HTMLElement}[]} */
        const els = sections
            .map((s) => {
                const el = typeof document !== 'undefined' ? document.getElementById(s.id) : null;
                return el ? { id: s.id, element: el } : null;
            })
            .filter((x) => x);
        if (!els.length) return;
        let current = els[0].id;
        for (let i = 0; i < els.length; i++) {
            const cur = els[i];
            const next = els[i + 1];
            const curTop = cur.element.offsetTop;
            const nextTop = next?.element.offsetTop ?? Infinity;
            if (scrollY >= curTop && scrollY < nextTop) {
                current = cur.id;
                break;
            }
        }
        const last = els[els.length - 1];
        if (last && scrollY >= last.element.offsetTop) current = last.id;
        if (activeSectionId !== current) activeSectionId = current;
    }
    $effect(() => {
        if (typeof window === 'undefined') return;
        updateActiveSection();
        const onScroll = () => updateActiveSection();
        const onResize = () => updateActiveSection();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onResize);
        };
    });

    // Back to top button visibility
    let showBackToTop = $state(false);
    $effect(() => {
        if (typeof window === 'undefined') return;
        const onScroll = () => {
            showBackToTop = window.scrollY > 600;
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    });

    // Derived index of active section for prev/next nav
    const currentIndex = $derived(sections.findIndex((s) => s.id === activeSectionId));
</script>

<!-- Hero Section -->
<SharedHero title="Documentation" />

<!-- Main Content Area -->
<div class="relative">
	<!-- Skip link for docs page content -->
	<a
		href="#docs-content"
		class="sr-only focus:not-sr-only fixed left-2 top-2 z-[1000] rounded-md border border-border bg-background px-3 py-2 text-foreground"
	>
		Skip to docs content
	</a>
	<div class="max-w-container mx-auto px-6 py-12 md:px-9">
        <div class="flex gap-12">
            <!-- Sidebar with scroll tracking -->
            <DocsScrollTracker {sections} />

            <!-- Content -->
            <div class="min-w-0 flex-1">
                <div id="docs-content" tabindex="-1" class="space-y-12 max-w-[88ch] mx-auto">
					<!-- Overview Section -->
					<section id="overview" class="relative group/section scroll-mt-[90px]" style="content-visibility:auto; contain-intrinsic-size: 1px 1000px;">
						<!-- Section tools: anchor + edit link -->
						<div class="absolute right-0 -top-9 flex gap-1 opacity-0 transition-opacity duration-200 group-hover/section:opacity-100 focus-within:opacity-100">
							<a href="#overview" class="inline-flex items-center gap-1 rounded-md border border-border bg-background/70 px-2 py-1 text-xs text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Link to Overview section">
								<LinkIcon class="h-3.5 w-3.5" />
								<span>Link</span>
							</a>
							<a href={`${repoEditBase}${sectionToFile['overview']}`} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 rounded-md border border-border bg-background/70 px-2 py-1 text-xs text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Edit Overview section on GitHub">
								<Pencil class="h-3.5 w-3.5" />
								<span>Edit</span>
							</a>
						</div>
						<Overview />
					</section>

					<GeometricDivider />

					<!-- Installation Section -->
					<section id="installation" class="relative group/section scroll-mt-[90px]" style="content-visibility:auto; contain-intrinsic-size: 1px 1000px;">
						<div class="absolute right-0 -top-9 flex gap-1 opacity-0 transition-opacity duration-200 group-hover/section:opacity-100 focus-within:opacity-100">
							<a href="#installation" class="inline-flex items-center gap-1 rounded-md border border-border bg-background/70 px-2 py-1 text-xs text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Link to Installation section">
								<LinkIcon class="h-3.5 w-3.5" />
								<span>Link</span>
							</a>
							<a href={`${repoEditBase}${sectionToFile['installation']}`} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 rounded-md border border-border bg-background/70 px-2 py-1 text-xs text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Edit Installation section on GitHub">
								<Pencil class="h-3.5 w-3.5" />
								<span>Edit</span>
							</a>
						</div>
						<Installation />
					</section>

					<div class="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

					<!-- Quick Start Section -->
					<section id="quick-start" class="relative group/section scroll-mt-[90px]" style="content-visibility:auto; contain-intrinsic-size: 1px 1000px;">
						<div class="absolute right-0 -top-9 flex gap-1 opacity-0 transition-opacity duration-200 group-hover/section:opacity-100 focus-within:opacity-100">
							<a href="#quick-start" class="inline-flex items-center gap-1 rounded-md border border-border bg-background/70 px-2 py-1 text-xs text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Link to Quick Start section">
								<LinkIcon class="h-3.5 w-3.5" />
								<span>Link</span>
							</a>
							<a href={`${repoEditBase}${sectionToFile['quick-start']}`} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 rounded-md border border-border bg-background/70 px-2 py-1 text-xs text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Edit Quick Start section on GitHub">
								<Pencil class="h-3.5 w-3.5" />
								<span>Edit</span>
							</a>
						</div>
						<QuickStart />
					</section>

					<div class="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

					<!-- Usage Section -->
					<section id="usage" class="relative group/section scroll-mt-[90px]" style="content-visibility:auto; contain-intrinsic-size: 1px 1000px;">
						<div class="absolute right-0 -top-9 flex gap-1 opacity-0 transition-opacity duration-200 group-hover/section:opacity-100 focus-within:opacity-100">
							<a href="#usage" class="inline-flex items-center gap-1 rounded-md border border-border bg-background/70 px-2 py-1 text-xs text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Link to Usage section">
								<LinkIcon class="h-3.5 w-3.5" />
								<span>Link</span>
							</a>
							<a href={`${repoEditBase}${sectionToFile['usage']}`} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 rounded-md border border-border bg-background/70 px-2 py-1 text-xs text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Edit Usage section on GitHub">
								<Pencil class="h-3.5 w-3.5" />
								<span>Edit</span>
							</a>
						</div>
						<Usage />
					</section>

					<div class="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

					<!-- Configuration Section -->
					<section id="configuration" class="relative group/section scroll-mt-[90px]" style="content-visibility:auto; contain-intrinsic-size: 1px 1000px;">
						<div class="absolute right-0 -top-9 flex gap-1 opacity-0 transition-opacity duration-200 group-hover/section:opacity-100 focus-within:opacity-100">
							<a href="#configuration" class="inline-flex items-center gap-1 rounded-md border border-border bg-background/70 px-2 py-1 text-xs text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Link to Configuration section">
								<LinkIcon class="h-3.5 w-3.5" />
								<span>Link</span>
							</a>
							<a href={`${repoEditBase}${sectionToFile['configuration']}`} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 rounded-md border border-border bg-background/70 px-2 py-1 text-xs text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Edit Configuration section on GitHub">
								<Pencil class="h-3.5 w-3.5" />
								<span>Edit</span>
							</a>
						</div>
						<Configuration />
					</section>

					<GeometricDivider />

					<!-- Profiles Section -->
					<section id="profiles" class="relative group/section scroll-mt-[90px]" style="content-visibility:auto; contain-intrinsic-size: 1px 1000px;">
						<div class="absolute right-0 -top-9 flex gap-1 opacity-0 transition-opacity duration-200 group-hover/section:opacity-100 focus-within:opacity-100">
							<a href="#profiles" class="inline-flex items-center gap-1 rounded-md border border-border bg-background/70 px-2 py-1 text-xs text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Link to Profiles section">
								<LinkIcon class="h-3.5 w-3.5" />
								<span>Link</span>
							</a>
							<a href={`${repoEditBase}${sectionToFile['profiles']}`} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 rounded-md border border-border bg-background/70 px-2 py-1 text-xs text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Edit Profiles section on GitHub">
								<Pencil class="h-3.5 w-3.5" />
								<span>Edit</span>
							</a>
						</div>
						<Profiles />
					</section>

					<div class="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

					<!-- Transformers Section -->
					<section id="transformers" class="relative group/section scroll-mt-[90px]" style="content-visibility:auto; contain-intrinsic-size: 1px 1000px;">
						<div class="absolute right-0 -top-9 flex gap-1 opacity-0 transition-opacity duration-200 group-hover/section:opacity-100 focus-within:opacity-100">
							<a href="#transformers" class="inline-flex items-center gap-1 rounded-md border border-border bg-background/70 px-2 py-1 text-xs text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Link to Transformers section">
								<LinkIcon class="h-3.5 w-3.5" />
								<span>Link</span>
							</a>
							<a href={`${repoEditBase}${sectionToFile['transformers']}`} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 rounded-md border border-border bg-background/70 px-2 py-1 text-xs text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Edit Transformers section on GitHub">
								<Pencil class="h-3.5 w-3.5" />
								<span>Edit</span>
							</a>
						</div>
						<Transformers />
					</section>

					<div class="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

					<!-- Commands Reference Section -->
					<section id="commands" class="relative group/section scroll-mt-[90px]" style="content-visibility:auto; contain-intrinsic-size: 1px 1000px;">
						<div class="absolute right-0 -top-9 flex gap-1 opacity-0 transition-opacity duration-200 group-hover/section:opacity-100 focus-within:opacity-100">
							<a href="#commands" class="inline-flex items-center gap-1 rounded-md border border-border bg-background/70 px-2 py-1 text-xs text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Link to Commands Reference section">
								<LinkIcon class="h-3.5 w-3.5" />
								<span>Link</span>
							</a>
							<a href={`${repoEditBase}${sectionToFile['commands']}`} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 rounded-md border border-border bg-background/70 px-2 py-1 text-xs text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Edit Commands Reference section on GitHub">
								<Pencil class="h-3.5 w-3.5" />
								<span>Edit</span>
							</a>
						</div>
						<CommandsReference />
					</section>

					<div class="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

					<!-- Advanced Features Section -->
					<section id="advanced" class="relative group/section scroll-mt-[90px]" style="content-visibility:auto; contain-intrinsic-size: 1px 1000px;">
						<div class="absolute right-0 -top-9 flex gap-1 opacity-0 transition-opacity duration-200 group-hover/section:opacity-100 focus-within:opacity-100">
							<a href="#advanced" class="inline-flex items-center gap-1 rounded-md border border-border bg-background/70 px-2 py-1 text-xs text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Link to Advanced Features section">
								<LinkIcon class="h-3.5 w-3.5" />
								<span>Link</span>
							</a>
							<a href={`${repoEditBase}${sectionToFile['advanced']}`} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 rounded-md border border-border bg-background/70 px-2 py-1 text-xs text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Edit Advanced Features section on GitHub">
								<Pencil class="h-3.5 w-3.5" />
								<span>Edit</span>
							</a>
						</div>
						<AdvancedFeatures />
					</section>

					<GeometricDivider />

    					<!-- Troubleshooting Section -->
					<section id="troubleshooting" class="relative group/section scroll-mt-[90px]" style="content-visibility:auto; contain-intrinsic-size: 1px 1000px;">
						<div class="absolute right-0 -top-9 flex gap-1 opacity-0 transition-opacity duration-200 group-hover/section:opacity-100 focus-within:opacity-100">
							<a href="#troubleshooting" class="inline-flex items-center gap-1 rounded-md border border-border bg-background/70 px-2 py-1 text-xs text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Link to Troubleshooting section">
								<LinkIcon class="h-3.5 w-3.5" />
								<span>Link</span>
							</a>
							<a href={`${repoEditBase}${sectionToFile['troubleshooting']}`} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 rounded-md border border-border bg-background/70 px-2 py-1 text-xs text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Edit Troubleshooting section on GitHub">
								<Pencil class="h-3.5 w-3.5" />
								<span>Edit</span>
							</a>
						</div>
						<Troubleshooting />
					</section>

                    <!-- Prev/Next section navigation (aligned with content column) -->
                    <nav aria-label="Section navigation" class="mt-10 border-t border-border pt-6 mb-16">
                        <div class="flex items-center justify-between gap-3">
                            {#if currentIndex > 0}
                                {@const prev = sections[currentIndex - 1]}
                                <a href={`#${prev.id}`} class="group inline-flex max-w-[45%] items-center gap-2 rounded-md border border-border bg-background/60 px-3 py-2 text-left text-sm text-foreground shadow-sm transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary">
                                    <span aria-hidden="true" class="text-muted-foreground group-hover:text-foreground">←</span>
                                    <span class="truncate"><span class="text-muted-foreground">Previous:</span> {prev.title}</span>
                                </a>
                            {:else}
                                <span></span>
                            {/if}
                            {#if currentIndex < sections.length - 1}
                                {@const next = sections[currentIndex + 1]}
                                <a href={`#${next.id}`} class="group inline-flex max-w-[45%] items-center gap-2 justify-end rounded-md border border-border bg-background/60 px-3 py-2 text-right text-sm text-foreground shadow-sm transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary">
                                    <span class="truncate"><span class="text-muted-foreground">Next:</span> {next.title}</span>
                                    <span aria-hidden="true" class="text-muted-foreground group-hover:text-foreground">→</span>
                                </a>
                            {/if}
                        </div>
                    </nav>
                </div>
            </div>

            <!-- Right spacer equal to sidebar width for visual balance on wide screens -->
            <div class="hidden w-56 flex-shrink-0 lg:block" aria-hidden="true"></div>
        </div>
    </div>

    <!-- Back to top button -->
    {#if showBackToTop}
        <button onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} class="fixed bottom-6 right-6 z-40 rounded-full border border-border bg-background/80 p-3 text-sm text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Back to top">
            ↑
        </button>
    {/if}
</div>
