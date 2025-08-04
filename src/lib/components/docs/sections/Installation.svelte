<script>
	import CodeBlock from '../shared/CodeBlock.svelte';
	import TabGroup from '../shared/TabGroup.svelte';
</script>

<div class="prose max-w-none prose-neutral dark:prose-invert">
	<h2 class="mb-4 text-3xl font-bold text-foreground">Installation</h2>

	<!-- Prerequisites -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Prerequisites</h3>
		<div
			class="mb-6 rounded-xl border border-yellow-200 bg-yellow-50 p-6 dark:border-yellow-800 dark:bg-yellow-950/20"
		>
			<div class="flex gap-3">
				<svg
					class="mt-0.5 h-6 w-6 flex-shrink-0 text-yellow-600 dark:text-yellow-400"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width={2}
						d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
					/>
				</svg>
				<div>
					<p class="mb-2 font-semibold text-yellow-800 dark:text-yellow-200">System Requirements</p>
					<p class="text-sm text-yellow-700 dark:text-yellow-300">
						Don't worry—CopyTree plays nice with your existing setup.
					</p>
					<ul class="mt-2 space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
						<li>
							• <strong>Node.js</strong>: Version 18.0.0 or higher (check with
							<code class="rounded bg-yellow-100 px-1 dark:bg-yellow-900/30">node --version</code>)
						</li>
						<li>• <strong>npm</strong>: Version 8.0.0 or higher (comes with Node.js)</li>
						<li>• <strong>Git</strong>: For repository operations (optional)</li>
						<li>• <strong>Pandoc</strong>: For advanced document transformers (optional)</li>
					</ul>
				</div>
			</div>
		</div>
	</div>

	<!-- Installation Methods -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Installation Methods</h3>

		<TabGroup
			defaultTab="global"
			tabs={[
				{
					id: 'global',
					label: 'Global Installation',
					content: globalContent
				},
				{
					id: 'local',
					label: 'Local Installation',
					content: localContent
				},
				{
					id: 'yarn',
					label: 'Using Yarn',
					content: yarnContent
				}
			]}
		/>
	</div>

	{#snippet globalContent()}
		<div class="space-y-6">
			<p class="text-muted-foreground">
				Install globally for system-wide access. This is the recommended approach for most users.
			</p>

			<h4 class="text-sm font-semibold uppercase tracking-wide text-foreground/80">Install</h4>
			<CodeBlock code={`npm install -g copytree`} language="bash" />

			<h4 class="text-sm font-semibold uppercase tracking-wide text-foreground/80">Verify</h4>
			<CodeBlock code={`copytree --version`} language="bash" />
		</div>
	{/snippet}

	{#snippet localContent()}
		<div class="space-y-6">
			<p class="text-muted-foreground">
				Install as a project dependency for team consistency.
			</p>

			<h4 class="text-sm font-semibold uppercase tracking-wide text-foreground/80">Install</h4>
			<CodeBlock code={`npm install --save-dev copytree`} language="bash" />

			<h4 class="text-sm font-semibold uppercase tracking-wide text-foreground/80">Run / Verify</h4>
			<CodeBlock code={`npx copytree --version`} language="bash" />
		</div>
	{/snippet}

	{#snippet yarnContent()}
		<div class="space-y-6">
			<p class="text-muted-foreground">If you prefer Yarn as your package manager.</p>

			<h4 class="text-sm font-semibold uppercase tracking-wide text-foreground/80">Global Install</h4>
			<CodeBlock code={`yarn global add copytree`} language="bash" />

			<h4 class="text-sm font-semibold uppercase tracking-wide text-foreground/80">Local Install</h4>
			<CodeBlock code={`yarn add --dev copytree`} language="bash" />

			<h4 class="text-sm font-semibold uppercase tracking-wide text-foreground/80">Run / Verify</h4>
			<CodeBlock code={`yarn copytree --version`} language="bash" />
		</div>
	{/snippet}

	<!-- Environment Setup -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Environment Setup</h3>
		<p class="mb-4 text-muted-foreground">
			Create a <code class="rounded bg-muted px-2 py-1 text-sm">.env</code> file in your home directory
			or project root:
		</p>
		<CodeBlock
			code={`# AI Configuration (required for AI features)
GEMINI_API_KEY=your-api-key-here

# Optional: Performance tuning
COPYTREE_MAX_FILE_SIZE=configurable  # Set size limit
COPYTREE_MAX_TOTAL_SIZE=configurable # Set total limit
COPYTREE_MAX_CONCURRENCY=5

# Optional: Cache settings
CACHE_ENABLED=true
CACHE_FILE_PATH=~/.copytree/cache`}
			language="bash"
			filename=".env"
		/>

		<div
			class="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-950/20"
		>
			<div class="flex gap-3">
				<svg
					class="h-6 w-6 flex-shrink-0 text-blue-600 dark:text-blue-400"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width={2}
						d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<div>
					<p class="mb-2 font-semibold text-blue-800 dark:text-blue-200">
						Getting a Gemini API Key
					</p>
					<ol class="space-y-1 text-sm text-blue-700 dark:text-blue-300">
						<li>
							1. Visit <a
								href="https://makersuite.google.com/app/apikey"
								target="_blank"
								rel="noopener noreferrer"
								class="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 underline"
								>Google AI Studio</a
							>
						</li>
						<li>2. Sign in with your Google account</li>
						<li>3. Click "Create API Key"</li>
						<li>4. Copy the key and add it to your .env file</li>
					</ol>
				</div>
			</div>
		</div>
	</div>

	<!-- Verification -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Verification</h3>
		<p class="mb-4 text-muted-foreground">
			After installation, verify that CopyTree is properly configured:
		</p>
		<CodeBlock
			code={`# Run setup wizard
copytree install:copytree

# Validate configuration
copytree config:validate

# List available profiles
copytree profile:list`}
			language="bash"
		/>

		<div
			class="mt-6 rounded-xl border border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-950/20"
		>
			<div class="flex gap-3">
				<svg
					class="h-6 w-6 flex-shrink-0 text-green-600 dark:text-green-400"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width={2}
						d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<div>
					<p class="mb-2 font-semibold text-green-800 dark:text-green-200">Success!</p>
					<p class="text-sm text-green-700 dark:text-green-300">
						If all commands run without errors, CopyTree is ready to use. You can now start copying
						your codebase!
					</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Troubleshooting Installation -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Common Installation Issues</h3>
		<div class="space-y-4">
			<div class="rounded-lg border border-border p-4">
				<h4 class="mb-2 font-semibold text-foreground">Permission denied error</h4>
				<p class="mb-2 text-sm text-muted-foreground">
					If you encounter permission errors during global installation:
				</p>
				<CodeBlock
					code={`# Option 1: Use npm's global directory
npm config set prefix ~/.npm-global
export PATH=~/.npm-global/bin:$PATH
npm install -g copytree

# Option 2: Use sudo (not recommended)
sudo npm install -g copytree`}
					language="bash"
				/>
			</div>

			<div class="rounded-lg border border-border p-4">
				<h4 class="mb-2 font-semibold text-foreground">Node version too old</h4>
				<p class="mb-2 text-sm text-muted-foreground">
					Update Node.js using nvm (Node Version Manager):
				</p>
				<CodeBlock
					code={`# Install nvm (if not already installed)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install latest Node.js
nvm install node
nvm use node`}
					language="bash"
				/>
			</div>
		</div>
	</div>
</div>
