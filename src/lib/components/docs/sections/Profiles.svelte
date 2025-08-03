<script>
	import CodeBlock from '../shared/CodeBlock.svelte';
	import Table from '../shared/Table.svelte';

	const builtInProfiles = [['default', 'General purpose profile that works for any project type']];
</script>

<div class="prose max-w-none prose-neutral dark:prose-invert">
	<h2 class="mb-4 text-3xl font-bold text-foreground">Profiles</h2>

	<p class="mb-8 text-lg leading-relaxed text-muted-foreground">
		CopyTree uses a default profile as the baseline configuration, with easy custom profile creation
		for project-specific file selection and processing rules.
	</p>

	<!-- Default Profile -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Default Profile</h3>
		<p class="mb-4 text-muted-foreground">
			CopyTree ships with a versatile default profile that works for most projects:
		</p>
		<Table headers={['Profile', 'Description']} rows={builtInProfiles} />
	</div>

	<!-- Using Profiles -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Using Profiles</h3>

		<div class="space-y-4">
			<div class="rounded-lg bg-muted p-4">
				<h4 class="mb-2 font-medium text-foreground">Use default profile</h4>
				<CodeBlock code="copytree  # Uses default profile automatically" language="bash" />
			</div>

			<div class="rounded-lg bg-muted p-4">
				<h4 class="mb-2 font-medium text-foreground">Use custom profile</h4>
				<CodeBlock code="copytree --profile mycustom" language="bash" />
			</div>

			<div class="rounded-lg bg-muted p-4">
				<h4 class="mb-2 font-medium text-foreground">List available profiles</h4>
				<CodeBlock code="copytree profile:list" language="bash" />
			</div>

			<div class="rounded-lg bg-muted p-4">
				<h4 class="mb-2 font-medium text-foreground">Show profile details</h4>
				<CodeBlock code="copytree profile:show mycustom" language="bash" />
			</div>
		</div>
	</div>

	<!-- Profile Examples -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Profile Examples</h3>

		<div class="space-y-6">
			<!-- Default Profile -->
			<div class="overflow-hidden rounded-xl border border-border">
				<div class="bg-gradient-to-r from-primary to-emerald-600 p-4">
					<h4 class="font-semibold text-white">
						Default Profile: Versatile baseline for any project
					</h4>
				</div>
				<div class="p-6">
					<p class="mb-4 text-muted-foreground">
						The default profile provides sensible defaults that work across different project types
						and frameworks.
					</p>
					<CodeBlock
						code={`include:
  - "**/*"
  
exclude:
  - "node_modules/**"
  - ".git/**"
  - "dist/**"
  - "build/**"
  - "**/*.log"
  - "**/.DS_Store"
  
alwaysInclude:
  - "README.md"
  - "package.json"
  - ".gitignore"`}
						language="yaml"
					/>
				</div>
			</div>
		</div>
	</div>

	<!-- Creating Custom Profiles -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Creating Custom Profiles</h3>
		<p class="mb-4 text-muted-foreground">
			Create custom profiles by adding YAML files to <code
				class="rounded bg-muted px-2 py-1 text-sm">.copytree/profiles/</code
			> in your project:
		</p>

		<CodeBlock
			code={`# .copytree/profiles/my-monorepo.yaml
name: my-monorepo
description: Custom profile for our monorepo structure

# Base profile to extend from
extends: default

# File patterns to include
include:
  - "packages/*/src/**"
  - "apps/*/src/**"
  - "shared/**"

# File patterns to exclude  
exclude:
  - "**/node_modules/**"
  - "**/dist/**"
  - "**/build/**"
  - "**/*.test.*"
  - "**/__tests__/**"

# Files to always include regardless of filters
alwaysInclude:
  - "README.md"
  - "lerna.json"
  - "package.json"
  - "pnpm-workspace.yaml"

# Transformer configuration
transforms:
  enabled: true
  preferredTransformers:
    - ai-summary
    - pdf
    - image-description
  
# Additional options
options:
  respectGitignore: true
  includeUntracked: false
  charLimit: 200000
  fileLimit: 1000`}
			language="yaml"
			filename=".copytree/profiles/my-monorepo.yaml"
		/>
	</div>

	<!-- Profile Inheritance -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Profile Inheritance</h3>
		<p class="mb-4 text-muted-foreground">
			Profiles can extend other profiles to inherit and override settings:
		</p>

		<div
			class="rounded-xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-950/20"
		>
			<h4 class="mb-3 font-semibold text-blue-900 dark:text-blue-100">How inheritance works:</h4>
			<ol class="space-y-2 text-sm text-blue-800 dark:text-blue-200">
				<li class="flex gap-2">
					<span class="font-semibold">1.</span>
					<span>The child profile starts with all settings from the parent profile</span>
				</li>
				<li class="flex gap-2">
					<span class="font-semibold">2.</span>
					<span>Arrays (include, exclude) are merged with parent values</span>
				</li>
				<li class="flex gap-2">
					<span class="font-semibold">3.</span>
					<span>Objects (options, transforms) are deep merged</span>
				</li>
				<li class="flex gap-2">
					<span class="font-semibold">4.</span>
					<span>Scalar values (strings, numbers) are overridden</span>
				</li>
			</ol>
		</div>

		<div class="mt-6">
			<CodeBlock
				code={`# Extending the default profile for React projects
name: react-custom
extends: default
description: Custom React project configuration

# Add React-specific excludes
exclude:
  - "build/**"
  - "coverage/**"
  - "**/*.test.{js,jsx}"
  
# Add React-specific includes
include:
  - "src/**/*.{js,jsx,ts,tsx}"
  - "public/**"
  
# Override options
options:
  charLimit: 100000`}
				language="yaml"
			/>
		</div>
	</div>

	<!-- Best Practices -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Profile Best Practices</h3>

		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<div
				class="to-primary-50 dark:to-primary-950/20 rounded-lg border border-green-200 bg-gradient-to-br from-green-50 p-4 dark:border-green-800 dark:from-green-950/20"
			>
				<h4 class="mb-2 flex items-center gap-2 font-medium text-foreground">
					<svg class="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width={2}
							d="M5 13l4 4L19 7"
						/>
					</svg>
					Start with built-in profiles
				</h4>
				<p class="text-sm text-muted-foreground">
					Use existing profiles as a foundation and customize as needed.
				</p>
			</div>

			<div
				class="rounded-lg border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-4 dark:border-blue-800 dark:from-blue-950/20 dark:to-indigo-950/20"
			>
				<h4 class="mb-2 flex items-center gap-2 font-medium text-foreground">
					<svg class="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width={2}
							d="M5 13l4 4L19 7"
						/>
					</svg>
					Keep profiles focused
				</h4>
				<p class="text-sm text-muted-foreground">
					Create specific profiles for different use cases rather than one complex profile.
				</p>
			</div>

			<div
				class="rounded-lg border border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 p-4 dark:border-purple-800 dark:from-purple-950/20 dark:to-pink-950/20"
			>
				<h4 class="mb-2 flex items-center gap-2 font-medium text-foreground">
					<svg
						class="h-5 w-5 text-purple-600"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width={2}
							d="M5 13l4 4L19 7"
						/>
					</svg>
					Document your profiles
				</h4>
				<p class="text-sm text-muted-foreground">
					Add clear descriptions to help team members understand profile purposes.
				</p>
			</div>

			<div
				class="rounded-lg border border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 p-4 dark:border-orange-800 dark:from-orange-950/20 dark:to-amber-950/20"
			>
				<h4 class="mb-2 flex items-center gap-2 font-medium text-foreground">
					<svg
						class="h-5 w-5 text-orange-600"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width={2}
							d="M5 13l4 4L19 7"
						/>
					</svg>
					Version control profiles
				</h4>
				<p class="text-sm text-muted-foreground">
					Commit custom profiles to ensure team consistency across environments.
				</p>
			</div>
		</div>
	</div>
</div>
