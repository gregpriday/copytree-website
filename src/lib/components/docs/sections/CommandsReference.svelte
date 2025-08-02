<script lang="ts">
  import CodeBlock from '../shared/CodeBlock.svelte';
  import Table from '../shared/Table.svelte';

  const mainCommands = [
    ['copytree [path]', 'Copy files from path (default: current directory)'],
    ['copytree --help', 'Show help and all available options'],
    ['copytree --version', 'Display CopyTree version'],
  ];

  const profileCommands = [
    ['copytree profile:list', 'List all available profiles'],
    ['copytree profile:show <name>', 'Show details of a specific profile'],
    ['copytree profile:create <name>', 'Create a new custom profile'],
  ];

  const configCommands = [
    ['copytree config:show', 'Display current configuration'],
    ['copytree config:validate', 'Validate configuration files'],
    ['copytree config:init', 'Create default configuration file'],
  ];

  const utilityCommands = [
    ['copytree install:copytree', 'Run interactive setup wizard'],
    ['copytree cache:clear', 'Clear the AI response cache'],
    ['copytree self-update', 'Update CopyTree to latest version'],
  ];
</script>

<div class="prose prose-neutral dark:prose-invert max-w-none">
  <h2 class="text-3xl font-bold text-foreground mb-4">Commands Reference</h2>
  
  <p class="text-lg text-muted-foreground leading-relaxed mb-8">
    Complete reference for all CopyTree commands and options.
  </p>

  <!-- Main Commands -->
  <div class="my-8 not-prose">
    <h3 class="text-xl font-semibold text-foreground mb-4">Main Commands</h3>
    <Table headers={['Command', 'Description']} rows={mainCommands} />
  </div>

  <!-- Command Options -->
  <div class="my-8 not-prose">
    <h3 class="text-xl font-semibold text-foreground mb-4">Command Options</h3>
    
    <div class="space-y-6">
      <!-- File Selection Options -->
      <div class="border border-border rounded-xl p-6">
        <h4 class="font-semibold text-foreground mb-3 flex items-center gap-2">
          <svg class="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          File Selection Options
        </h4>
        <div class="space-y-3">
          <div>
            <code class="text-sm font-mono bg-muted text-foreground px-2 py-1 rounded">--filter, -f &lt;pattern&gt;</code>
            <p class="text-sm text-muted-foreground mt-1">Include/exclude files matching glob pattern</p>
          </div>
          <div>
            <code class="text-sm font-mono bg-muted text-foreground px-2 py-1 rounded">--always &lt;files&gt;</code>
            <p class="text-sm text-muted-foreground mt-1">Always include specific files regardless of filters</p>
          </div>
          <div>
            <code class="text-sm font-mono bg-muted text-foreground px-2 py-1 rounded">--profile, -p &lt;name&gt;</code>
            <p class="text-sm text-muted-foreground mt-1">Use a specific profile configuration</p>
          </div>
        </div>
      </div>

      <!-- Git Integration Options -->
      <div class="border border-border rounded-xl p-6">
        <h4 class="font-semibold text-foreground mb-3 flex items-center gap-2">
          <svg class="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          Git Integration Options
        </h4>
        <div class="space-y-3">
          <div>
            <code class="text-sm font-mono bg-muted text-foreground px-2 py-1 rounded">--modified, -m</code>
            <p class="text-sm text-muted-foreground mt-1">Only include git modified files (uncommitted changes)</p>
          </div>
          <div>
            <code class="text-sm font-mono bg-muted text-foreground px-2 py-1 rounded">--changed, -c &lt;ref&gt;</code>
            <p class="text-sm text-muted-foreground mt-1">Files changed since git reference (commit/branch)</p>
          </div>
          <div>
            <code class="text-sm font-mono bg-muted text-foreground px-2 py-1 rounded">--with-git-status</code>
            <p class="text-sm text-muted-foreground mt-1">Include git status information in output</p>
          </div>
        </div>
      </div>

      <!-- Output Options -->
      <div class="border border-border rounded-xl p-6">
        <h4 class="font-semibold text-foreground mb-3 flex items-center gap-2">
          <svg class="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Output Options
        </h4>
        <div class="space-y-3">
          <div>
            <code class="text-sm font-mono bg-muted text-foreground px-2 py-1 rounded">--output, -o &lt;file&gt;</code>
            <p class="text-sm text-muted-foreground mt-1">Save output to file instead of clipboard</p>
          </div>
          <div>
            <code class="text-sm font-mono bg-muted text-foreground px-2 py-1 rounded">--format &lt;type&gt;</code>
            <p class="text-sm text-muted-foreground mt-1">Output format: xml (default), json, or tree</p>
          </div>
          <div>
            <code class="text-sm font-mono bg-muted text-foreground px-2 py-1 rounded">--only-tree</code>
            <p class="text-sm text-muted-foreground mt-1">Only output directory tree structure</p>
          </div>
          <div>
            <code class="text-sm font-mono bg-muted text-foreground px-2 py-1 rounded">--no-clipboard</code>
            <p class="text-sm text-muted-foreground mt-1">Don't copy output to clipboard</p>
          </div>
        </div>
      </div>

      <!-- Limit Options -->
      <div class="border border-border rounded-xl p-6">
        <h4 class="font-semibold text-foreground mb-3 flex items-center gap-2">
          <svg class="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
          Limit Options
        </h4>
        <div class="space-y-3">
          <div>
            <code class="text-sm font-mono bg-muted text-foreground px-2 py-1 rounded">--head, -l &lt;count&gt;</code>
            <p class="text-sm text-muted-foreground mt-1">Limit number of files to include</p>
          </div>
          <div>
            <code class="text-sm font-mono bg-muted text-foreground px-2 py-1 rounded">--char-limit, -C &lt;chars&gt;</code>
            <p class="text-sm text-muted-foreground mt-1">Limit total output characters</p>
          </div>
          <div>
            <code class="text-sm font-mono bg-muted text-foreground px-2 py-1 rounded">--max-file-size &lt;bytes&gt;</code>
            <p class="text-sm text-muted-foreground mt-1">Skip files larger than specified size</p>
          </div>
        </div>
      </div>

      <!-- Transform Options -->
      <div class="border border-border rounded-xl p-6">
        <h4 class="font-semibold text-foreground mb-3 flex items-center gap-2">
          <svg class="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
          Transform Options
        </h4>
        <div class="space-y-3">
          <div>
            <code class="text-sm font-mono bg-muted text-foreground px-2 py-1 rounded">--no-transform</code>
            <p class="text-sm text-muted-foreground mt-1">Disable all transformers</p>
          </div>
          <div>
            <code class="text-sm font-mono bg-muted text-foreground px-2 py-1 rounded">--transformers &lt;list&gt;</code>
            <p class="text-sm text-muted-foreground mt-1">Use specific transformers (comma-separated)</p>
          </div>
          <div>
            <code class="text-sm font-mono bg-muted text-foreground px-2 py-1 rounded">--no-cache</code>
            <p class="text-sm text-muted-foreground mt-1">Disable AI response caching</p>
          </div>
        </div>
      </div>

      <!-- Other Options -->
      <div class="border border-border rounded-xl p-6">
        <h4 class="font-semibold text-foreground mb-3 flex items-center gap-2">
          <svg class="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          Other Options
        </h4>
        <div class="space-y-3">
          <div>
            <code class="text-sm font-mono bg-muted text-foreground px-2 py-1 rounded">--dry-run</code>
            <p class="text-sm text-muted-foreground mt-1">Preview what will be copied without executing</p>
          </div>
          <div>
            <code class="text-sm font-mono bg-muted text-foreground px-2 py-1 rounded">--verbose, -v</code>
            <p class="text-sm text-muted-foreground mt-1">Show detailed progress information</p>
          </div>
          <div>
            <code class="text-sm font-mono bg-muted text-foreground px-2 py-1 rounded">--quiet, -q</code>
            <p class="text-sm text-muted-foreground mt-1">Suppress all output except errors</p>
          </div>
          <div>
            <code class="text-sm font-mono bg-muted text-foreground px-2 py-1 rounded">--as-reference</code>
            <p class="text-sm text-muted-foreground mt-1">Add reference header for documentation</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Profile Commands -->
  <div class="my-8 not-prose">
    <h3 class="text-xl font-semibold text-foreground mb-4">Profile Commands</h3>
    <p class="text-muted-foreground mb-4">Use this to switch profiles seamlessly.</p>
    <Table headers={['Command', 'Description']} rows={profileCommands} />
  </div>

  <!-- Configuration Commands -->
  <div class="my-8 not-prose">
    <h3 class="text-xl font-semibold text-foreground mb-4">Configuration Commands</h3>
    <Table headers={['Command', 'Description']} rows={configCommands} />
  </div>

  <!-- Utility Commands -->
  <div class="my-8 not-prose">
    <h3 class="text-xl font-semibold text-foreground mb-4">Utility Commands</h3>
    <Table headers={['Command', 'Description']} rows={utilityCommands} />
  </div>

  <!-- Command Examples -->
  <div class="my-8 not-prose">
    <h3 class="text-xl font-semibold text-foreground mb-4">Command Examples</h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="bg-gradient-to-br from-primary-50 to-green-50 dark:from-primary-950/20 dark:to-green-950/20 rounded-lg p-4 border border-primary-200 dark:border-primary-800">
        <h4 class="font-medium text-foreground mb-2">Complex filtering</h4>
        <CodeBlock 
          code='copytree --filter "src/**/*.js" "!**/*.test.js" --always "README.md"' 
          language="bash" 
        />
      </div>
      
      <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
        <h4 class="font-medium text-foreground mb-2">Git-focused copy</h4>
        <CodeBlock 
          code="copytree --changed main --with-git-status --format json" 
          language="bash" 
        />
      </div>
      
      <div class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
        <h4 class="font-medium text-foreground mb-2">Limited output with AI</h4>
        <CodeBlock 
          code="copytree --head 50 --char-limit 100000 --format json" 
          language="bash" 
        />
      </div>
      
      <div class="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
        <h4 class="font-medium text-foreground mb-2">Preview with profile</h4>
        <CodeBlock 
          code="copytree --profile laravel --dry-run --verbose" 
          language="bash" 
        />
      </div>
    </div>
  </div>

  <!-- Exit Codes -->
  <div class="my-8 not-prose">
    <h3 class="text-xl font-semibold text-foreground mb-4">Exit Codes</h3>
    <div class="bg-gray-900 text-white rounded-xl p-6">
      <div class="space-y-2 font-mono text-sm">
        <div class="flex justify-between">
          <span class="text-primary-400">0</span>
          <span class="text-gray-300">Success - operation completed without errors</span>
        </div>
        <div class="flex justify-between">
          <span class="text-yellow-400">1</span>
          <span class="text-gray-300">General error - check error message for details</span>
        </div>
        <div class="flex justify-between">
          <span class="text-orange-400">2</span>
          <span class="text-gray-300">Invalid arguments or options</span>
        </div>
        <div class="flex justify-between">
          <span class="text-red-400">3</span>
          <span class="text-gray-300">File or directory not found</span>
        </div>
        <div class="flex justify-between">
          <span class="text-red-400">4</span>
          <span class="text-gray-300">Configuration error</span>
        </div>
      </div>
    </div>
  </div>
</div>