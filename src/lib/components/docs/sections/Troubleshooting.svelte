<script>
	import CodeBlock from '../shared/CodeBlock.svelte';
</script>

<div class="prose max-w-none prose-neutral dark:prose-invert">
	<h2 class="mb-4 text-3xl font-bold text-foreground">Troubleshooting</h2>

	<p class="mb-8 text-lg leading-relaxed text-muted-foreground">
		Solutions to common issues and error messages you might encounter while using CopyTree.
	</p>

	<!-- Common Issues -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Common Issues</h3>

		<div class="space-y-6">
			<!-- Issue 1 -->
			<div class="overflow-hidden rounded-xl border border-border">
				<div
					class="border-b border-red-200 bg-red-50 px-6 py-4 dark:border-red-800 dark:bg-red-950/20"
				>
					<h4 class="flex items-center gap-2 font-semibold text-red-900 dark:text-red-100">
						<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						Error: GEMINI_API_KEY not found
					</h4>
				</div>
				<div class="p-6">
					<p class="mb-4 text-muted-foreground">
						We've got you—here's how to resolve 'GEMINI_API_KEY not found' quickly.
					</p>
					<h5 class="mb-2 font-medium text-foreground">Solution:</h5>
					<CodeBlock
						code={`# Option 1: Set in .env file
echo "GEMINI_API_KEY=your-api-key-here" >> ~/.env

# Option 2: Export in shell
export GEMINI_API_KEY="your-api-key-here"

# Option 3: Pass inline
GEMINI_API_KEY="your-api-key-here" copytree

# Option 4: Use simpler output format
copytree --format json`}
						language="bash"
					/>
				</div>
			</div>

			<!-- Issue 2 -->
			<div class="overflow-hidden rounded-xl border border-border">
				<div
					class="border-b border-red-200 bg-red-50 px-6 py-4 dark:border-red-800 dark:bg-red-950/20"
				>
					<h4 class="flex items-center gap-2 font-semibold text-red-900 dark:text-red-100">
						<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						Error: Output exceeds clipboard limit
					</h4>
				</div>
				<div class="p-6">
					<p class="mb-4 text-muted-foreground">
						Some systems have clipboard size limitations that prevent copying large outputs.
					</p>
					<h5 class="mb-2 font-medium text-foreground">Solution:</h5>
					<CodeBlock
						code={`# Save to file instead
copytree --output context.xml

# Limit output size
copytree --char-limit 50000

# Use head to limit files
copytree --head 100

# Disable clipboard and use stdout
copytree --no-clipboard > output.xml`}
						language="bash"
					/>
				</div>
			</div>

			<!-- Issue 3 -->
			<div class="overflow-hidden rounded-xl border border-border">
				<div
					class="border-b border-red-200 bg-red-50 px-6 py-4 dark:border-red-800 dark:bg-red-950/20"
				>
					<h4 class="flex items-center gap-2 font-semibold text-red-900 dark:text-red-100">
						<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						Error: Permission denied
					</h4>
				</div>
				<div class="p-6">
					<p class="mb-4 text-muted-foreground">
						File permission issues when trying to read protected files or directories.
					</p>
					<h5 class="mb-2 font-medium text-foreground">Solution:</h5>
					<CodeBlock
						code={`# Check file permissions
ls -la problem-directory/

# Run with appropriate user
sudo copytree  # Not recommended

# Exclude problematic directories
copytree --filter "!**/protected-dir/**"

# Change permissions if you own the files
chmod -R 644 project-directory/`}
						language="bash"
					/>
				</div>
			</div>

			<!-- Issue 4 -->
			<div class="overflow-hidden rounded-xl border border-border">
				<div
					class="border-b border-yellow-200 bg-yellow-50 px-6 py-4 dark:border-yellow-800 dark:bg-yellow-950/20"
				>
					<h4 class="flex items-center gap-2 font-semibold text-yellow-900 dark:text-yellow-100">
						<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						Warning: Skipping large file
					</h4>
				</div>
				<div class="p-6">
					<p class="mb-4 text-muted-foreground">
						Files exceeding the size limit are automatically skipped to prevent memory issues.
					</p>
					<h5 class="mb-2 font-medium text-foreground">Solution:</h5>
					<CodeBlock
						code={`# Increase file size limit
export COPYTREE_MAX_FILE_SIZE=configurable_size
copytree

# Use first-lines transformer for large files
copytree --transformers "first-lines" --transformer-options '{"lineCount": 100}'

# Force include specific large files
copytree --always "large-important-file.sql"`}
						language="bash"
					/>
				</div>
			</div>
		</div>
	</div>

	<!-- Performance Issues -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Performance Issues</h3>

		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<div
				class="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/20"
			>
				<h4 class="mb-2 font-medium text-foreground">Slow processing</h4>
				<div class="space-y-2 text-sm text-muted-foreground">
					<p>Try these optimizations:</p>
					<ul class="list-inside list-disc space-y-1">
						<li>Use specific filters to reduce file count</li>
						<li>Use JSON format for machine processing</li>
						<li>Increase concurrency: COPYTREE_MAX_CONCURRENCY=10</li>
						<li>Use cache for repeated runs</li>
					</ul>
				</div>
			</div>

			<div
				class="rounded-lg border border-purple-200 bg-purple-50 p-4 dark:border-purple-800 dark:bg-purple-950/20"
			>
				<h4 class="mb-2 font-medium text-foreground">High memory usage</h4>
				<div class="space-y-2 text-sm text-muted-foreground">
					<p>Reduce memory consumption:</p>
					<ul class="list-inside list-disc space-y-1">
						<li>Lower concurrency settings</li>
						<li>Use --head to limit files</li>
						<li>Enable streaming for large files</li>
						<li>Set memory limit: COPYTREE_MEMORY_LIMIT=1024</li>
					</ul>
				</div>
			</div>
		</div>
	</div>

	<!-- Git-Related Issues -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Git-Related Issues</h3>

		<div class="rounded-xl bg-muted p-6">
			<div class="space-y-4">
				<div>
					<h4 class="mb-2 font-medium text-foreground">Not a git repository error</h4>
					<p class="mb-2 text-sm text-muted-foreground">
						This occurs when using git-related options in a non-git directory.
					</p>
					<CodeBlock
						code={`# Initialize git repository
git init

# Or use without git features
copytree --no-git`}
						language="bash"
					/>
				</div>

				<div>
					<h4 class="mb-2 font-medium text-foreground">Invalid git reference</h4>
					<p class="mb-2 text-sm text-muted-foreground">
						When using --changed with a non-existent branch or commit.
					</p>
					<CodeBlock
						code={`# List available branches
git branch -a

# Use valid reference
copytree --changed origin/main`}
						language="bash"
					/>
				</div>
			</div>
		</div>
	</div>

	<!-- Debugging Tools -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Debugging Tools</h3>

		<div class="rounded-xl bg-gray-900 p-6 text-white">
			<h4 class="text-primary-400 mb-4 font-semibold">Built-in Debugging Options</h4>

			<div class="space-y-4">
				<div>
					<h5 class="mb-1 font-mono text-sm">copytree --verbose</h5>
					<p class="text-xs text-gray-400">Show detailed progress and operations</p>
				</div>

				<div>
					<h5 class="mb-1 font-mono text-sm">copytree --dry-run</h5>
					<p class="text-xs text-gray-400">Preview what will be processed without executing</p>
				</div>

				<div>
					<h5 class="mb-1 font-mono text-sm">COPYTREE_DEBUG=true copytree</h5>
					<p class="text-xs text-gray-400">Enable debug logging with stack traces</p>
				</div>

				<div>
					<h5 class="mb-1 font-mono text-sm">copytree config:validate</h5>
					<p class="text-xs text-gray-400">Check configuration for errors</p>
				</div>

				<div>
					<h5 class="mb-1 font-mono text-sm">copytree --stats</h5>
					<p class="text-xs text-gray-400">Show processing statistics after completion</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Error Messages Reference -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Error Messages Reference</h3>

		<div class="space-y-3">
			<div class="flex items-start gap-3">
				<code
					class="rounded bg-red-100 px-2 py-1 text-xs text-red-700 dark:bg-red-900/30 dark:text-red-300"
				>
					ENOENT
				</code>
				<div>
					<p class="text-sm font-medium text-foreground">File or directory not found</p>
					<p class="text-xs text-muted-foreground">Check path spelling and permissions</p>
				</div>
			</div>

			<div class="flex items-start gap-3">
				<code
					class="rounded bg-red-100 px-2 py-1 text-xs text-red-700 dark:bg-red-900/30 dark:text-red-300"
				>
					EACCES
				</code>
				<div>
					<p class="text-sm font-medium text-foreground">Permission denied</p>
					<p class="text-xs text-muted-foreground">Insufficient permissions to read file</p>
				</div>
			</div>

			<div class="flex items-start gap-3">
				<code
					class="rounded bg-red-100 px-2 py-1 text-xs text-red-700 dark:bg-red-900/30 dark:text-red-300"
				>
					ENOMEM
				</code>
				<div>
					<p class="text-sm font-medium text-foreground">Out of memory</p>
					<p class="text-xs text-muted-foreground">Reduce file count or increase system memory</p>
				</div>
			</div>

			<div class="flex items-start gap-3">
				<code
					class="rounded bg-red-100 px-2 py-1 text-xs text-red-700 dark:bg-red-900/30 dark:text-red-300"
				>
					ETIMEDOUT
				</code>
				<div>
					<p class="text-sm font-medium text-foreground">Operation timed out</p>
					<p class="text-xs text-muted-foreground">Increase timeout or check network connection</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Getting Help -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Getting Help</h3>

		<div
			class="from-primary-50 dark:from-primary-950/20 dark:border-primary-800/50 rounded-xl border border-border bg-gradient-to-br to-blue-50 p-6 dark:to-blue-950/20"
		>
			<h4 class="mb-4 font-semibold text-foreground">Support Resources</h4>

			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<a
					href="https://github.com/gregpriday/copytree/issues"
					target="_blank"
					rel="noopener noreferrer"
					class="hover:border-primary-300 dark:hover:border-primary-700/70 flex items-center gap-3 rounded-lg border border-border bg-white p-3 transition-colors dark:bg-zinc-900"
				>
					<svg class="h-6 w-6 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
						<path
							fill-rule="evenodd"
							d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
							clip-rule="evenodd"
						/>
					</svg>
					<div>
						<p class="font-medium text-foreground">GitHub Issues</p>
						<p class="text-xs text-muted-foreground">Report bugs and request features</p>
					</div>
				</a>

				<a
					href="https://github.com/gregpriday/copytree/discussions"
					target="_blank"
					rel="noopener noreferrer"
					class="hover:border-primary-300 dark:hover:border-primary-700/70 flex items-center gap-3 rounded-lg border border-border bg-white p-3 transition-colors dark:bg-zinc-900"
				>
					<svg
						class="h-6 w-6 text-muted-foreground"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z"
						/>
					</svg>
					<div>
						<p class="font-medium text-foreground">Discussions</p>
						<p class="text-xs text-muted-foreground">Ask questions and share tips</p>
					</div>
				</a>

				<div
					class="flex items-center gap-3 rounded-lg border border-border bg-white p-3 dark:bg-zinc-900"
				>
					<svg
						class="h-6 w-6 text-muted-foreground"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
						/>
					</svg>
					<div>
						<p class="font-medium text-foreground">Documentation</p>
						<p class="text-xs text-muted-foreground">You're already here!</p>
					</div>
				</div>

				<div
					class="flex items-center gap-3 rounded-lg border border-border bg-white p-3 dark:bg-zinc-900"
				>
					<svg
						class="h-6 w-6 text-muted-foreground"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<div>
						<p class="font-medium text-foreground">FAQ</p>
						<p class="text-xs text-muted-foreground">Check common questions first</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
