import CodeBlock from '../shared/CodeBlock';
import Table from '../shared/Table';
import TabGroup from '../shared/TabGroup';

export default async function Usage() {
  const outputFormatTabs = [
    {
      id: 'xml',
      label: 'XML (Default)',
      content: (
        <div>
          <p className="text-muted-foreground mb-4">
            Structured format ideal for AI consumption with clear hierarchy.
          </p>
          <CodeBlock
            code={`<project>
  <file path="src/index.js">
    <content>// File content here
console.log('Hello, World!');</content>
  </file>
  <file path="src/utils.js">
    <content>export function formatDate(date) {
  return new Date(date).toLocaleDateString();
}</content>
  </file>
</project>`}
            language="xml"
          />
        </div>
      )
    },
    {
      id: 'json',
      label: 'JSON',
      content: (
        <div>
          <p className="text-muted-foreground mb-4">
            Machine-readable format for programmatic processing.
          </p>
          <CodeBlock
            code={`{
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
}`}
            language="json"
          />
        </div>
      )
    },
    {
      id: 'tree',
      label: 'Tree',
      content: (
        <div>
          <p className="text-muted-foreground mb-4">
            Visual directory structure for project overview.
          </p>
          <CodeBlock
            code={`my-project/
├── src/
│   ├── index.js
│   ├── utils.js
│   └── components/
│       ├── Header.jsx
│       └── Footer.jsx
├── tests/
│   └── utils.test.js
├── package.json
└── README.md`}
            language="bash"
          />
        </div>
      )
    }
  ];

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
    ['--no-cache', '', 'Disable AI caching', '--no-cache'],
  ];

  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <h2 className="text-3xl font-bold text-foreground mb-4">Usage</h2>
      
      {/* Basic Usage */}
      <div className="my-8">
        <h3 className="text-xl font-semibold text-foreground mb-4">Basic Usage</h3>
        <p className="text-muted-foreground mb-4">
          The simplest form copies the current directory:
        </p>
        <CodeBlock code="copytree" language="bash" />
        <p className="text-muted-foreground mt-4">
          Output is automatically copied to your clipboard, ready to paste into your AI assistant.
        </p>
      </div>

      {/* Command Syntax */}
      <div className="my-8">
        <h3 className="text-xl font-semibold text-foreground mb-4">Command Syntax</h3>
        <CodeBlock code="copytree [path] [options]" language="bash" />
        <div className="mt-4 space-y-2 text-muted-foreground">
          <p><strong>[path]</strong> - Optional path to directory or GitHub URL (defaults to current directory)</p>
          <p><strong>[options]</strong> - Command-line options to customize behavior</p>
        </div>
      </div>

      {/* Key Options */}
      <div className="my-8 not-prose">
        <h3 className="text-xl font-semibold text-foreground mb-4">Key Options</h3>
        <p className="text-muted-foreground mb-4">These patterns embody CopyTree&apos;s philosophy: Build smarter, not harder.</p>
        <Table
          headers={['Option', 'Short', 'Description', 'When to Use']}
          rows={keyOptionsData}
        />
      </div>

      {/* Output Formats */}
      <div className="my-8 not-prose">
        <h3 className="text-xl font-semibold text-foreground mb-4">Output Formats</h3>
        <p className="text-muted-foreground mb-4">
          CopyTree supports three output formats, each optimized for different use cases:
        </p>
        <TabGroup tabs={outputFormatTabs} defaultTab="xml" />
      </div>

      {/* Filtering Examples */}
      <div className="my-8 not-prose">
        <h3 className="text-xl font-semibold text-foreground mb-4">Filtering Examples</h3>
        <div className="space-y-4">
          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">Include only JavaScript files</h4>
            <CodeBlock code='copytree --filter "**/*.js"' language="bash" />
          </div>
          
          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">Exclude test files</h4>
            <CodeBlock code='copytree --filter "!**/*.test.js"' language="bash" />
          </div>
          
          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">Multiple filters</h4>
            <CodeBlock code='copytree --filter "src/**" "!**/*.spec.js"' language="bash" />
          </div>
          
          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">Always include specific files</h4>
            <CodeBlock code='copytree --always "README.md" "package.json"' language="bash" />
          </div>
        </div>
      </div>

      {/* Git Integration Examples */}
      <div className="my-8 not-prose">
        <h3 className="text-xl font-semibold text-foreground mb-4">Git Integration Examples</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-green-50 dark:from-green-950/20 to-primary-50 dark:to-primary-950/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
            <h4 className="font-medium text-foreground mb-2">Only modified files (uncommitted changes)</h4>
            <CodeBlock code="copytree --modified" language="bash" />
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 dark:from-blue-950/20 to-indigo-50 dark:to-indigo-950/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <h4 className="font-medium text-foreground mb-2">Files changed since last commit</h4>
            <CodeBlock code="copytree --changed HEAD~1" language="bash" />
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 dark:from-purple-950/20 to-pink-50 dark:to-pink-950/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
            <h4 className="font-medium text-foreground mb-2">Files changed between branches</h4>
            <CodeBlock code="copytree --changed main..feature-branch" language="bash" />
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 dark:from-orange-950/20 to-amber-50 dark:to-amber-950/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
            <h4 className="font-medium text-foreground mb-2">Modified files with context</h4>
            <CodeBlock code="copytree --modified --with-git-status" language="bash" />
          </div>
        </div>
      </div>

      {/* Advanced Usage Patterns */}
      <div className="my-8 not-prose">
        <h3 className="text-xl font-semibold text-foreground mb-4">Advanced Usage Patterns</h3>
        
        <div className="space-y-6">
          {/* Pattern 1 */}
          <div className="border border-border rounded-xl p-6">
            <h4 className="font-semibold text-foreground mb-3">Combine multiple options for precise control</h4>
            <p className="text-muted-foreground mb-3">
              This example shows how to copy only TypeScript files from the src directory that have been modified, 
              with a character limit to stay within AI context windows.
            </p>
            <CodeBlock 
              code='copytree --filter "src/**/*.ts" --modified --char-limit 100000 --format json'
              language="bash"
            />
          </div>

          {/* Pattern 2 */}
          <div className="border border-border rounded-xl p-6">
            <h4 className="font-semibold text-foreground mb-3">Create a comprehensive project snapshot</h4>
            <p className="text-muted-foreground mb-3">
              Perfect for creating documentation or sharing project structure with team members.
            </p>
            <CodeBlock 
              code='copytree --profile docs-custom --as-reference --output project-snapshot.xml --with-stats'
              language="bash"
            />
          </div>

          {/* Pattern 3 */}
          <div className="border border-border rounded-xl p-6">
            <h4 className="font-semibold text-foreground mb-3">Debug production issues with focused context</h4>
            <p className="text-muted-foreground mb-3">
              When debugging production issues, focus on modified files in critical directories.
            </p>
            <CodeBlock 
              code='copytree --filter "src/api/**" "src/services/**" --modified --format json'
              language="bash"
            />
          </div>
        </div>
      </div>
    </div>
  );
}