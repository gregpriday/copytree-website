<script>
  import CodeBlock from '../shared/CodeBlock.svelte';
</script>

<div class="prose prose-neutral dark:prose-invert max-w-none">
  <h2 class="text-3xl font-bold text-foreground mb-4">Quick Start</h2>
  
  <p class="text-lg text-muted-foreground leading-relaxed mb-8">
    Get up and running with CopyTree. These examples show the most common use cases.
  </p>

  <!-- Getting Started Steps -->
  <div class="my-8 not-prose">
    <h3 class="text-xl font-semibold text-foreground mb-8">Getting Started</h3>
    <div class="space-y-10">
      <!-- Step 1: Install -->
      <div class="group relative">
        <div class="absolute left-10 top-20 bottom-0 w-0.5 bg-gradient-to-b from-primary to-transparent"></div>
        <div class="flex gap-6">
          <div class="flex-shrink-0 relative z-10">
            <div class="w-20 h-20 rounded-2xl bg-white dark:bg-muted border-2 border-zinc-200 dark:border-border flex items-center justify-center group-hover:border-primary/50 transition-all duration-300 shadow-sm box-border">
              <span class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary/80">
                01
              </span>
            </div>
          </div>
          <div class="flex-1 overflow-visible">
            <h4 class="text-xl font-medium text-foreground mb-2">Install CopyTree</h4>
            <p class="text-muted-foreground mb-4">Get started with a simple npm install command</p>
            <div class="relative px-8 -mx-8">
              <CodeBlock code="npm install -g copytree" language="bash" glow={true} animate={true} animationSpeed={25} animationDelay={0} />
            </div>
          </div>
        </div>
      </div>

      <!-- Step 2: Copy -->
      <div class="group relative">
        <div class="absolute left-10 top-20 bottom-0 w-0.5 bg-gradient-to-b from-primary to-transparent"></div>
        <div class="flex gap-6">
          <div class="flex-shrink-0 relative z-10">
            <div class="w-20 h-20 rounded-2xl bg-white dark:bg-muted border-2 border-zinc-200 dark:border-border flex items-center justify-center group-hover:border-primary/50 transition-all duration-300 shadow-sm box-border">
              <span class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary/80">
                02
              </span>
            </div>
          </div>
          <div class="flex-1 overflow-visible">
            <h4 class="text-xl font-medium text-foreground mb-2">Copy Your Codebase</h4>
            <p class="text-muted-foreground mb-4">Run copytree in your project directory to copy it to your clipboard</p>
            <div class="relative px-8 -mx-8">
              <CodeBlock code="copytree" language="bash" glow={true} animate={true} animationSpeed={25} animationDelay={100} />
            </div>
          </div>
        </div>
      </div>

      <!-- Step 3: Paste & Plan -->
      <div class="group relative">
        <div class="absolute left-10 top-20 bottom-0 w-0.5 bg-gradient-to-b from-primary to-transparent"></div>
        <div class="flex gap-6">
          <div class="flex-shrink-0 relative z-10">
            <div class="w-20 h-20 rounded-2xl bg-white dark:bg-muted border-2 border-zinc-200 dark:border-border flex items-center justify-center group-hover:border-primary/50 transition-all duration-300 shadow-sm box-border">
              <span class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary/80">
                03
              </span>
            </div>
          </div>
          <div class="flex-1 overflow-visible">
            <h4 class="text-xl font-medium text-foreground mb-2">Paste & Plan</h4>
            <p class="text-muted-foreground mb-4">Your codebase is now copied to clipboard in AI-ready format. Simply paste it into Claude, ChatGPT, Grok, or any AI assistant to start building amazing things.</p>
          </div>
        </div>
      </div>

    </div>
  </div>

  <!-- Additional Examples -->
  <div class="my-8 not-prose">
    <h3 class="text-xl font-semibold text-foreground mb-4">More Examples</h3>
    <div class="space-y-6">
      <!-- Example 1 -->
      <div class="bg-muted rounded-xl p-6">
        <h4 class="font-semibold text-foreground mb-2">Copy specific directory</h4>
        <p class="text-sm text-muted-foreground mb-3">
          Point CopyTree to any directory on your system.
        </p>
        <CodeBlock code="copytree /path/to/my-project" language="bash" />
      </div>

      <!-- Example 2 -->
      <div class="bg-muted rounded-xl p-6">
        <h4 class="font-semibold text-foreground mb-2">Copy GitHub repository</h4>
        <p class="text-sm text-muted-foreground mb-3">
          Directly copy any public GitHub repository without cloning it first.
        </p>
        <CodeBlock code="copytree https://github.com/facebook/react" language="bash" />
      </div>

      <!-- Example 3 -->
      <div class="bg-muted rounded-xl p-6">
        <h4 class="font-semibold text-foreground mb-2">Use custom profile</h4>
        <p class="text-sm text-muted-foreground mb-3">
          Apply a custom profile tailored to your project.
        </p>
        <CodeBlock code="copytree --profile mycustom" language="bash" />
      </div>

      <!-- Example 4 -->
      <div class="bg-muted rounded-xl p-6">
        <h4 class="font-semibold text-foreground mb-2">Focus on modified files</h4>
        <p class="text-sm text-muted-foreground mb-3">
          Only copy files with uncommitted changes - perfect for debugging recent issues.
        </p>
        <CodeBlock code="copytree --modified" language="bash" />
      </div>
    </div>
  </div>

  <!-- Common Workflows -->
  <div class="my-8 not-prose">
    <h3 class="text-xl font-semibold text-foreground mb-4">Common Workflows</h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Debugging Recent Changes -->
      <div class="bg-gradient-to-br from-primary-50 to-green-50 dark:from-primary-950/20 dark:to-green-950/20 rounded-xl p-6 border border-primary-200 dark:border-primary-800">
        <div class="flex items-center gap-3 mb-3">
          <div class="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
            <svg class="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h4 class="font-semibold text-foreground">Debugging recent changes</h4>
        </div>
        <p class="text-sm text-muted-foreground mb-3">
          Focus on modified files to identify issues.
        </p>
        <CodeBlock code="copytree --modified --format xml" language="bash" />
      </div>

      <!-- Code Review Preparation -->
      <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <div class="flex items-center gap-3 mb-3">
          <div class="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h4 class="font-semibold text-foreground">Code review preparation</h4>
        </div>
        <p class="text-sm text-muted-foreground mb-3">
          Compare changes between branches for thorough reviews.
        </p>
        <CodeBlock code="copytree --changed main --output review.xml" language="bash" />
      </div>

      <!-- Documentation Generation -->
      <div class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
        <div class="flex items-center gap-3 mb-3">
          <div class="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <svg class="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h4 class="font-semibold text-foreground">Documentation generation</h4>
        </div>
        <p class="text-sm text-muted-foreground mb-3">
          Create reference documentation from your codebase.
        </p>
        <CodeBlock code="copytree --profile docs-custom --as-reference" language="bash" />
      </div>

      <!-- Project Overview -->
      <div class="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 rounded-xl p-6 border border-orange-200 dark:border-orange-800">
        <div class="flex items-center gap-3 mb-3">
          <div class="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
            <svg class="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
          </div>
          <h4 class="font-semibold text-foreground">Project overview</h4>
        </div>
        <p class="text-sm text-muted-foreground mb-3">
          Get a visual directory structure with git status.
        </p>
        <CodeBlock code="copytree --only-tree --with-git-status" language="bash" />
      </div>
    </div>
  </div>

  <!-- What Happens Next -->
  <div class="my-8 not-prose">
    <h3 class="text-xl font-semibold text-foreground mb-4">What Happens Next?</h3>
    <div class="bg-gray-900 text-white rounded-xl p-6">
      <div class="space-y-4">
        <div class="flex gap-4">
          <div class="flex-shrink-0 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-sm font-bold">1</div>
          <div>
            <h4 class="font-semibold mb-1">CopyTree analyzes your project</h4>
            <p class="text-sm text-gray-300">Detects framework, identifies relevant files, respects .gitignore</p>
          </div>
        </div>
        <div class="flex gap-4">
          <div class="flex-shrink-0 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-sm font-bold">2</div>
          <div>
            <h4 class="font-semibold mb-1">Files are processed and transformed</h4>
            <p class="text-sm text-gray-300">Applies appropriate transformers for PDFs, images, and code files</p>
          </div>
        </div>
        <div class="flex gap-4">
          <div class="flex-shrink-0 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-sm font-bold">3</div>
          <div>
            <h4 class="font-semibold mb-1">Output is formatted and copied</h4>
            <p class="text-sm text-gray-300">XML/JSON output is automatically copied to your clipboard</p>
          </div>
        </div>
        <div class="flex gap-4">
          <div class="flex-shrink-0 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-sm font-bold">4</div>
          <div>
            <h4 class="font-semibold mb-1">Paste into your AI assistant</h4>
            <p class="text-sm text-gray-300">Share with Claude, ChatGPT, or any LLM for instant context</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Pro Tips -->
  <div class="my-8 not-prose">
    <h3 class="text-xl font-semibold text-foreground mb-4">Pro Tips</h3>
    <div class="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
      <ul class="space-y-3 text-sm text-gray-700 dark:text-gray-300">
        <li class="flex gap-2">
          <span class="text-blue-600">💡</span>
          <span>Use <code class="bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100 px-1 rounded">--dry-run</code> to preview what will be copied before execution</span>
        </li>
        <li class="flex gap-2">
          <span class="text-blue-600">💡</span>
          <span>Combine filters for precise control: <code class="bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100 px-1 rounded">--filter "src/**" "!**/*.test.js"</code></span>
        </li>
        <li class="flex gap-2">
          <span class="text-blue-600">💡</span>
          <span>Save frequently used commands as shell aliases for easy access</span>
        </li>
        <li class="flex gap-2">
          <span class="text-blue-600">💡</span>
          <span>Use <code class="bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100 px-1 rounded">--output</code> to save results for team sharing or documentation</span>
        </li>
      </ul>
    </div>
  </div>
</div>