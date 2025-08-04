<script>
	export let data;

	const projectLicense = `MIT License

Copyright (c) 2025 Greg Priday

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;
</script>

<svelte:head>
	<title>License and Attribution - CopyTree</title>
	<meta
		name="description"
		content="CopyTree is open-source software. Here are the licenses for our project and its dependencies."
	/>
</svelte:head>

<main class="min-h-screen bg-background text-foreground pt-8 md:pt-12">
	<div class="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
		<h1 class="text-4xl md:text-5xl font-bold text-foreground mb-4 font-[var(--font-space-grotesk)]">
			License & Attribution
		</h1>
		<p class="text-muted-foreground mb-12 text-lg">
			CopyTree is proudly built on open-source software. We are grateful to the community for their contributions.
		</p>

		<div class="prose prose-zinc dark:prose-invert max-w-none space-y-12">
			<section>
				<h2 class="text-2xl md:text-3xl font-semibold text-foreground mb-6 font-[var(--font-space-grotesk)]">
					Project License
				</h2>
				<p class="text-muted-foreground">
					The CopyTree project is licensed under the MIT License.
				</p>
				<pre class="border border-border rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground">{projectLicense}</pre>
			</section>

			<section>
				<h2 class="text-2xl md:text-3xl font-semibold text-foreground mb-6 font-[var(--font-space-grotesk)]">
					Project Attribution (Dependencies)
				</h2>
				<p class="text-muted-foreground">
					This list is sourced from the CopyTree repository’s develop branch and includes both production and development dependencies.
				</p>

				{#if data?.attributions?.length}
					<div class="not-prose space-y-4">
						{#each data.attributions as dep}
							<div class="p-4 border border-border rounded-lg bg-background/50">
								<div class="flex justify-between items-center gap-4">
									<a href={dep.url} target="_blank" rel="noopener noreferrer" class="font-semibold text-primary hover:underline">{dep.name}</a>
									<span class="text-xs px-2 py-1 bg-muted rounded-full border border-border">{dep.license}</span>
								</div>
								<p class="text-sm text-muted-foreground mt-1">Version: {dep.version}</p>
							</div>
						{/each}
					</div>
				{:else}
					<p class="text-sm text-muted-foreground">No dependencies detected for the CopyTree project.</p>
				{/if}
			</section>
		</div>
	</div>
</main>