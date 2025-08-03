<script>
	import CodeBlock from '../shared/CodeBlock.svelte';
</script>

<div class="prose max-w-none prose-neutral dark:prose-invert">
	<h2 class="mb-4 text-3xl font-bold text-foreground">Configuration</h2>

	<p class="mb-8 text-lg leading-relaxed text-muted-foreground">
		CopyTree uses a flexible configuration system that allows you to customize behavior at multiple
		levels.
	</p>

	<!-- Configuration Hierarchy -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Configuration Hierarchy</h3>
		<p class="mb-4 text-muted-foreground">
			CopyTree uses a multi-level configuration system with the following priority (highest to
			lowest):
		</p>

		<div class="rounded-xl bg-gray-900 p-6">
			<div class="space-y-3">
				<div class="flex items-center gap-3">
					<div
						class="bg-primary-500 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white"
					>
						1
					</div>
					<div class="text-white">
						<span class="font-semibold">Command-line arguments</span>
						<span class="ml-2 text-gray-400">Highest priority</span>
					</div>
				</div>
				<div class="flex items-center gap-3">
					<div
						class="bg-primary-500/80 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white"
					>
						2
					</div>
					<div class="text-white">
						<span class="font-semibold">Project .copytreerc file</span>
						<span class="ml-2 text-gray-400">Project-specific settings</span>
					</div>
				</div>
				<div class="flex items-center gap-3">
					<div
						class="bg-primary-500/60 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white"
					>
						3
					</div>
					<div class="text-white">
						<span class="font-semibold">Home directory .copytreerc</span>
						<span class="ml-2 text-gray-400">User defaults</span>
					</div>
				</div>
				<div class="flex items-center gap-3">
					<div
						class="bg-primary-500/40 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white"
					>
						4
					</div>
					<div class="text-white">
						<span class="font-semibold">Environment variables</span>
						<span class="ml-2 text-gray-400">System-wide settings</span>
					</div>
				</div>
				<div class="flex items-center gap-3">
					<div
						class="bg-primary-500/20 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white"
					>
						5
					</div>
					<div class="text-white">
						<span class="font-semibold">Built-in defaults</span>
						<span class="ml-2 text-gray-400">Lowest priority</span>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Configuration File -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Configuration File (.copytreerc)</h3>
		<p class="mb-4 text-muted-foreground">
			Create a <code class="rounded bg-muted px-2 py-1 text-sm">.copytreerc</code> file in your project
			root or home directory. # Customize filters to match your project's 'forest' of files.
		</p>

		<CodeBlock
			code={`{
  "profile": "laravel",
  "format": "xml",
  "transforms": {
    "enabled": true,
    "preferredTransformers": ["ai-summary", "pdf", "image-description"]
  },
  "filters": {
    "include": ["src/**", "app/**"],
    "exclude": ["**/*.test.js", "node_modules/**", "vendor/**"],
    "alwaysInclude": ["README.md", "package.json", "composer.json"]
  },
  "output": {
    "charLimit": 100000,
    "fileLimit": 500,
    "clipboard": true
  },
  "git": {
    "respectGitignore": true,
    "includeUntracked": false
  },
  "cache": {
    "enabled": true,
    "ttl": 86400
  }
}`}
			language="json"
			filename=".copytreerc"
		/>
	</div>

	<!-- Environment Variables -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Environment Variables</h3>
		<p class="mb-4 text-muted-foreground">CopyTree uses these environment variables:</p>

		<CodeBlock
			code={`# Required for AI features
export GEMINI_API_KEY=your-api-key-here

# Performance settings
export COPYTREE_MAX_FILE_SIZE=1048576
export COPYTREE_MAX_TOTAL_SIZE=10485760
export COPYTREE_MAX_CONCURRENCY=5

# Cache configuration
export CACHE_ENABLED=true
export CACHE_FILE_PATH=~/.copytree/cache`}
			language="bash"
		/>
	</div>

	<!-- Profile-Specific Configuration -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Profile-Specific Configuration</h3>
		<p class="mb-4 text-muted-foreground">
			You can create custom profiles or override existing ones by creating a <code
				class="rounded bg-muted px-2 py-1 text-sm">.copytree/profiles/</code
			> directory in your project:
		</p>

		<CodeBlock
			code={`# .copytree/profiles/my-custom-profile.yaml
name: my-custom-profile
description: Custom profile for my specific project

include:
  - "src/**/*.js"
  - "lib/**/*.js"
  - "config/**"

exclude:
  - "**/*.test.js"
  - "**/*.spec.js"
  - "**/node_modules/**"
  - "**/coverage/**"

alwaysInclude:
  - "README.md"
  - "package.json"
  - ".env.example"

transforms:
  enabled: true
  preferredTransformers:
    - ai-summary
    - pdf
    - image-description

options:
  respectGitignore: true
  includeUntracked: false
  charLimit: 150000`}
			language="yaml"
			filename=".copytree/profiles/my-custom-profile.yaml"
		/>
	</div>

	<!-- Command Configuration Examples -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Command Configuration Examples</h3>

		<div class="space-y-4">
			<div
				class="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/20"
			>
				<h4 class="mb-2 font-medium text-blue-900 dark:text-blue-100">
					View current configuration
				</h4>
				<CodeBlock code="copytree config:show" language="bash" />
			</div>

			<div
				class="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/20"
			>
				<h4 class="mb-2 font-medium text-green-900 dark:text-green-100">Validate configuration</h4>
				<CodeBlock code="copytree config:validate" language="bash" />
			</div>

			<div
				class="rounded-lg border border-purple-200 bg-purple-50 p-4 dark:border-purple-800 dark:bg-purple-950/20"
			>
				<h4 class="mb-2 font-medium text-purple-900 dark:text-purple-100">
					Create default configuration file
				</h4>
				<CodeBlock code="copytree config:init" language="bash" />
			</div>
		</div>
	</div>

	<!-- Best Practices -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Configuration Best Practices</h3>

		<div
			class="from-primary-50 border-primary-100 dark:border-primary-800 rounded-xl border bg-gradient-to-br to-blue-50 p-6"
		>
			<ul class="space-y-3">
				<li class="flex gap-3">
					<span class="text-primary-600 mt-0.5">✓</span>
					<div>
						<strong class="text-foreground">Use project-specific .copytreerc files</strong>
						<p class="mt-1 text-sm text-muted-foreground">
							Keep configuration with your code for team consistency
						</p>
					</div>
				</li>
				<li class="flex gap-3">
					<span class="text-primary-600 mt-0.5">✓</span>
					<div>
						<strong class="text-foreground">Store API keys in environment variables</strong>
						<p class="mt-1 text-sm text-muted-foreground">
							Never commit sensitive information to version control
						</p>
					</div>
				</li>
				<li class="flex gap-3">
					<span class="text-primary-600 mt-0.5">✓</span>
					<div>
						<strong class="text-foreground">Override with command-line options</strong>
						<p class="mt-1 text-sm text-muted-foreground">
							Use CLI flags for one-off changes without modifying config files
						</p>
					</div>
				</li>
				<li class="flex gap-3">
					<span class="text-primary-600 mt-0.5">✓</span>
					<div>
						<strong class="text-foreground">Start with a profile, then customize</strong>
						<p class="mt-1 text-sm text-muted-foreground">
							Build on existing profiles rather than starting from scratch
						</p>
					</div>
				</li>
			</ul>
		</div>
	</div>
</div>
