<script>
	import CodeBlock from '../shared/CodeBlock.svelte';
</script>

<div class="prose max-w-none prose-neutral dark:prose-invert">
	<h2 class="mb-4 text-3xl font-bold text-foreground">Advanced Features</h2>

	<p class="mb-8 text-lg leading-relaxed text-muted-foreground">
		Unlock the full potential of CopyTree with these advanced features and techniques.
	</p>

	<!-- GitHub Repository Support -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">GitHub Repository Support</h3>
		<p class="mb-4 text-muted-foreground">
			Harness git's power to focus AI on what matters—recent changes in your development journey.
		</p>

		<div class="space-y-4">
			<div class="rounded-lg bg-muted p-4">
				<h4 class="mb-2 font-medium text-foreground">Copy public repository</h4>
				<CodeBlock code="copytree https://github.com/facebook/react" language="bash" />
			</div>

			<div class="rounded-lg bg-muted p-4">
				<h4 class="mb-2 font-medium text-foreground">Copy specific branch</h4>
				<CodeBlock
					code="copytree https://github.com/vercel/next.js --branch canary"
					language="bash"
				/>
			</div>

			<div class="rounded-lg bg-muted p-4">
				<h4 class="mb-2 font-medium text-foreground">Copy with authentication (private repos)</h4>
				<CodeBlock
					code="GITHUB_TOKEN=your_token copytree https://github.com/org/private-repo"
					language="bash"
				/>
			</div>
		</div>

		<div
			class="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-950/20"
		>
			<h4 class="mb-2 font-semibold text-blue-900 dark:text-blue-100">
				GitHub Integration Features
			</h4>
			<ul class="space-y-1 text-sm text-blue-700 dark:text-blue-300">
				<li>• Automatic sparse checkout for large repositories</li>
				<li>• Respects repository .gitignore and .copytreerc</li>
				<li>• Caches repository data for efficient subsequent runs</li>
				<li>• Supports GitHub Enterprise with custom URLs</li>
			</ul>
		</div>
	</div>

	<!-- Streaming Large Files -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Streaming Large Files</h3>
		<p class="mb-4 text-muted-foreground">
			CopyTree automatically streams large files to handle massive codebases efficiently:
		</p>

		<div class="rounded-xl bg-gray-900 p-6 text-white">
			<h4 class="text-primary-400 mb-3 font-semibold">Streaming Architecture</h4>
			<div class="space-y-3 text-sm">
				<div class="flex items-start gap-3">
					<span class="text-primary-400">→</span>
					<div>
						<strong>Automatic Detection:</strong> Large files are automatically streamed based on configurable
						threshold
					</div>
				</div>
				<div class="flex items-start gap-3">
					<span class="text-primary-400">→</span>
					<div>
						<strong>Memory Efficient:</strong> Uses Node.js streams to process files in chunks
					</div>
				</div>
				<div class="flex items-start gap-3">
					<span class="text-primary-400">→</span>
					<div>
						<strong>Progress Tracking:</strong> Real-time progress for large file operations
					</div>
				</div>
				<div class="flex items-start gap-3">
					<span class="text-primary-400">→</span>
					<div>
						<strong>Configurable:</strong> Adjust streaming threshold via environment variables
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- AI Cache System -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">AI Cache System</h3>
		<p class="mb-4 text-muted-foreground">
			CopyTree implements intelligent caching for AI-powered transformers to reduce API calls:
		</p>

		<CodeBlock
			code={`# Cache configuration in .copytreerc
{
  "cache": {
    "enabled": true,
    "ttl": 86400,              // 24 hours in seconds
    "maxSize": "auto",         // Configurable cache size limit
    "strategy": "lru",         // Least Recently Used eviction
    "location": "~/.copytree/cache"
  }
}

# Clear cache manually
copytree cache:clear

# Run without cache
copytree --no-cache

# Show cache statistics
copytree cache:stats`}
			language="bash"
		/>

		<div class="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
			<div
				class="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/20"
			>
				<h4 class="mb-2 font-medium text-foreground">Performance Impact</h4>
				<p class="text-sm text-muted-foreground">
					Improved efficiency for repeated runs on same codebase
				</p>
			</div>
			<div
				class="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/20"
			>
				<h4 class="mb-2 font-medium text-foreground">Cost Savings</h4>
				<p class="text-sm text-muted-foreground">Reduces AI API calls significantly</p>
			</div>
			<div
				class="rounded-lg border border-purple-200 bg-purple-50 p-4 dark:border-purple-800 dark:bg-purple-950/20"
			>
				<h4 class="mb-2 font-medium text-foreground">Smart Invalidation</h4>
				<p class="text-sm text-muted-foreground">Auto-invalidates when files change</p>
			</div>
		</div>
	</div>

	<!-- Custom Pipeline Stages -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Custom Pipeline Stages</h3>
		<p class="mb-4 text-muted-foreground">
			Extend CopyTree's pipeline with custom processing stages:
		</p>

		<CodeBlock
			code={`// .copytree/pipeline/my-stage.js
module.exports = {
  name: 'my-custom-stage',
  order: 550, // Runs after transform (500) but before output (600)
  
  async process(files, options, context) {
    // Add custom metadata to all files
    const processedFiles = await Promise.all(
      files.map(async (file) => {
        const metrics = await analyzeCode(file.content);
        
        return {
          ...file,
          metadata: {
            ...file.metadata,
            complexity: metrics.complexity,
            lines: metrics.lines,
            dependencies: metrics.dependencies
          }
        };
      })
    );
    
    // Emit event for monitoring
    context.emit('custom-stage:complete', {
      filesProcessed: processedFiles.length
    });
    
    return processedFiles;
  }
};`}
			language="javascript"
			filename=".copytree/pipeline/my-stage.js"
		/>
	</div>

	<!-- Scripting and Automation -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Scripting and Automation</h3>
		<p class="mb-4 text-muted-foreground">Automate CopyTree workflows with scripts:</p>

		<CodeBlock
			code={`#!/bin/bash
# copytree-daily-summary.sh

# Configuration
OUTPUT_DIR="./ai-contexts"
DATE=$(date +%Y-%m-%d)

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Generate different contexts for different purposes
echo "Generating code contexts..."

# 1. Modified files context
copytree --modified \\
         --format xml \\
         --output "$OUTPUT_DIR/daily-changes-$DATE.xml"

# 2. Full project snapshot
copytree --profile default \\
         --char-limit 500000 \\
         --output "$OUTPUT_DIR/project-snapshot-$DATE.xml"

# 3. Test coverage context
copytree --filter "**/*.test.*" "**/*.spec.*" \\
         --transformers "unit-test-summary" \\
         --output "$OUTPUT_DIR/test-coverage-$DATE.xml"

# 4. Architecture overview
copytree --only-tree \\
         --with-stats \\
         --output "$OUTPUT_DIR/architecture-$DATE.txt"

echo "✅ Generated contexts in $OUTPUT_DIR"

# Optional: Upload to cloud storage
# aws s3 sync "$OUTPUT_DIR" "s3://my-bucket/copytree-contexts/"`}
			language="bash"
			filename="copytree-daily-summary.sh"
		/>
	</div>

	<!-- Performance Optimization -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Performance Optimization</h3>

		<div class="rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-white">
			<h4 class="text-primary-400 mb-4 text-xl font-semibold">Performance Tips</h4>

			<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
				<div>
					<h5 class="mb-2 font-semibold">File Selection</h5>
					<ul class="space-y-1 text-sm text-gray-300">
						<li>• Use specific filters to reduce file count</li>
						<li>• Leverage --head to limit files processed</li>
						<li>• Exclude large binary directories</li>
						<li>• Use profiles for consistent filtering</li>
					</ul>
				</div>

				<div>
					<h5 class="mb-2 font-semibold">Caching</h5>
					<ul class="space-y-1 text-sm text-gray-300">
						<li>• Keep cache enabled for AI transformers</li>
						<li>• Set appropriate cache TTL values</li>
						<li>• Clear cache periodically for freshness</li>
						<li>• Use --no-cache for critical updates</li>
					</ul>
				</div>

				<div>
					<h5 class="mb-2 font-semibold">Concurrency</h5>
					<ul class="space-y-1 text-sm text-gray-300">
						<li>• Adjust COPYTREE_MAX_CONCURRENCY</li>
						<li>• Balance CPU and memory usage</li>
						<li>• Monitor system resources</li>
						<li>• Use --verbose to track bottlenecks</li>
					</ul>
				</div>

				<div>
					<h5 class="mb-2 font-semibold">Output Size</h5>
					<ul class="space-y-1 text-sm text-gray-300">
						<li>• Use --char-limit for large projects</li>
						<li>• Consider JSON for smaller output</li>
						<li>• Disable unused transformers</li>
						<li>• Stream large outputs to files</li>
					</ul>
				</div>
			</div>
		</div>
	</div>

	<!-- Environment Variables Reference -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Environment Variables Reference</h3>

		<div class="rounded-xl bg-muted p-6">
			<div class="space-y-4">
				<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div>
						<h5 class="font-mono text-sm font-semibold">COPYTREE_DEBUG</h5>
						<p class="text-xs text-muted-foreground">Enable debug logging (true/false)</p>
					</div>
					<div>
						<h5 class="font-mono text-sm font-semibold">COPYTREE_COLORS</h5>
						<p class="text-xs text-muted-foreground">Enable/disable colored output</p>
					</div>
					<div>
						<h5 class="font-mono text-sm font-semibold">COPYTREE_TIMEOUT</h5>
						<p class="text-xs text-muted-foreground">Global timeout in milliseconds</p>
					</div>
					<div>
						<h5 class="font-mono text-sm font-semibold">COPYTREE_TEMP_DIR</h5>
						<p class="text-xs text-muted-foreground">Custom temporary directory path</p>
					</div>
					<div>
						<h5 class="font-mono text-sm font-semibold">COPYTREE_PARALLEL_JOBS</h5>
						<p class="text-xs text-muted-foreground">Number of parallel processing jobs</p>
					</div>
					<div>
						<h5 class="font-mono text-sm font-semibold">COPYTREE_MEMORY_LIMIT</h5>
						<p class="text-xs text-muted-foreground">Maximum memory usage in MB</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
