<script>
	import { page } from '$app/stores';
	import LogoIcon from '../shared/LogoIcon.svelte';
	import ThemeToggle from '../shared/ThemeToggle.svelte';
	import CopyCommand from '../shared/CopyCommand.svelte';

	let isMenuOpen = $state(false);

	// Close mobile menu when clicking outside or on navigation
	const closeMenu = () => {
		isMenuOpen = false;
	};

	// Handle escape key to close menu
	$effect(() => {
		/** @param {KeyboardEvent} event */
		const handleKeydown = (event) => {
			if (event.key === 'Escape' && isMenuOpen) {
				closeMenu();
			}
		};

		document.addEventListener('keydown', handleKeydown);
		return () => document.removeEventListener('keydown', handleKeydown);
	});

	// Close menu on route change
	$effect(() => {
		$page.url.pathname;
		closeMenu();
	});
</script>

<header class="sticky top-0 z-50 w-full">
	<nav class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
		<div
			class="relative overflow-hidden rounded-b-lg border border-zinc-200/20 transition-all duration-300 lg:rounded-b-2xl dark:border-zinc-800/30"
		>
			<!-- Layer 1: Glass tint + Backdrop blur -->
			<div class="absolute inset-0 bg-white/75 backdrop-blur-xl dark:bg-zinc-950/60"></div>

			<!-- Layer 2: Noise texture overlay -->
			<div
				class="absolute inset-0 opacity-[0.05] mix-blend-overlay dark:opacity-[0.08]"
				style="background-image: url(/noise-texture.png); background-repeat: repeat;"
			></div>

			<!-- Content container -->
			<div
				class="relative flex h-[60px] items-center justify-between px-2 py-1.5 lg:py-[0.4375rem] lg:pr-[0.4375rem]"
			>
				<div class="flex items-center">
					<a href="/" class="group flex items-center gap-2.5 lg:px-3">
						<LogoIcon size="sm" class="group-hover:brightness-125" />
						<span
							class="text-lg font-[var(--font-space-grotesk)] font-semibold tracking-tight text-foreground"
						>
							CopyTree
						</span>
					</a>
				</div>

				<nav
					class="hidden items-center gap-5 px-2 font-medium text-muted-foreground transition-colors duration-200 lg:flex xl:gap-6"
					aria-label="Primary navigation"
				>
					<a
						href="/docs"
						class="rounded-md p-2 text-sm transition-colors duration-200 hover:bg-muted hover:text-foreground/90 focus:ring-2 focus:ring-primary focus:outline-none"
					>
						Documentation
					</a>
					<a
						href="/prompts"
						class="rounded-md p-2 text-sm transition-colors duration-200 hover:bg-muted hover:text-foreground/90 focus:ring-2 focus:ring-primary focus:outline-none"
					>
						Prompts
					</a>
					<a
						href="/#video"
						class="rounded-md p-2 text-sm transition-colors duration-200 hover:bg-muted hover:text-foreground/90 focus:ring-2 focus:ring-primary focus:outline-none"
					>
						Demo
					</a>
				</nav>

				<div class="hidden items-center gap-3 lg:flex">
					<CopyCommand command="npm install -g copytree" />
					<ThemeToggle class="p-2" />
				</div>

				<div class="flex items-center gap-3 lg:hidden">
					<ThemeToggle class="p-2" />
					<button
						onclick={() => (isMenuOpen = !isMenuOpen)}
						class="relative rounded-md p-2 text-muted-foreground transition-colors duration-200 hover:text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
						aria-label="Toggle menu"
						aria-expanded={isMenuOpen}
					>
						<svg
							class="h-6 w-6"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							viewBox="0 0 24 24"
							stroke="currentColor"
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
			class="transition-all duration-300 ease-in-out lg:hidden {isMenuOpen
				? 'visible max-h-screen opacity-100'
				: 'invisible max-h-0 overflow-hidden opacity-0'}"
		>
			<div
				class="relative mt-2 overflow-hidden rounded-lg border border-zinc-200/20 dark:border-zinc-800/30"
			>
				<!-- Layer 1: Backdrop blur -->
				<div class="absolute inset-0 backdrop-blur-xl"></div>

				<!-- Layer 2: Glass tint -->
				<div class="absolute inset-0 bg-background/80 dark:bg-zinc-950/80"></div>

				<!-- Layer 3: Noise texture overlay -->
				<div
					class="absolute inset-0 opacity-[0.04] mix-blend-overlay"
					style="background-image: url(/noise-texture.png); background-repeat: repeat; background-size: 128px 128px;"
				></div>

				<!-- Content container -->
				<div class="relative py-4">
					<div class="flex flex-col space-y-1">
						<a
							href="/docs"
							class="rounded-lg px-4 py-3 text-sm text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
							onclick={closeMenu}
						>
							Documentation
						</a>
						<a
							href="/prompts"
							class="rounded-lg px-4 py-3 text-sm text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
							onclick={closeMenu}
						>
							Prompts
						</a>
						<a
							href="/#video"
							class="rounded-lg px-4 py-3 text-sm text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
							onclick={closeMenu}
						>
							Demo
						</a>
						<a
							href="https://github.com/gregpriday/copytree"
							target="_blank"
							rel="noopener noreferrer"
							class="rounded-lg px-4 py-3 text-sm text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
							onclick={closeMenu}
						>
							GitHub
						</a>
						<div class="px-4 pt-4">
							<a
								href="/docs#installation"
								class="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:outline-none"
								onclick={closeMenu}
							>
								Install CopyTree
								<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width={2}
										d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
									/>
								</svg>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</nav>
</header>
