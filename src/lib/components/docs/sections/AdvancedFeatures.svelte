<script lang="ts">
  import CodeBlock from '../shared/CodeBlock.svelte';
</script>

<div class="prose prose-neutral dark:prose-invert max-w-none">
  <h2 class="text-3xl font-bold text-foreground mb-4">Advanced Features</h2>
  
  <p class="text-lg text-muted-foreground leading-relaxed mb-8">
    Unlock the full potential of CopyTree with these advanced features and techniques.
  </p>

  <!-- GitHub Repository Support -->
  <div class="my-8 not-prose">
    <h3 class="text-xl font-semibold text-foreground mb-4">GitHub Repository Support</h3>
    <p class="text-muted-foreground mb-4">
      Harness git's power to focus AI on what matters—recent changes in your development journey.
    </p>
    
    <div class="space-y-4">
      <div class="bg-muted rounded-lg p-4">
        <h4 class="font-medium text-foreground mb-2">Copy public repository</h4>
        <CodeBlock code="copytree https://github.com/facebook/react" language="bash" />
      </div>
      
      <div class="bg-muted rounded-lg p-4">
        <h4 class="font-medium text-foreground mb-2">Copy specific branch</h4>
        <CodeBlock code="copytree https://github.com/vercel/next.js --branch canary" language="bash" />
      </div>
      
      <div class="bg-muted rounded-lg p-4">
        <h4 class="font-medium text-foreground mb-2">Copy with authentication (private repos)</h4>
        <CodeBlock code="GITHUB_TOKEN=your_token copytree https://github.com/org/private-repo" language="bash" />
      </div>
    </div>
    
    <div class="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mt-6">
      <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">GitHub Integration Features</h4>
      <ul class="text-sm text-blue-700 dark:text-blue-300 space-y-1">
        <li>• Automatic sparse checkout for large repositories</li>
        <li>• Respects repository .gitignore and .copytreerc</li>
        <li>• Caches repository data for efficient subsequent runs</li>
        <li>• Supports GitHub Enterprise with custom URLs</li>
      </ul>
    </div>
  </div>

  <!-- Streaming Large Files -->
  <div class="my-8 not-prose">
    <h3 class="text-xl font-semibold text-foreground mb-4">Streaming Large Files</h3>
    <p class="text-muted-foreground mb-4">
      CopyTree automatically streams large files to handle massive codebases efficiently:
    </p>
    
    <div class="bg-gray-900 rounded-xl p-6 text-white">
      <h4 class="font-semibold text-primary-400 mb-3">Streaming Architecture</h4>
      <div class="space-y-3 text-sm">
        <div class="flex items-start gap-3">
          <span class="text-primary-400">→</span>
          <div>
            <strong>Automatic Detection:</strong> Large files are automatically streamed based on configurable threshold
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
  <div class="my-8 not-prose">
    <h3 class="text-xl font-semibold text-foreground mb-4">AI Cache System</h3>
    <p class="text-muted-foreground mb-4">
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
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      <div class="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <h4 class="font-medium text-foreground mb-2">Performance Impact</h4>
        <p class="text-sm text-muted-foreground">Improved efficiency for repeated runs on same codebase</p>
      </div>
      <div class="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 class="font-medium text-foreground mb-2">Cost Savings</h4>
        <p class="text-sm text-muted-foreground">Reduces AI API calls significantly</p>
      </div>
      <div class="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
        <h4 class="font-medium text-foreground mb-2">Smart Invalidation</h4>
        <p class="text-sm text-muted-foreground">Auto-invalidates when files change</p>
      </div>
    </div>
  </div>

  <!-- Custom Pipeline Stages -->
  <div class="my-8 not-prose">
    <h3 class="text-xl font-semibold text-foreground mb-4">Custom Pipeline Stages</h3>
    <p class="text-muted-foreground mb-4">
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
  <div class="my-8 not-prose">
    <h3 class="text-xl font-semibold text-foreground mb-4">Scripting and Automation</h3>
    <p class="text-muted-foreground mb-4">
      Automate CopyTree workflows with scripts:
    </p>
    
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
  <div class="my-8 not-prose">
    <h3 class="text-xl font-semibold text-foreground mb-4">Performance Optimization</h3>
    
    <div class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 text-white">
      <h4 class="text-xl font-semibold text-primary-400 mb-4">Performance Tips</h4>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h5 class="font-semibold mb-2">File Selection</h5>
          <ul class="text-sm text-gray-300 space-y-1">
            <li>• Use specific filters to reduce file count</li>
            <li>• Leverage --head to limit files processed</li>
            <li>• Exclude large binary directories</li>
            <li>• Use profiles for consistent filtering</li>
          </ul>
        </div>
        
        <div>
          <h5 class="font-semibold mb-2">Caching</h5>
          <ul class="text-sm text-gray-300 space-y-1">
            <li>• Keep cache enabled for AI transformers</li>
            <li>• Set appropriate cache TTL values</li>
            <li>• Clear cache periodically for freshness</li>
            <li>• Use --no-cache for critical updates</li>
          </ul>
        </div>
        
        <div>
          <h5 class="font-semibold mb-2">Concurrency</h5>
          <ul class="text-sm text-gray-300 space-y-1">
            <li>• Adjust COPYTREE_MAX_CONCURRENCY</li>
            <li>• Balance CPU and memory usage</li>
            <li>• Monitor system resources</li>
            <li>• Use --verbose to track bottlenecks</li>
          </ul>
        </div>
        
        <div>
          <h5 class="font-semibold mb-2">Output Size</h5>
          <ul class="text-sm text-gray-300 space-y-1">
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
  <div class="my-8 not-prose">
    <h3 class="text-xl font-semibold text-foreground mb-4">Environment Variables Reference</h3>
    
    <div class="bg-muted rounded-xl p-6">
      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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