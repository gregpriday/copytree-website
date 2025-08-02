import CodeBlock from '../shared/CodeBlock';
import Table from '../shared/Table';

export default async function Profiles() {
  const builtInProfiles = [
    ['default', 'General purpose profile that works for any project type'],
  ];


  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <h2 className="text-3xl font-bold text-foreground mb-4">Profiles</h2>
      
      <p className="text-lg text-muted-foreground leading-relaxed mb-8">
        CopyTree uses a default profile as the baseline configuration, with easy custom profile creation 
        for project-specific file selection and processing rules.
      </p>

      {/* Default Profile */}
      <div className="my-8 not-prose">
        <h3 className="text-xl font-semibold text-foreground mb-4">Default Profile</h3>
        <p className="text-muted-foreground mb-4">
          CopyTree ships with a versatile default profile that works for most projects:
        </p>
        <Table
          headers={['Profile', 'Description']}
          rows={builtInProfiles}
        />
      </div>

      {/* Using Profiles */}
      <div className="my-8 not-prose">
        <h3 className="text-xl font-semibold text-foreground mb-4">Using Profiles</h3>
        
        <div className="space-y-4">
          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">Use default profile</h4>
            <CodeBlock code="copytree  # Uses default profile automatically" language="bash" />
          </div>
          
          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">Use custom profile</h4>
            <CodeBlock code="copytree --profile mycustom" language="bash" />
          </div>
          
          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">List available profiles</h4>
            <CodeBlock code="copytree profile:list" language="bash" />
          </div>
          
          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">Show profile details</h4>
            <CodeBlock code="copytree profile:show mycustom" language="bash" />
          </div>
        </div>
      </div>

      {/* Profile Examples */}
      <div className="my-8 not-prose">
        <h3 className="text-xl font-semibold text-foreground mb-4">Profile Examples</h3>
        
        <div className="space-y-6">
          {/* Default Profile */}
          <div className="border border-border rounded-xl overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-emerald-600 p-4">
              <h4 className="text-white font-semibold">
                Default Profile: Versatile baseline for any project
              </h4>
            </div>
            <div className="p-6">
              <p className="text-muted-foreground mb-4">
                The default profile provides sensible defaults that work across different project types and frameworks.
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

      {/* Creating Custom Profiles */}
      <div className="my-8 not-prose">
        <h3 className="text-xl font-semibold text-foreground mb-4">Creating Custom Profiles</h3>
        <p className="text-muted-foreground mb-4">
          Create custom profiles by adding YAML files to <code className="bg-muted px-2 py-1 rounded text-sm">.copytree/profiles/</code> in your project:
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

      {/* Profile Inheritance */}
      <div className="my-8 not-prose">
        <h3 className="text-xl font-semibold text-foreground mb-4">Profile Inheritance</h3>
        <p className="text-muted-foreground mb-4">
          Profiles can extend other profiles to inherit and override settings:
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
          <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">How inheritance works:</h4>
          <ol className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
            <li className="flex gap-2">
              <span className="font-semibold">1.</span>
              <span>The child profile starts with all settings from the parent profile</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold">2.</span>
              <span>Arrays (include, exclude) are merged with parent values</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold">3.</span>
              <span>Objects (options, transforms) are deep merged</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold">4.</span>
              <span>Scalar values (strings, numbers) are overridden</span>
            </li>
          </ol>
        </div>
        
        <div className="mt-6">
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

      {/* Best Practices */}
      <div className="my-8 not-prose">
        <h3 className="text-xl font-semibold text-foreground mb-4">Profile Best Practices</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-green-50 dark:from-green-950/20 to-primary-50 dark:to-primary-950/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
            <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Start with built-in profiles
            </h4>
            <p className="text-sm text-muted-foreground">
              Use existing profiles as a foundation and customize as needed.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 dark:from-blue-950/20 to-indigo-50 dark:to-indigo-950/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Keep profiles focused
            </h4>
            <p className="text-sm text-muted-foreground">
              Create specific profiles for different use cases rather than one complex profile.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 dark:from-purple-950/20 to-pink-50 dark:to-pink-950/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
            <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Document your profiles
            </h4>
            <p className="text-sm text-muted-foreground">
              Add clear descriptions to help team members understand profile purposes.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 dark:from-orange-950/20 to-amber-50 dark:to-amber-950/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
            <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Version control profiles
            </h4>
            <p className="text-sm text-muted-foreground">
              Commit custom profiles to ensure team consistency across environments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}