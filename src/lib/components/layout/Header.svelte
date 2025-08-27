<script>
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import LogoIcon from '../shared/LogoIcon.svelte';
	import ThemeToggle from '../shared/ThemeToggle.svelte';
	import { Button } from '../shared';

	let isMenuOpen = $state(false);
	let isScrolled = $state(false);

	// Accessibility: track elements for focus management
	let menuButton;
	let mobileMenu;
	let previousActiveElement = null;

	const handleScroll = () => {
		isScrolled = window.scrollY > 10;
	};

	const closeMenu = () => (isMenuOpen = false);

	// Close on escape
	$effect(() => {
		const onKey = (e) => e.key === 'Escape' && isMenuOpen && closeMenu();
		document.addEventListener('keydown', onKey);
		return () => document.removeEventListener('keydown', onKey);
	});

	// Close on route change
	$effect(() => {
		$page.url.pathname;
		closeMenu();
	});

	// Track scroll for glassmorphism enhancement
	$effect(() => {
		if (!browser) return;
		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll(); // initialize on mount
		return () => window.removeEventListener('scroll', handleScroll);
	});

	// Body scroll lock + focus trap when mobile menu is open
	$effect(() => {
		if (!browser) return;

		const focusableSelectors = [
			'a[href]','button:not([disabled])','textarea','input[type="text"]','input[type="radio"]','input[type="checkbox"]','select','[tabindex]:not([tabindex="-1"])'
		].join(',');

		function trapFocus(e) {
			if (!isMenuOpen || !mobileMenu) return;
			if (e.key !== 'Tab') return;
			const focusable = Array.from(mobileMenu.querySelectorAll(focusableSelectors)).filter(
				(el) => el.offsetParent !== null
			);
			if (focusable.length === 0) return;
			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			const active = document.activeElement;
			if (e.shiftKey && active === first) {
				e.preventDefault();
				last.focus();
			} else if (!e.shiftKey && active === last) {
				e.preventDefault();
				first.focus();
			}
		}

		if (isMenuOpen) {
			// Lock body scroll
			const prevOverflow = document.body.style.overflow;
			document.body.style.overflow = 'hidden';
			previousActiveElement = document.activeElement;

			// Move focus into menu
			queueMicrotask(() => {
				if (!mobileMenu) return;
				const firstFocusable = mobileMenu.querySelector(focusableSelectors);
				if (firstFocusable && firstFocusable.focus) firstFocusable.focus();
			});

			document.addEventListener('keydown', trapFocus);

			// Cleanup when menu closes
			return () => {
				document.body.style.overflow = prevOverflow;
				document.removeEventListener('keydown', trapFocus);
				if (previousActiveElement && previousActiveElement.focus) {
					previousActiveElement.focus();
				}
			};
		}
	});

	const nav = [
		{ href: '/docs', label: 'Documentation' },
		{ href: '/prompts', label: 'Prompts' },
		{ href: '/#video', label: 'Demo' }
	];

	const isActive = (href) =>
		$page.url.pathname === href || $page.url.pathname.startsWith(href + '/');
</script>

<header
	class="fixed -top-px z-50 w-full"
	role="banner"
>
	<nav class="max-w-container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Primary">
		<div
			class="relative overflow-hidden rounded-b-xl border border-border/60 shadow-sm transition-all duration-300 lg:rounded-b-2xl"
		>
			<!-- Glass + blur (scroll-reactive) -->
			<div
				class="absolute inset-0 transition-all duration-300 {isScrolled
					? 'bg-white/70 dark:bg-zinc-950/70'
					: 'bg-white/50 dark:bg-zinc-950/50'}"
				style="backdrop-filter: blur({isScrolled ? '8px' : '6px'}); -webkit-backdrop-filter: blur({isScrolled ? '8px' : '6px'});"
				aria-hidden="true"
			></div>

			<!-- Noise -->
			<div
				class="absolute inset-0 opacity-[0.12] mix-blend-overlay dark:opacity-[0.15]"
				style="background-image: url(/noise-texture.png); background-size: 128px 128px; background-repeat: repeat;"
				aria-hidden="true"
			></div>

			<!-- Edge gradients -->
			<div
				class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-zinc-300/10"
				aria-hidden="true"
			></div>
			<div
				class="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-black/5 to-transparent dark:via-black/30"
				aria-hidden="true"
			></div>

			<!-- Content -->
			<div
				class="relative flex h-[60px] items-center justify-between px-2 lg:h-16"
				role="navigation"
			>
				<!-- Brand -->
				<a href="/" class="group flex items-center gap-2.5 lg:px-2" aria-label="CopyTree home">
					<LogoIcon size="sm" class="transition duration-200 group-hover:brightness-110" />
					<span
						class="text-[17px] font-[var(--font-space-grotesk)] font-semibold tracking-tight text-foreground"
					>
						CopyTree
					</span>
				</a>

				<!-- Desktop nav -->
				<div class="hidden items-center gap-1.5 lg:flex">
					<nav class="flex items-center gap-1.5 px-1 text-sm font-medium text-muted-foreground">
						{#each nav as item}
							<a
								href={item.href}
								class="group relative rounded-md px-3 py-2 transition-colors duration-200 hover:text-foreground/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background focus:outline-none"
								aria-current={isActive(item.href) ? 'page' : undefined}
							>
								<span class="relative">
									{item.label}
									<span
										class="pointer-events-none absolute -bottom-1.5 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded bg-primary/70 transition-[width] duration-200 group-hover:w-7"
										aria-hidden="true"
									></span>
									{#if isActive(item.href)}
										<span
											class="pointer-events-none absolute -bottom-1.5 left-1/2 h-[2px] w-7 -translate-x-1/2 rounded bg-primary"
											aria-hidden="true"
										></span>
									{/if}
								</span>
							</a>
						{/each}
					</nav>

					<!-- Actions -->
					<div class="ml-2 flex items-center gap-2">
						<a href="/docs#installation" aria-label="Install CopyTree">
							<Button size="sm" variant="primary" class="px-3.5 py-2.5">
								<span class="relative z-10">Install</span>
								<svg
									class="relative z-10 ml-2 h-4 w-4"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
									/>
								</svg>
							</Button>
						</a>
						<a
							href="https://github.com/gregpriday/copytree"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="View on GitHub"
						>
							<Button variant="secondary" size="sm" class="px-3.5 py-2.5">
								<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
									<path
										fill-rule="evenodd"
										d="M12 .5C5.73.5.98 5.24.98 11.52c0 4.86 3.15 8.98 7.52 10.44.55.1.75-.24.75-.54 0-.27-.01-1.16-.02-2.1-3.06.66-3.71-1.31-3.71-1.31-.5-1.26-1.22-1.6-1.22-1.6-.99-.67.07-.66.07-.66 1.1.08 1.68 1.12 1.68 1.12.98 1.67 2.57 1.19 3.2.91.1-.71.38-1.19.69-1.47-2.44-.28-5.01-1.22-5.01-5.42 0-1.2.43-2.17 1.12-2.94-.11-.28-.49-1.43.11-2.98 0 0 .92-.3 3.02 1.13a10.5 10.5 0 0 1 5.5 0c2.1-1.43 3.02-1.13 3.02-1.13.6 1.55.22 2.7.11 2.98.7.77 1.12 1.74 1.12 2.94 0 4.21-2.57 5.13-5.01 5.41.39.34.73 1 .73 2.02 0 1.46-.01 2.64-.01 3 0 .3.2.65.76.54 4.36-1.46 7.5-5.58 7.5-10.44C23.02 5.24 18.27.5 12 .5Z"
										clip-rule="evenodd"
									/>
								</svg>
								<span class="ml-2">GitHub</span>
							</Button>
						</a>
						<ThemeToggle class="ml-1 p-2" />
					</div>
				</div>

				<!-- Mobile toggles -->
				<div class="flex items-center gap-2 lg:hidden">
					<ThemeToggle class="p-2" />
				<button
					bind:this={menuButton}
					onclick={() => (isMenuOpen = !isMenuOpen)}
					class="relative rounded-md p-2 text-muted-foreground transition-colors duration-200 hover:text-foreground focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background focus:outline-none"
					aria-label="Toggle menu"
					aria-expanded={isMenuOpen}
					aria-controls="mobile-menu"
				>
						<svg
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							{#if isMenuOpen}
								<path d="M6 18L18 6M6 6l12 12" />
							{:else}
								<path d="M4 6h16M4 12h16M4 18h16" />
							{/if}
						</svg>
					</button>
				</div>
			</div>
		</div>

		<!-- Mobile menu -->
		<div
			id="mobile-menu"
			bind:this={mobileMenu}
			class="origin-top transition-all duration-200 ease-out lg:hidden {isMenuOpen
				? 'visible scale-y-100 opacity-100'
				: 'invisible max-h-0 scale-y-95 opacity-0'}"
			role="region"
			aria-label="Mobile navigation"
		>
			<div class="relative mt-2 overflow-hidden rounded-xl border border-border/50 shadow-md">
				<!-- Blur + tint -->
				<div
					class="absolute inset-0 bg-background/75 dark:bg-zinc-950/75"
					style="backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);"
					aria-hidden="true"
				></div>
				<!-- Noise -->
				<div
					class="absolute inset-0 opacity-[0.12] mix-blend-overlay dark:opacity-[0.15]"
					style="background-image: url(/noise-texture.png); background-repeat: repeat; background-size: 128px 128px;"
					aria-hidden="true"
				></div>

				<div class="relative py-2">
					<div class="flex flex-col">
						{#each nav as item}
							<a
								href={item.href}
								onclick={closeMenu}
								class="rounded-md px-4 py-3 text-[15px] text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background focus:outline-none"
								aria-current={isActive(item.href) ? 'page' : undefined}
								role="menuitem"
							>
								{item.label}
							</a>
						{/each}

						<div
							class="mx-4 my-3 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent"
							aria-hidden="true"
						></div>

						<a
							href="https://github.com/gregpriday/copytree"
							target="_blank"
							rel="noopener noreferrer"
							onclick={closeMenu}
							class="rounded-md px-4 py-3 text-[15px] text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background focus:outline-none"
						>
							GitHub
						</a>

						<div class="px-4 pt-2 pb-4">
							<a href="/docs#installation" onclick={closeMenu} aria-label="Install CopyTree">
								<Button variant="primary" size="sm" class="w-full justify-between px-4 py-3">
									<span>Install CopyTree</span>
									<svg
										class="h-4 w-4 transition-transform group-hover:translate-y-px"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
										/>
									</svg>
								</Button>
							</a>
							<p class="mt-2 px-0.5 text-xs text-muted-foreground/80">
								One command to get started with AI-friendly file sharing.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</nav>
</header>
