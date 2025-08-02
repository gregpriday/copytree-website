<script>
  import CodeBlock from '../shared/CodeBlock.svelte';
</script>

<div class="prose prose-neutral dark:prose-invert max-w-none">
  <h2 class="text-3xl font-bold text-foreground mb-4">Usage</h2>
  
  <p class="text-lg text-muted-foreground leading-relaxed mb-8">
    Learn how to use CopyTree effectively with these comprehensive usage examples and patterns.
  </p>

  <!-- Basic Usage -->
  <div class="my-8 not-prose">
    <h3 class="text-xl font-semibold text-foreground mb-4">Basic Usage</h3>
    <p class="text-muted-foreground mb-4">
      The simplest form copies the current directory:
    </p>
    <CodeBlock code="copytree" language="bash" />
    <p class="text-sm text-muted-foreground mt-2">
      Output is automatically copied to your clipboard, ready to paste into your AI assistant.
    </p>
  </div>

  <!-- Command Syntax -->
  <div class="my-8 not-prose">
    <h3 class="text-xl font-semibold text-foreground mb-4">Command Syntax</h3>
    <CodeBlock code="copytree [path] [options]" language="bash" />
    <ul class="text-sm text-muted-foreground mt-4 space-y-1">
      <li>• <strong>[path]</strong> - Optional path to directory or GitHub URL (defaults to current directory)</li>
      <li>• <strong>[options]</strong> - Command-line options to customize behavior</li>
    </ul>
  </div>

  <!-- Key Options -->
  <div class="my-8 not-prose">
    <h3 class="text-xl font-semibold text-foreground mb-4">Key Options</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="bg-muted rounded-lg p-4">
        <code class="text-sm font-mono text-primary">--profile (-p)</code>
        <p class="text-sm text-muted-foreground mt-1">Use custom profile (overrides default)</p>
      </div>
      <div class="bg-muted rounded-lg p-4">
        <code class="text-sm font-mono text-primary">--filter (-f)</code>
        <p class="text-sm text-muted-foreground mt-1">Additional patterns</p>
      </div>
      <div class="bg-muted rounded-lg p-4">
        <code class="text-sm font-mono text-primary">--output (-o)</code>
        <p class="text-sm text-muted-foreground mt-1">Save to file</p>
      </div>
      <div class="bg-muted rounded-lg p-4">
        <code class="text-sm font-mono text-primary">--format</code>
        <p class="text-sm text-muted-foreground mt-1">Output format (xml, json, tree)</p>
      </div>
      <div class="bg-muted rounded-lg p-4">
        <code class="text-sm font-mono text-primary">--modified (-m)</code>
        <p class="text-sm text-muted-foreground mt-1">Git modified files only</p>
      </div>
      <div class="bg-muted rounded-lg p-4">
        <code class="text-sm font-mono text-primary">--dry-run</code>
        <p class="text-sm text-muted-foreground mt-1">Preview without copying</p>
      </div>
    </div>
  </div>

  <!-- TODO: Add more detailed usage examples -->
  <div class="my-8 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
    <p class="text-sm text-yellow-700 dark:text-yellow-300">
      This section is a placeholder. Full usage documentation with detailed examples will be added.
    </p>
  </div>
</div>