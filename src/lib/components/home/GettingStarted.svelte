<script>
	import { CodeBlock } from '$lib/components/shared';

	// Add a type for the step object for better type safety
	/** @type {{ number: string, title: string, description: string, code: string, language: string, isProTip?: boolean }} */
	let Step;

	/** @type {Step[]} */
	const steps = [
		{
			number: '01',
			title: 'Install CopyTree',
			description: 'Get started with a simple npm install command',
			code: 'npm install -g copytree',
			language: 'bash'
		},
		{
			number: '02',
			title: 'Copy Your Codebase',
			description: 'Run copytree in your project directory to copy it to your clipboard',
			code: 'copytree',
			language: 'bash'
		},
		{
			number: '03',
			title: 'Paste & Plan',
			description:
				'Your codebase is now copied to clipboard in AI-ready format. Simply paste it into Claude, ChatGPT, Grok, or any AI assistant to start building.',
			code: '',
			language: ''
		},
		{
			number: 'PRO',
			title: 'Works with GitHub Repos',
			description:
				'CopyTree works great with GitHub repos and integrates into workflows like pasting into AI for planning (as I do in my video):',
			code: 'copytree https://github.com/gregpriday/copytree',
			language: 'bash',
			isProTip: true
		}
	];
</script>

<section
	id="getting-started"
	aria-label="Getting started"
	class="overflow-visible bg-background px-4 py-24 sm:px-6 md:py-32 lg:px-8"
>
	<div class="mx-auto max-w-5xl overflow-visible">
		<div class="mb-12 text-center md:mb-16">
			<h2 class="mb-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
				Install in three simple steps
			</h2>
			<p class="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
				From installation to AI-ready code in minutes
			</p>
		</div>

		<div class="space-y-10">
			{#each steps as step, index}
				<div class="group relative">
					<!-- Connection line -->
					{#if index < steps.length - 1}
						<div
							class="absolute top-16 bottom-0 left-[34px] w-0.5 bg-gradient-to-b from-primary to-transparent"
						></div>
					{/if}

					<div class="flex gap-6">
						<!-- Step number -->
						<div class="relative z-10 flex-shrink-0">
							<div
								class="box-border flex h-16 w-16 items-center justify-center rounded-xl border-2 border-border bg-background shadow-sm transition-all duration-300 group-hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
							>
							{#if step.isProTip}
								<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-muted/40 text-muted-foreground">
									<svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
										<path
											fill-rule="evenodd"
											d="M12 .5C5.73.5.98 5.24.98 11.52c0 4.86 3.15 8.98 7.52 10.44.55.1.75-.24.75-.54 0-.27-.01-1.16-.02-2.1-3.06.66-3.71-1.31-3.71-1.31-.5-1.26-1.22-1.6-1.22-1.6-.99-.67.07-.66.07-.66 1.1.08 1.68 1.12 1.68 1.12.98 1.67 2.57 1.19 3.2.91.1-.71.38-1.19.69-1.47-2.44-.28-5.01-1.22-5.01-5.42 0-1.2.43-2.17 1.12-2.94-.11-.28-.49-1.43.11-2.98 0 0 .92-.3 3.02 1.13a10.5 10.5 0 0 1 5.5 0c2.1-1.43 3.02-1.13 3.02-1.13.6 1.55.22 2.7.11 2.98.7.77 1.12 1.74 1.12 2.94 0 4.21-2.57 5.13-5.01 5.41.39.34.73 1 .73 2.02 0 1.46-.01 2.64-.01 3 0 .3.2.65.76.54 4.36-1.46 7.5-5.58 7.5-10.44C23.02 5.24 18.27.5 12 .5Z"
											clip-rule="evenodd"
										/>
									</svg>
								</div>
								{:else}
									<span
										class="bg-gradient-to-br from-primary to-primary/80 bg-clip-text text-2xl font-bold text-transparent"
									>
										{step.number}
									</span>
								{/if}
							</div>
						</div>

						<!-- Step content -->
						<div class="flex-1 overflow-visible">
							<h3 class="mb-2 text-xl font-medium text-foreground">{step.title}</h3>
							<p class="mb-4 text-muted-foreground">{step.description}</p>

							<!-- Terminal block - with padding for glow -->
							{#if step.code}
								<div
									class="relative -mx-8 px-8 opacity-90 transition-opacity duration-500 hover:opacity-100"
								>
									<CodeBlock
										code={step.code}
										language={step.language}
										glow={true}
										animate={false}
									/>
								</div>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
