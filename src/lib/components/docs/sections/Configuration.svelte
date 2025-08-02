<script lang="ts">
  import CodeBlock from '../shared/CodeBlock.svelte';
</script>

<div class="prose prose-neutral dark:prose-invert max-w-none">
  <h2 class="text-3xl font-bold text-foreground mb-4">Configuration</h2>
  
  <p class="text-lg text-muted-foreground leading-relaxed mb-8">
    CopyTree uses a flexible configuration system that allows you to customize behavior at multiple levels.
  </p>

  <!-- Configuration Hierarchy -->
  <div class="my-8 not-prose">
    <h3 class="text-xl font-semibold text-foreground mb-4">Configuration Hierarchy</h3>
    <p class="text-muted-foreground mb-4">
      CopyTree uses a multi-level configuration system with the following priority (highest to lowest):
    </p>
    
    <div class="bg-gray-900 rounded-xl p-6">
      <div class="space-y-3">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
          <div class="text-white">
            <span class="font-semibold">Command-line arguments</span>
            <span class="text-gray-400 ml-2">Highest priority</span>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-primary-500/80 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
          <div class="text-white">
            <span class="font-semibold">Project .copytreerc file</span>
            <span class="text-gray-400 ml-2">Project-specific settings</span>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-primary-500/60 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
          <div class="text-white">
            <span class="font-semibold">Home directory .copytreerc</span>
            <span class="text-gray-400 ml-2">User defaults</span>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-primary-500/40 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
          <div class="text-white">
            <span class="font-semibold">Environment variables</span>
            <span class="text-gray-400 ml-2">System-wide settings</span>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-primary-500/20 rounded-full flex items-center justify-center text-white font-bold text-sm">5</div>
          <div class="text-white">
            <span class="font-semibold">Built-in defaults</span>
            <span class="text-gray-400 ml-2">Lowest priority</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Configuration File -->
  <div class="my-8 not-prose">
    <h3 class="text-xl font-semibold text-foreground mb-4">Configuration File (.copytreerc)</h3>
    <p class="text-muted-foreground mb-4">
      Create a <code class="bg-muted px-2 py-1 rounded text-sm">.copytreerc</code> file in your project root or home directory. # Customize filters to match your project's 'forest' of files.
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
  <div class="my-8 not-prose">
    <h3 class="text-xl font-semibold text-foreground mb-4">Environment Variables</h3>
    <p class="text-muted-foreground mb-4">
      CopyTree uses these environment variables:
    </p>
    
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
  <div class="my-8 not-prose">
    <h3 class="text-xl font-semibold text-foreground mb-4">Profile-Specific Configuration</h3>
    <p class="text-muted-foreground mb-4">
      You can create custom profiles or override existing ones by creating a <code class="bg-muted px-2 py-1 rounded text-sm">.copytree/profiles/</code> directory in your project:
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
  <div class="my-8 not-prose">
    <h3 class="text-xl font-semibold text-foreground mb-4">Command Configuration Examples</h3>
    
    <div class="space-y-4">
      <div class="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 class="font-medium text-blue-900 dark:text-blue-100 mb-2">View current configuration</h4>
        <CodeBlock code="copytree config:show" language="bash" />
      </div>
      
      <div class="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <h4 class="font-medium text-green-900 dark:text-green-100 mb-2">Validate configuration</h4>
        <CodeBlock code="copytree config:validate" language="bash" />
      </div>
      
      <div class="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
        <h4 class="font-medium text-purple-900 dark:text-purple-100 mb-2">Create default configuration file</h4>
        <CodeBlock code="copytree config:init" language="bash" />
      </div>
    </div>
  </div>

  <!-- Best Practices -->
  <div class="my-8 not-prose">
    <h3 class="text-xl font-semibold text-foreground mb-4">Configuration Best Practices</h3>
    
    <div class="bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl p-6 border border-primary-100 dark:border-primary-800">
      <ul class="space-y-3">
        <li class="flex gap-3">
          <span class="text-primary-600 mt-0.5">✓</span>
          <div>
            <strong class="text-foreground">Use project-specific .copytreerc files</strong>
            <p class="text-sm text-muted-foreground mt-1">Keep configuration with your code for team consistency</p>
          </div>
        </li>
        <li class="flex gap-3">
          <span class="text-primary-600 mt-0.5">✓</span>
          <div>
            <strong class="text-foreground">Store API keys in environment variables</strong>
            <p class="text-sm text-muted-foreground mt-1">Never commit sensitive information to version control</p>
          </div>
        </li>
        <li class="flex gap-3">
          <span class="text-primary-600 mt-0.5">✓</span>
          <div>
            <strong class="text-foreground">Override with command-line options</strong>
            <p class="text-sm text-muted-foreground mt-1">Use CLI flags for one-off changes without modifying config files</p>
          </div>
        </li>
        <li class="flex gap-3">
          <span class="text-primary-600 mt-0.5">✓</span>
          <div>
            <strong class="text-foreground">Start with a profile, then customize</strong>
            <p class="text-sm text-muted-foreground mt-1">Build on existing profiles rather than starting from scratch</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>