<script>
	import CodeBlock from '../shared/CodeBlock.svelte';
</script>

<div class="prose max-w-none prose-neutral dark:prose-invert">
	<h2 class="mb-4 text-3xl font-bold text-foreground">Usage</h2>

	<p class="mb-8 text-lg leading-relaxed text-muted-foreground">
		Learn how to use CopyTree effectively with these comprehensive usage examples and patterns.
	</p>

	<!-- Basic Usage -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Basic Usage</h3>
		<p class="mb-4 text-muted-foreground">The simplest form copies the current directory:</p>
		<CodeBlock code="copytree" language="bash" />
		<p class="mt-2 text-sm text-muted-foreground">
			Output is automatically copied to your clipboard, ready to paste into your AI assistant.
		</p>
	</div>

	<!-- Command Syntax -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Command Syntax</h3>
		<CodeBlock code="copytree [path] [options]" language="bash" />
		<ul class="mt-4 space-y-1 text-sm text-muted-foreground">
			<li>
				• <strong>[path]</strong> - Optional path to directory or GitHub URL (defaults to current directory)
			</li>
			<li>• <strong>[options]</strong> - Command-line options to customize behavior</li>
		</ul>
	</div>

	<!-- Key Options -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Key Options</h3>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<div class="rounded-lg bg-muted p-4">
				<code class="font-mono text-sm text-primary">--profile (-p)</code>
				<p class="mt-1 text-sm text-muted-foreground">Use custom profile (overrides default)</p>
			</div>
			<div class="rounded-lg bg-muted p-4">
				<code class="font-mono text-sm text-primary">--filter (-f)</code>
				<p class="mt-1 text-sm text-muted-foreground">Additional patterns</p>
			</div>
			<div class="rounded-lg bg-muted p-4">
				<code class="font-mono text-sm text-primary">--output (-o)</code>
				<p class="mt-1 text-sm text-muted-foreground">Save to file</p>
			</div>
			<div class="rounded-lg bg-muted p-4">
				<code class="font-mono text-sm text-primary">--format</code>
				<p class="mt-1 text-sm text-muted-foreground">Output format (xml, json, tree)</p>
			</div>
			<div class="rounded-lg bg-muted p-4">
				<code class="font-mono text-sm text-primary">--modified (-m)</code>
				<p class="mt-1 text-sm text-muted-foreground">Git modified files only</p>
			</div>
			<div class="rounded-lg bg-muted p-4">
				<code class="font-mono text-sm text-primary">--dry-run</code>
				<p class="mt-1 text-sm text-muted-foreground">Preview without copying</p>
			</div>
		</div>
	</div>

	<!-- TODO: Add more detailed usage examples -->
	<div
		class="my-8 rounded-xl border border-yellow-200 bg-yellow-50 p-6 dark:border-yellow-800 dark:bg-yellow-950/20"
	>
		<p class="text-sm text-yellow-700 dark:text-yellow-300">
			This section is a placeholder. Full usage documentation with detailed examples will be added.
		</p>
	</div>
</div>
