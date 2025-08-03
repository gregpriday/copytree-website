<script>
	import CodeBlock from '../shared/CodeBlock.svelte';
	import Table from '../shared/Table.svelte';
	import TabGroup from '../shared/TabGroup.svelte';

	// Output format tabs data with embedded content
	const outputFormats = {
		xml: {
			description: 'Structured format ideal for AI consumption with clear hierarchy.',
			code: `<project>
  <file path="src/index.js">
    <content>// File content here
console.log('Hello, World!');</content>
  </file>
  <file path="src/utils.js">
    <content>export function formatDate(date) {
  return new Date(date).toLocaleDateString();
}</content>
  </file>
</project>`,
			language: 'xml'
		},
		json: {
			description: 'Machine-readable format for programmatic processing.',
			code: `{
  "files": [
    {
      "path": "src/index.js",
      "content": "// File content here\\nconsole.log('Hello, World!');"
    },
    {
      "path": "src/utils.js",
      "content": "export function formatDate(date) {\\n  return new Date(date).toLocaleDateString();\\n}"
    }
  ]
}`,
			language: 'json'
		},
		tree: {
			description: 'Visual directory structure for project overview.',
			code: `my-project/
├── src/
│   ├── index.js
│   ├── utils.js
│   └── components/
│       ├── Header.jsx
│       └── Footer.jsx
├── tests/
│   └── utils.test.js
├── package.json
└── README.md`,
			language: 'bash'
		}
	};

	// Tab configuration for TabGroup with snippets
	const outputFormatTabs = [
		{
			id: 'xml',
			label: 'XML (Default)',
			content: xmlContent
		},
		{
			id: 'json',
			label: 'JSON',
			content: jsonContent
		},
		{
			id: 'tree',
			label: 'Tree',
			content: treeContent
		}
	];

	// Key options data for the table
	const keyOptionsData = [
		['--profile', '-p', 'Use custom profile (overrides default)', '--profile mycustom'],
		['--filter', '-f', 'Additional patterns', '--filter "*.test.js"'],
		['--output', '-o', 'Save to file', '--output context.xml'],
		['--format', '', 'Output format', '--format json'],
		['--modified', '-m', 'Git modified files only', '--modified'],
		['--changed', '-c', 'Files changed since ref', '--changed main'],
		['--dry-run', '', 'Preview without copying', '--dry-run'],
		['--head', '-l', 'Limit file count', '--head 100'],
		['--char-limit', '-C', 'Character limit', '--char-limit 50000'],
		['--only-tree', '', 'Directory tree only', '--only-tree'],
		['--no-cache', '', 'Disable AI caching', '--no-cache']
	];
</script>

{#snippet xmlContent()}
	<div>
		<p class="mb-4 text-muted-foreground">
			{outputFormats.xml.description}
		</p>
		<CodeBlock code={outputFormats.xml.code} language={outputFormats.xml.language} />
	</div>
{/snippet}

{#snippet jsonContent()}
	<div>
		<p class="mb-4 text-muted-foreground">
			{outputFormats.json.description}
		</p>
		<CodeBlock code={outputFormats.json.code} language={outputFormats.json.language} />
	</div>
{/snippet}

{#snippet treeContent()}
	<div>
		<p class="mb-4 text-muted-foreground">
			{outputFormats.tree.description}
		</p>
		<CodeBlock code={outputFormats.tree.code} language={outputFormats.tree.language} />
	</div>
{/snippet}

<div class="prose max-w-none prose-neutral dark:prose-invert">
	<h2 class="mb-4 text-3xl font-bold text-foreground">Usage</h2>

	<!-- Basic Usage -->
	<div class="my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Basic Usage</h3>
		<p class="mb-4 text-muted-foreground">The simplest form copies the current directory:</p>
		<CodeBlock code="copytree" language="bash" />
		<p class="mt-4 text-muted-foreground">
			Output is automatically copied to your clipboard, ready to paste into your AI assistant.
		</p>
	</div>

	<!-- Command Syntax -->
	<div class="my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Command Syntax</h3>
		<CodeBlock code="copytree [path] [options]" language="bash" />
		<div class="mt-4 space-y-2 text-muted-foreground">
			<p>
				<strong>[path]</strong> - Optional path to directory or GitHub URL (defaults to current directory)
			</p>
			<p><strong>[options]</strong> - Command-line options to customize behavior</p>
		</div>
	</div>

	<!-- Key Options -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Key Options</h3>
		<p class="mb-4 text-muted-foreground">
			These patterns embody CopyTree's philosophy: Build smarter, not harder.
		</p>
		<Table headers={['Option', 'Short', 'Description', 'When to Use']} rows={keyOptionsData} />
	</div>

	<!-- Output Formats -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Output Formats</h3>
		<p class="mb-4 text-muted-foreground">
			CopyTree supports three output formats, each optimized for different use cases:
		</p>
		<TabGroup tabs={outputFormatTabs} defaultTab="xml" />
	</div>

	<!-- Filtering Examples -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Filtering Examples</h3>
		<div class="space-y-4">
			<div class="rounded-lg bg-muted p-4">
				<h4 class="mb-2 font-medium text-foreground">Include only JavaScript files</h4>
				<CodeBlock code={`copytree --filter "**/*.js"`} language="bash" />
			</div>

			<div class="rounded-lg bg-muted p-4">
				<h4 class="mb-2 font-medium text-foreground">Exclude test files</h4>
				<CodeBlock code={`copytree --filter "!**/*.test.js"`} language="bash" />
			</div>

			<div class="rounded-lg bg-muted p-4">
				<h4 class="mb-2 font-medium text-foreground">Multiple filters</h4>
				<CodeBlock code={`copytree --filter "src/**" "!**/*.spec.js"`} language="bash" />
			</div>

			<div class="rounded-lg bg-muted p-4">
				<h4 class="mb-2 font-medium text-foreground">Always include specific files</h4>
				<CodeBlock code={`copytree --always "README.md" "package.json"`} language="bash" />
			</div>
		</div>
	</div>

	<!-- Git Integration Examples -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Git Integration Examples</h3>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<div
				class="to-primary-50 dark:to-primary-950/20 rounded-lg border border-green-200 bg-gradient-to-br from-green-50 p-4 dark:border-green-800 dark:from-green-950/20"
			>
				<h4 class="mb-2 font-medium text-foreground">Only modified files (uncommitted changes)</h4>
				<CodeBlock code="copytree --modified" language="bash" />
			</div>

			<div
				class="rounded-lg border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-4 dark:border-blue-800 dark:from-blue-950/20 dark:to-indigo-950/20"
			>
				<h4 class="mb-2 font-medium text-foreground">Files changed since last commit</h4>
				<CodeBlock code="copytree --changed HEAD~1" language="bash" />
			</div>

			<div
				class="rounded-lg border border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 p-4 dark:border-purple-800 dark:from-purple-950/20 dark:to-pink-950/20"
			>
				<h4 class="mb-2 font-medium text-foreground">Files changed between branches</h4>
				<CodeBlock code="copytree --changed main..feature-branch" language="bash" />
			</div>

			<div
				class="rounded-lg border border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 p-4 dark:border-orange-800 dark:from-orange-950/20 dark:to-amber-950/20"
			>
				<h4 class="mb-2 font-medium text-foreground">Modified files with context</h4>
				<CodeBlock code="copytree --modified --with-git-status" language="bash" />
			</div>
		</div>
	</div>

	<!-- Advanced Usage Patterns -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Advanced Usage Patterns</h3>

		<div class="space-y-6">
			<!-- Pattern 1 -->
			<div class="rounded-xl border border-border p-6">
				<h4 class="mb-3 font-semibold text-foreground">
					Combine multiple options for precise control
				</h4>
				<p class="mb-3 text-muted-foreground">
					This example shows how to copy only TypeScript files from the src directory that have been
					modified, with a character limit to stay within AI context windows.
				</p>
				<CodeBlock
					code={`copytree --filter "src/**/*.ts" --modified --char-limit 100000 --format json`}
					language="bash"
				/>
			</div>

			<!-- Pattern 2 -->
			<div class="rounded-xl border border-border p-6">
				<h4 class="mb-3 font-semibold text-foreground">Create a comprehensive project snapshot</h4>
				<p class="mb-3 text-muted-foreground">
					Perfect for creating documentation or sharing project structure with team members.
				</p>
				<CodeBlock
					code="copytree --profile docs-custom --as-reference --output project-snapshot.xml --with-stats"
					language="bash"
				/>
			</div>

			<!-- Pattern 3 -->
			<div class="rounded-xl border border-border p-6">
				<h4 class="mb-3 font-semibold text-foreground">
					Debug production issues with focused context
				</h4>
				<p class="mb-3 text-muted-foreground">
					When debugging production issues, focus on modified files in critical directories.
				</p>
				<CodeBlock
					code={`copytree --filter "src/api/**" "src/services/**" --modified --format json`}
					language="bash"
				/>
			</div>
		</div>
	</div>
</div>
