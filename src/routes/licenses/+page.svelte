<script>
	import { FileText, Copy, Check } from 'lucide-svelte';

	let { data } = $props();

	const projectLicense = `MIT License
Copyright (c) 2025 Greg Priday
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`;

	const licenseParagraphs = [
		'MIT License',
		'Copyright (c) 2025 Greg Priday',
		'Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:',
		'The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.',
		'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.'
	];

	// Local state for filtering when many items
	let query = $state('');
	const attributions = $derived(data?.attributions ?? []);
	const showSearch = $derived(attributions.length > 20);

	// Manual accordion open-state (ids are name-index)
	let openItems = $state(new Set());
	const keyFor = (dep, i) => `${dep.name}-${i}`;
	const isOpen = (dep, i) => openItems.has(keyFor(dep, i));
	const toggle = (dep, i) => {
		const k = keyFor(dep, i);
		const next = new Set(openItems);
		if (next.has(k)) next.delete(k);
		else next.add(k);
		openItems = next;
	};

	/** Derived, filtered list */
	const filtered = $derived(
		!showSearch || !query.trim()
			? attributions
			: attributions.filter((d) => {
					const q = query.toLowerCase();
					return (
						d.name?.toLowerCase().includes(q) ||
						d.license?.toLowerCase().includes(q) ||
						d.version?.toLowerCase().includes(q)
					);
				})
	);

	// Track copied state per item for feedback
	/** @type {Record<string, boolean>} */
	let copiedMap = $state({});

	// Track copied state for project license
	let projectLicenseCopied = $state(false);

	async function copyProjectLicense() {
		try {
			await navigator.clipboard.writeText(projectLicense);
			projectLicenseCopied = true;
			setTimeout(() => {
				projectLicenseCopied = false;
			}, 1600);
		} catch (e) {
			console.error('Failed to copy project license', e);
		}
	}

	async function copyDepInfo(dep) {
		const text = `${dep.name}@${dep.version} — ${dep.license}\n${dep.url}`;
		try {
			await navigator.clipboard.writeText(text);
			copiedMap[dep.name] = true;
			// ensure reactivity on object mutation
			copiedMap = { ...copiedMap };
			setTimeout(() => {
				copiedMap[dep.name] = false;
				copiedMap = { ...copiedMap };
			}, 1600);
		} catch (e) {
			console.error('Failed to copy dependency info', e);
		}
	}

	/* Removed invalid buildItems() that attempted to embed snippet/JSX inside JS */
</script>

<svelte:head>
	<title>License and Attribution - CopyTree</title>
	<meta
		name="description"
		content="CopyTree is open-source software. Here are the licenses for our project and its dependencies."
	/>
</svelte:head>

<main class="min-h-screen bg-background text-foreground">
	<div class="mx-auto max-w-5xl px-4 py-24 sm:px-6 md:py-32 lg:px-8">
		<h1 class="mb-3 text-4xl font-[var(--font-space-grotesk)] font-bold md:text-5xl">
			License & Attribution
		</h1>
		<p class="text-lg text-muted-foreground">
			CopyTree is proudly built on open-source software. We are grateful to the community for their
			contributions.
		</p>

		<div class="mt-12 space-y-12">
			<!-- Project License -->
			<section>
				<h2 class="mb-4 text-2xl font-[var(--font-space-grotesk)] font-semibold md:text-3xl">
					Project License
				</h2>
				<p class="mb-6 text-muted-foreground">
					The CopyTree project is licensed under the MIT License.
				</p>

				<div
					class="w-full overflow-hidden rounded-xl border border-border bg-background/50 shadow-md backdrop-blur-sm transition-all duration-200 hover:shadow-lg"
				>
					<!-- Header with copy -->
					<div
						class="flex items-center justify-between border-b border-border/60 bg-muted/30 px-6 py-3"
					>
						<div class="flex items-center gap-2">
							<FileText class="h-4 w-4 text-muted-foreground" />
							<span class="text-sm font-medium text-foreground">MIT License</span>
						</div>
						<button
							onclick={copyProjectLicense}
							class="inline-flex items-center gap-2 rounded-md border border-border bg-background/80 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all duration-150 hover:bg-muted/30 hover:text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
							aria-live="polite"
						>
							{#if projectLicenseCopied}
								<Check class="h-3 w-3 text-emerald-500" />
								<span>Copied</span>
							{:else}
								<Copy class="h-3 w-3" />
								<span>Copy license</span>
							{/if}
						</button>
					</div>
					<div class="w-full space-y-4 p-6">
						{#each licenseParagraphs as paragraph}
							<p class="w-full text-sm leading-relaxed text-muted-foreground">{paragraph}</p>
						{/each}
					</div>
				</div>
			</section>

			<!-- Dependencies -->
			<section>
				<h2 class="mb-4 text-2xl font-[var(--font-space-grotesk)] font-semibold md:text-3xl">
					Project Attribution (Dependencies)
				</h2>
				<p class="mb-6 text-muted-foreground">
					This list is sourced from the CopyTree repository's develop branch and includes both
					production and development dependencies.
				</p>

				<!-- Optional search -->
				{#if showSearch}
					<div class="mb-8">
						<label for="license-search" class="sr-only">Search dependencies</label>
						<div class="relative max-w-md">
							<input
								id="license-search"
								type="text"
								placeholder="Search by name, license, or version…"
								bind:value={query}
								class="w-full rounded-lg border border-border bg-background/80 px-4 py-3 text-sm text-foreground shadow-sm backdrop-blur-sm transition-all duration-200 ease-out placeholder:text-muted-foreground/80 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none"
								aria-label="Search dependencies"
							/>
							<div
								class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent"
								aria-hidden="true"
							></div>
						</div>
						<p class="mt-3 text-sm text-muted-foreground">
							{filtered.length}
							{filtered.length === 1 ? 'dependency' : 'dependencies'} shown
						</p>
					</div>
				{/if}

				<div class="not-prose">
					{#if filtered.length}
						<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
							{#each filtered as dep, i (dep.name + '-' + i)}
								<div
									class="group overflow-hidden rounded-lg border border-border bg-background/50 shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
								>
									<div class="p-4">
										<!-- Header -->
										<div class="mb-3">
											<h3 class="truncate font-medium text-foreground" title={dep.name}>
												{dep.name}
											</h3>
											<div class="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
												<span class="font-mono">v{dep.version}</span>
												<span class="h-1 w-1 rounded-full bg-muted-foreground/50"></span>
												<span
													class="inline-flex items-center gap-1 rounded-md bg-muted/60 px-2 py-0.5"
												>
													<FileText class="h-3 w-3" />
													{dep.license}
												</span>
											</div>
										</div>

										<!-- URL -->
										<div class="mb-3">
											<a
												class="block truncate text-sm text-primary transition-colors hover:text-primary/80"
												href={dep.url}
												target="_blank"
												rel="noopener noreferrer"
												title={dep.url}
											>
												{dep.url.replace(/^https?:\/\//, '')}
											</a>
										</div>

										<!-- Actions -->
										<div class="flex items-center justify-between">
											<button
												onclick={() => toggle(dep, i)}
												class="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
												aria-expanded={isOpen(dep, i)}
												aria-controls={'accordion-content-' + keyFor(dep, i)}
												id={'accordion-button-' + keyFor(dep, i)}
											>
												<span>{isOpen(dep, i) ? 'Hide' : 'Show'} details</span>
												<div
													class="transition-transform duration-200 {isOpen(dep, i)
														? 'rotate-180'
														: 'rotate-0'}"
												>
													<svg
														class="h-3 w-3"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
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

											<button
												onclick={() => copyDepInfo(dep)}
												class="inline-flex items-center gap-1 rounded-md border border-border bg-background/70 px-2 py-1 text-xs font-medium text-muted-foreground transition-all duration-150 hover:bg-muted/30 hover:text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
												aria-live="polite"
											>
												{#if copiedMap[dep.name]}
													<Check class="h-3 w-3 text-emerald-500" />
													<span>Copied</span>
												{:else}
													<Copy class="h-3 w-3" />
													<span>Copy</span>
												{/if}
											</button>
										</div>

										<!-- Expandable content -->
										{#if isOpen(dep, i)}
											<div
												id={'accordion-content-' + keyFor(dep, i)}
												class="mt-3 border-t border-border/50 pt-3"
												role="region"
												aria-labelledby={'accordion-button-' + keyFor(dep, i)}
											>
												<div class="space-y-1 text-xs text-muted-foreground">
													<p><span class="font-medium">Package:</span> {dep.name}</p>
													<p><span class="font-medium">Version:</span> {dep.version}</p>
													<p><span class="font-medium">License:</span> {dep.license}</p>
													<p>
														<span class="font-medium">URL:</span>
														<a
															href={dep.url}
															target="_blank"
															rel="noopener noreferrer"
															class="break-all text-primary hover:underline">{dep.url}</a
														>
													</p>
												</div>
											</div>
										{/if}
									</div>
								</div>
							{/each}
						</div>
					{:else}
						<div class="py-12 text-center">
							<FileText class="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
							<p class="text-sm text-muted-foreground">No matching dependencies.</p>
						</div>
					{/if}
				</div>
			</section>
		</div>
	</div>
</main>
