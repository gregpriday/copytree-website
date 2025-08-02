import CodeBlock from '../shared/CodeBlock';
import TabGroup from '../shared/TabGroup';

export default async function Installation() {
  const installationTabs = [
    {
      id: 'global',
      label: 'Global Installation',
      content: (
        <div>
          <p className="text-muted-foreground mb-4">
            Install globally for system-wide access. This is the recommended approach for most users.
          </p>
          <CodeBlock
            code={`# Install globally for system-wide access
npm install -g copytree

# Verify installation
copytree --version`}
            language="bash"
          />
        </div>
      )
    },
    {
      id: 'local',
      label: 'Local Installation',
      content: (
        <div>
          <p className="text-muted-foreground mb-4">
            Install as a project dependency for team consistency.
          </p>
          <CodeBlock
            code={`# Install as project dependency
npm install --save-dev copytree

# Run with npx
npx copytree`}
            language="bash"
          />
        </div>
      )
    },
    {
      id: 'yarn',
      label: 'Using Yarn',
      content: (
        <div>
          <p className="text-muted-foreground mb-4">
            If you prefer Yarn as your package manager.
          </p>
          <CodeBlock
            code={`# Global installation with Yarn
yarn global add copytree

# Local installation
yarn add --dev copytree

# Run locally
yarn copytree`}
            language="bash"
          />
        </div>
      )
    }
  ];

  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <h2 className="text-3xl font-bold text-foreground mb-4">Installation</h2>
      
      {/* Prerequisites */}
      <div className="my-8 not-prose">
        <h3 className="text-xl font-semibold text-foreground mb-4">Prerequisites</h3>
        <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6 mb-6">
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">System Requirements</p>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">Don&apos;t worry—CopyTree plays nice with your existing setup.</p>
              <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1 mt-2">
                <li>• <strong>Node.js</strong>: Version 18.0.0 or higher (check with <code className="bg-yellow-100 dark:bg-yellow-900/30 px-1 rounded">node --version</code>)</li>
                <li>• <strong>npm</strong>: Version 8.0.0 or higher (comes with Node.js)</li>
                <li>• <strong>Git</strong>: For repository operations (optional)</li>
                <li>• <strong>Pandoc</strong>: For advanced document transformers (optional)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Installation Methods */}
      <div className="my-8 not-prose">
        <h3 className="text-xl font-semibold text-foreground mb-4">Installation Methods</h3>
        <TabGroup tabs={installationTabs} defaultTab="global" />
      </div>

      {/* Environment Setup */}
      <div className="my-8 not-prose">
        <h3 className="text-xl font-semibold text-foreground mb-4">Environment Setup</h3>
        <p className="text-muted-foreground mb-4">
          Create a <code className="bg-muted px-2 py-1 rounded text-sm">.env</code> file in your home directory or project root:
        </p>
        <CodeBlock
          code={`# AI Configuration (required for AI features)
GEMINI_API_KEY=your-api-key-here

# Optional: Performance tuning
COPYTREE_MAX_FILE_SIZE=configurable  # Set size limit
COPYTREE_MAX_TOTAL_SIZE=configurable # Set total limit
COPYTREE_MAX_CONCURRENCY=5

# Optional: Cache settings
CACHE_ENABLED=true
CACHE_FILE_PATH=~/.copytree/cache`}
          language="bash"
          filename=".env"
        />
        
        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mt-6">
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Getting a Gemini API Key</p>
              <ol className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <li>1. Visit <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 underline hover:text-primary-700 dark:hover:text-primary-300">Google AI Studio</a></li>
                <li>2. Sign in with your Google account</li>
                <li>3. Click &quot;Create API Key&quot;</li>
                <li>4. Copy the key and add it to your .env file</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Verification */}
      <div className="my-8 not-prose">
        <h3 className="text-xl font-semibold text-foreground mb-4">Verification</h3>
        <p className="text-muted-foreground mb-4">
          After installation, verify that CopyTree is properly configured:
        </p>
        <CodeBlock
          code={`# Run setup wizard
copytree install:copytree

# Validate configuration
copytree config:validate

# List available profiles
copytree profile:list`}
          language="bash"
        />
        
        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-xl p-6 mt-6">
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-semibold text-green-800 dark:text-green-200 mb-2">Success!</p>
              <p className="text-sm text-green-700 dark:text-green-300">
                If all commands run without errors, CopyTree is ready to use. You can now start copying your codebase!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Troubleshooting Installation */}
      <div className="my-8 not-prose">
        <h3 className="text-xl font-semibold text-foreground mb-4">Common Installation Issues</h3>
        <div className="space-y-4">
          <div className="border border-border rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-2">Permission denied error</h4>
            <p className="text-sm text-muted-foreground mb-2">If you encounter permission errors during global installation:</p>
            <CodeBlock
              code={`# Option 1: Use npm's global directory
npm config set prefix ~/.npm-global
export PATH=~/.npm-global/bin:$PATH
npm install -g copytree

# Option 2: Use sudo (not recommended)
sudo npm install -g copytree`}
              language="bash"
            />
          </div>
          
          <div className="border border-border rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-2">Node version too old</h4>
            <p className="text-sm text-muted-foreground mb-2">Update Node.js using nvm (Node Version Manager):</p>
            <CodeBlock
              code={`# Install nvm (if not already installed)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install latest Node.js
nvm install node
nvm use node`}
              language="bash"
            />
          </div>
        </div>
      </div>
    </div>
  );
}