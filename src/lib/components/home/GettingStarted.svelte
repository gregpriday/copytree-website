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
	role="region"
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
							class="absolute top-16 bottom-0 left-8 w-0.5 bg-gradient-to-b from-primary to-transparent"
						></div>
					{/if}

					<div class="flex gap-6">
						<!-- Step number -->
						<div class="relative z-10 flex-shrink-0">
							<div
								class="box-border flex h-16 w-16 items-center justify-center rounded-xl border-2 border-border bg-background shadow-sm transition-all duration-300 group-hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
							>
								{#if step.isProTip}
									<div class="h-10 w-10">
										<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
											<!-- GitHub Octocat icon -->
											<g fill="currentColor">
												<path
													d="M16 2C8.268 2 2 8.268 2 16c0 6.112 3.96 11.294 9.45 13.125.691.126.943-.3.943-.667 0-.329-.012-1.415-.018-2.566-3.844.835-4.656-1.63-4.656-1.63-.628-1.596-1.534-2.021-1.534-2.021-1.254-.857.095-.839.095-.839 1.387.097 2.116 1.424 2.116 1.424 1.233 2.114 3.236 1.503 4.025 1.149.125-.893.482-1.502.877-1.847-3.072-.35-6.303-1.536-6.303-6.835 0-1.509.539-2.744 1.424-3.711-.143-.35-.618-1.761.135-3.671 0 0 1.16-.373 3.801 1.421 1.102-.307 2.285-.46 3.461-.465 1.176.005 2.359.158 3.462.465 2.64-1.794 3.799-1.421 3.799-1.421.754 1.91.279 3.321.136 3.671.886.967 1.423 2.202 1.423 3.711 0 5.314-3.236 6.481-6.318 6.826.497.428.939 1.272.939 2.564 0 1.852-.017 3.344-.017 3.799 0 .371.25.799.949.664C26.042 27.288 30 22.11 30 16c0-7.732-6.268-14-14-14z"
													fill="url(#githubGradient)"
												/>
												<!-- Add some highlight -->
												<path
													d="M6.5 23.5c.3.6 1.2 1.2 2.5 1.5"
													stroke="url(#githubGradient)"
													stroke-width="1"
													stroke-linecap="round"
													opacity="0.3"
												/>
											</g>
											<defs>
												<linearGradient
													id="githubGradient"
													x1="16"
													y1="2"
													x2="16"
													y2="30"
													gradientUnits="userSpaceOnUse"
												>
													<stop stop-color="#22C55E" />
													<stop offset="1" stop-color="#059669" />
												</linearGradient>
											</defs>
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
										animate={true}
										animationSpeed={25}
										animationDelay={index * 100}
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
