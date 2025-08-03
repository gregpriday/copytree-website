<script>
	import CodeBlock from '../shared/CodeBlock.svelte';
</script>

<div class="prose max-w-none prose-neutral dark:prose-invert">
	<h2 class="mb-4 text-3xl font-bold text-foreground">Quick Start</h2>

	<p class="mb-8 text-lg leading-relaxed text-muted-foreground">
		Get up and running with CopyTree. These examples show the most common use cases.
	</p>

	<!-- Getting Started Steps -->
	<div class="not-prose my-8">
		<h3 class="mb-8 text-xl font-semibold text-foreground">Getting Started</h3>
		<div class="space-y-10">
			<!-- Step 1: Install -->
			<div class="group relative">
				<div
					class="absolute top-20 bottom-0 left-10 w-0.5 bg-gradient-to-b from-primary to-transparent"
				></div>
				<div class="flex gap-6">
					<div class="relative z-10 flex-shrink-0">
						<div
							class="box-border flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-zinc-200 bg-white shadow-sm transition-all duration-300 group-hover:border-primary/50 dark:border-border dark:bg-muted"
						>
							<span
								class="bg-gradient-to-br from-primary to-primary/80 bg-clip-text text-2xl font-bold text-transparent"
							>
								01
							</span>
						</div>
					</div>
					<div class="flex-1 overflow-visible">
						<h4 class="mb-2 text-xl font-medium text-foreground">Install CopyTree</h4>
						<p class="mb-4 text-muted-foreground">Get started with a simple npm install command</p>
						<div class="relative -mx-8 px-8">
							<CodeBlock
								code="npm install -g copytree"
								language="bash"
								glow={true}
								animate={true}
								animationSpeed={25}
								animationDelay={0}
							/>
						</div>
					</div>
				</div>
			</div>

			<!-- Step 2: Copy -->
			<div class="group relative">
				<div
					class="absolute top-20 bottom-0 left-10 w-0.5 bg-gradient-to-b from-primary to-transparent"
				></div>
				<div class="flex gap-6">
					<div class="relative z-10 flex-shrink-0">
						<div
							class="box-border flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-zinc-200 bg-white shadow-sm transition-all duration-300 group-hover:border-primary/50 dark:border-border dark:bg-muted"
						>
							<span
								class="bg-gradient-to-br from-primary to-primary/80 bg-clip-text text-2xl font-bold text-transparent"
							>
								02
							</span>
						</div>
					</div>
					<div class="flex-1 overflow-visible">
						<h4 class="mb-2 text-xl font-medium text-foreground">Copy Your Codebase</h4>
						<p class="mb-4 text-muted-foreground">
							Run copytree in your project directory to copy it to your clipboard
						</p>
						<div class="relative -mx-8 px-8">
							<CodeBlock
								code="copytree"
								language="bash"
								glow={true}
								animate={true}
								animationSpeed={25}
								animationDelay={100}
							/>
						</div>
					</div>
				</div>
			</div>

			<!-- Step 3: Paste & Plan -->
			<div class="group relative">
				<div
					class="absolute top-20 bottom-0 left-10 w-0.5 bg-gradient-to-b from-primary to-transparent"
				></div>
				<div class="flex gap-6">
					<div class="relative z-10 flex-shrink-0">
						<div
							class="box-border flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-zinc-200 bg-white shadow-sm transition-all duration-300 group-hover:border-primary/50 dark:border-border dark:bg-muted"
						>
							<span
								class="bg-gradient-to-br from-primary to-primary/80 bg-clip-text text-2xl font-bold text-transparent"
							>
								03
							</span>
						</div>
					</div>
					<div class="flex-1 overflow-visible">
						<h4 class="mb-2 text-xl font-medium text-foreground">Paste & Plan</h4>
						<p class="mb-4 text-muted-foreground">
							Your codebase is now copied to clipboard in AI-ready format. Simply paste it into
							Claude, ChatGPT, Grok, or any AI assistant to start building amazing things.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Additional Examples -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">More Examples</h3>
		<div class="space-y-6">
			<!-- Example 1 -->
			<div class="rounded-xl bg-muted p-6">
				<h4 class="mb-2 font-semibold text-foreground">Copy specific directory</h4>
				<p class="mb-3 text-sm text-muted-foreground">
					Point CopyTree to any directory on your system.
				</p>
				<CodeBlock code="copytree /path/to/my-project" language="bash" />
			</div>

			<!-- Example 2 -->
			<div class="rounded-xl bg-muted p-6">
				<h4 class="mb-2 font-semibold text-foreground">Copy GitHub repository</h4>
				<p class="mb-3 text-sm text-muted-foreground">
					Directly copy any public GitHub repository without cloning it first.
				</p>
				<CodeBlock code="copytree https://github.com/facebook/react" language="bash" />
			</div>

			<!-- Example 3 -->
			<div class="rounded-xl bg-muted p-6">
				<h4 class="mb-2 font-semibold text-foreground">Use custom profile</h4>
				<p class="mb-3 text-sm text-muted-foreground">
					Apply a custom profile tailored to your project.
				</p>
				<CodeBlock code="copytree --profile mycustom" language="bash" />
			</div>

			<!-- Example 4 -->
			<div class="rounded-xl bg-muted p-6">
				<h4 class="mb-2 font-semibold text-foreground">Focus on modified files</h4>
				<p class="mb-3 text-sm text-muted-foreground">
					Only copy files with uncommitted changes - perfect for debugging recent issues.
				</p>
				<CodeBlock code="copytree --modified" language="bash" />
			</div>
		</div>
	</div>

	<!-- Common Workflows -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Common Workflows</h3>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
			<!-- Debugging Recent Changes -->
			<div
				class="rounded-xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-6 dark:border-green-800 dark:from-green-950/20 dark:to-emerald-950/20"
			>
				<div class="mb-3 flex items-center gap-3">
					<div class="rounded-lg bg-green-100 p-2 dark:bg-green-900/30">
						<svg
							class="h-5 w-5 text-green-600 dark:text-green-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width={2}
								d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
					<h4 class="font-semibold text-foreground">Debugging recent changes</h4>
				</div>
				<p class="mb-3 text-sm text-muted-foreground">
					Focus on modified files to identify issues.
				</p>
				<CodeBlock code="copytree --modified" language="bash" />
			</div>

			<!-- Code Review Preparation -->
			<div
				class="rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 dark:border-blue-800 dark:from-blue-950/20 dark:to-indigo-950/20"
			>
				<div class="mb-3 flex items-center gap-3">
					<div class="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
						<svg
							class="h-5 w-5 text-blue-600 dark:text-blue-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width={2}
								d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
							/>
						</svg>
					</div>
					<h4 class="font-semibold text-foreground">Code review preparation</h4>
				</div>
				<p class="mb-3 text-sm text-muted-foreground">
					Compare changes between branches for thorough reviews.
				</p>
				<CodeBlock code="copytree --changed main --output review.xml" language="bash" />
			</div>

			<!-- Documentation Generation -->
			<div
				class="rounded-xl border border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 p-6 dark:border-purple-800 dark:from-purple-950/20 dark:to-pink-950/20"
			>
				<div class="mb-3 flex items-center gap-3">
					<div class="rounded-lg bg-purple-100 p-2 dark:bg-purple-900/30">
						<svg
							class="h-5 w-5 text-purple-600 dark:text-purple-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width={2}
								d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
							/>
						</svg>
					</div>
					<h4 class="font-semibold text-foreground">Documentation generation</h4>
				</div>
				<p class="mb-3 text-sm text-muted-foreground">
					Create reference documentation from your codebase.
				</p>
				<CodeBlock code="copytree --profile docs-custom --as-reference" language="bash" />
			</div>

			<!-- Project Overview -->
			<div
				class="rounded-xl border border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 p-6 dark:border-orange-800 dark:from-orange-950/20 dark:to-amber-950/20"
			>
				<div class="mb-3 flex items-center gap-3">
					<div class="rounded-lg bg-orange-100 p-2 dark:bg-orange-900/30">
						<svg
							class="h-5 w-5 text-orange-600 dark:text-orange-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width={2}
								d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
							/>
						</svg>
					</div>
					<h4 class="font-semibold text-foreground">Project overview</h4>
				</div>
				<p class="mb-3 text-sm text-muted-foreground">
					Get a visual directory structure with git status.
				</p>
				<CodeBlock code="copytree --only-tree --with-git-status" language="bash" />
			</div>
		</div>
	</div>

	<!-- What Happens Next -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">What Happens Next?</h3>
		<div class="rounded-xl bg-gray-900 p-6 text-white">
			<div class="space-y-4">
				<div class="flex gap-4">
					<div
						class="bg-primary-500 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold"
					>
						1
					</div>
					<div>
						<h4 class="mb-1 font-semibold">CopyTree analyzes your project</h4>
						<p class="text-sm text-gray-300">
							Detects framework, identifies relevant files, respects .gitignore
						</p>
					</div>
				</div>
				<div class="flex gap-4">
					<div
						class="bg-primary-500 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold"
					>
						2
					</div>
					<div>
						<h4 class="mb-1 font-semibold">Files are processed and transformed</h4>
						<p class="text-sm text-gray-300">
							Applies appropriate transformers for PDFs, images, and code files
						</p>
					</div>
				</div>
				<div class="flex gap-4">
					<div
						class="bg-primary-500 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold"
					>
						3
					</div>
					<div>
						<h4 class="mb-1 font-semibold">Output is formatted and copied</h4>
						<p class="text-sm text-gray-300">
							XML/JSON output is automatically copied to your clipboard
						</p>
					</div>
				</div>
				<div class="flex gap-4">
					<div
						class="bg-primary-500 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold"
					>
						4
					</div>
					<div>
						<h4 class="mb-1 font-semibold">Paste into your AI assistant</h4>
						<p class="text-sm text-gray-300">
							Share with Claude, ChatGPT, or any LLM for instant context
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Pro Tips -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Pro Tips</h3>
		<div
			class="rounded-xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-950/20"
		>
			<ul class="space-y-3 text-sm text-gray-700 dark:text-gray-300">
				<li class="flex gap-2">
					<span class="text-blue-600">💡</span>
					<span
						>Use <code
							class="rounded bg-blue-100 px-1 text-blue-900 dark:bg-blue-900/30 dark:text-blue-100"
							>--dry-run</code
						> to preview what will be copied before execution</span
					>
				</li>
				<li class="flex gap-2">
					<span class="text-blue-600">💡</span>
					<span
						>Combine filters for precise control: <code
							class="rounded bg-blue-100 px-1 text-blue-900 dark:bg-blue-900/30 dark:text-blue-100"
							>--filter "src/**" "!**/*.test.js"</code
						></span
					>
				</li>
				<li class="flex gap-2">
					<span class="text-blue-600">💡</span>
					<span>Save frequently used commands as shell aliases for easy access</span>
				</li>
				<li class="flex gap-2">
					<span class="text-blue-600">💡</span>
					<span
						>Use <code
							class="rounded bg-blue-100 px-1 text-blue-900 dark:bg-blue-900/30 dark:text-blue-100"
							>--output</code
						> to save results for team sharing or documentation</span
					>
				</li>
			</ul>
		</div>
	</div>
</div>
