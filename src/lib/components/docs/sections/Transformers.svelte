<script>
	import CodeBlock from '../shared/CodeBlock.svelte';
	import TabGroup from '../shared/TabGroup.svelte';

	const transformerCategories = [
		{
			category: 'AI-Powered',
			icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
			transformers: [
				{
					name: 'ai-summary',
					description: 'Generates intelligent code summaries using Gemini AI',
					files: '.js, .py, .java, .php, .rb, .go, .rs, .swift',
					example: 'Summarizes complex functions and classes into plain English'
				},
				{
					name: 'image-description',
					description: 'Describes images using vision models',
					files: '.jpg, .png, .gif, .webp',
					example: 'Provides detailed descriptions of UI mockups and diagrams'
				},
				{
					name: 'svg-description',
					description: 'Analyzes and describes SVG graphics',
					files: '.svg',
					example: 'Explains icons, logos, and vector illustrations'
				},
				{
					name: 'unit-test-summary',
					description: 'Analyzes test files and summarizes coverage',
					files: '*test.js, *.spec.ts, *_test.py',
					example: 'Summarizes what functionality is being tested'
				}
			]
		},
		{
			category: 'Document Processing',
			icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
			transformers: [
				{
					name: 'pdf',
					description: 'Extracts text content from PDF files',
					files: '.pdf',
					example: 'Converts technical documentation PDFs to readable text'
				},
				{
					name: 'document-to-text',
					description: 'Converts various document formats to plain text',
					files: '.docx, .odt, .rtf',
					example: 'Extracts content from Word documents and specifications'
				},
				{
					name: 'csv',
					description: 'Formats CSV data as readable tables',
					files: '.csv, .tsv',
					example: 'Converts data files into markdown tables'
				}
			]
		},
		{
			category: 'Text Processing',
			icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
			transformers: [
				{
					name: 'markdown',
					description: 'Strips or converts markdown formatting',
					files: '.md',
					example: 'Cleans up README files for better AI parsing'
				},
				{
					name: 'html-stripper',
					description: 'Removes HTML tags and extracts text',
					files: '.html, .htm',
					example: 'Extracts content from web pages and templates'
				},
				{
					name: 'first-lines',
					description: 'Extracts first N lines of large files',
					files: 'Large text files',
					example: 'Previews large log files or data dumps'
				},
				{
					name: 'markdown-link-stripper',
					description: 'Removes markdown links while keeping text',
					files: '.md',
					example: 'Simplifies documentation for AI consumption'
				}
			]
		},
		{
			category: 'Core',
			icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
			transformers: [
				{
					name: 'file-loader',
					description: 'Default file reading transformer',
					files: 'All text files',
					example: 'Standard text file loading'
				},
				{
					name: 'binary',
					description: 'Handles binary files with metadata',
					files: 'Binary formats',
					example: 'Shows file size and type for images, executables'
				},
				{
					name: 'file-summary',
					description: 'Creates basic summaries without AI',
					files: 'All files',
					example: 'File metadata and basic statistics'
				}
			]
		}
	];

	// Create tabs for transformer examples
	const transformerExampleTabs = [
		{
			id: 'ai-summary',
			label: 'AI Summary',
			content: aiSummaryContent
		},
		{
			id: 'pdf',
			label: 'PDF Extraction',
			content: pdfContent
		},
		{
			id: 'image',
			label: 'Image Description',
			content: imageContent
		}
	];
</script>

{#snippet aiSummaryContent()}
	<div>
		<p class="mb-4 text-muted-foreground">
			The AI Summary transformer uses Gemini AI to create intelligent summaries of code files:
		</p>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<div>
				<h5 class="mb-2 font-medium text-foreground">Original Code</h5>
				<CodeBlock
					code={`export class UserAuthService {
  private tokenCache = new Map();
  
  async authenticate(email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.users.findOne({ email });
    
    if (!user || !await bcrypt.compare(password, user.password)) {
      throw new AuthError('Invalid credentials');
    }
    
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    this.tokenCache.set(user.id, token);
    
    return { user, token };
  }
}`}
					language="javascript"
				/>
			</div>
			<div>
				<h5 class="mb-2 font-medium text-foreground">AI Summary Output</h5>
				<div class="rounded-lg border border-blue-200 bg-blue-50 p-4">
					<p class="text-sm text-blue-900">
						<strong>UserAuthService Class Summary:</strong><br /><br />
						This service handles user authentication with the following features:<br />
						• Password hashing using bcrypt<br />
						• Database user lookup by email<br />
						• JWT token generation<br />
						• In-memory token caching<br />
						• Throws AuthError on invalid credentials<br /><br />
						Key dependencies: bcrypt, jsonwebtoken, database connection
					</p>
				</div>
			</div>
		</div>
	</div>
{/snippet}

{#snippet pdfContent()}
	<div>
		<p class="mb-4 text-muted-foreground">
			The PDF transformer extracts text content from PDF documents:
		</p>
		<div class="rounded-lg bg-gray-900 p-4 text-white">
			<div class="mb-2 text-xs text-gray-400">File: technical-spec.pdf</div>
			<pre class="text-sm text-gray-300">
{`<file path="docs/technical-spec.pdf" transformer="pdf">
  <content>
    Technical Specification Document
    Version 2.1 - March 2024
    
    1. System Architecture
    The system employs a microservices architecture with the following components:
    - API Gateway: Handles routing and authentication
    - User Service: Manages user accounts and profiles
    - Payment Service: Processes transactions
    - Notification Service: Sends emails and push notifications
    
    2. Technology Stack
    - Backend: Node.js with Express.js
    - Database: PostgreSQL with Redis cache
    - Message Queue: RabbitMQ
    - Container: Docker with Kubernetes orchestration
    ...
  </content>
</file>`}
			</pre>
		</div>
	</div>
{/snippet}

{#snippet imageContent()}
	<div>
		<p class="mb-4 text-muted-foreground">
			The image-description transformer uses AI vision to describe images:
		</p>
		<div class="rounded-lg bg-gray-900 p-4 text-white">
			<div class="mb-2 text-xs text-gray-400">File: dashboard-mockup.png</div>
			<pre class="text-sm text-gray-300">
{`<file path="designs/dashboard-mockup.png" transformer="image-description">
  <content>
    This image shows a web application dashboard design with:
    - A dark sidebar navigation on the left with menu items: Dashboard, Analytics, 
      Users, Settings, and Help
    - Main content area displaying a grid of metric cards showing:
      • Total Users: 12,483 (+15% increase)
      • Revenue: $48,392 (+8% increase)  
      • Active Sessions: 1,893
      • Conversion Rate: 3.2%
    - A line chart showing user growth over the past 6 months
    - A data table listing recent transactions
    - Modern design with blue accent colors and clean typography
  </content>
</file>`}
			</pre>
		</div>
	</div>
{/snippet}

<div class="prose max-w-none prose-neutral dark:prose-invert">
	<h2 class="mb-4 text-3xl font-bold text-foreground">Transformers</h2>

	<p class="mb-8 text-lg leading-relaxed text-muted-foreground">
		Transformers are plugins that process specific file types to extract meaningful content. They
		enable CopyTree to handle PDFs, images, and other non-text formats intelligently.
	</p>

	<!-- How Transformers Work -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">How Transformers Work</h3>

		<div class="rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 p-8 text-white">
			<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
				<div class="text-center">
					<div
						class="bg-primary-500/20 mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full"
					>
						<svg
							class="text-primary-400 h-8 w-8"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width={2}
								d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
							/>
						</svg>
					</div>
					<h4 class="mb-2 font-semibold">1. File Detection</h4>
					<p class="text-sm text-gray-300">
						CopyTree identifies file types based on extensions and content
					</p>
				</div>

				<div class="text-center">
					<div
						class="bg-primary-500/20 mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full"
					>
						<svg
							class="text-primary-400 h-8 w-8"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width={2}
								d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
							/>
						</svg>
					</div>
					<h4 class="mb-2 font-semibold">2. Transformation</h4>
					<p class="text-sm text-gray-300">
						Appropriate transformer processes the file to extract content
					</p>
				</div>

				<div class="text-center">
					<div
						class="bg-primary-500/20 mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full"
					>
						<svg
							class="text-primary-400 h-8 w-8"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width={2}
								d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
							/>
						</svg>
					</div>
					<h4 class="mb-2 font-semibold">3. AI-Ready Output</h4>
					<p class="text-sm text-gray-300">Content is formatted for optimal AI understanding</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Transformer Categories -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Available Transformers</h3>

		<div class="space-y-8">
			{#each transformerCategories as category}
				<div>
					<div class="mb-4 flex items-center gap-3">
						<div class="rounded-lg bg-muted p-2 text-muted-foreground">
							<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width={2}
									d={category.icon}
								/>
							</svg>
						</div>
						<h4 class="text-lg font-semibold text-foreground">
							{category.category}: Leverage Gemini to summarize code, describe images, and
							more—turning raw files into insightful context.
						</h4>
					</div>

					<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
						{#each category.transformers as transformer}
							<div class="rounded-lg border border-border bg-background p-4">
								<h5 class="text-primary-600 mb-1 font-mono text-sm font-semibold">
									{transformer.name}
								</h5>
								<p class="mb-2 text-sm text-muted-foreground">{transformer.description}</p>
								<div class="space-y-1 text-xs">
									<div>
										<span class="font-medium text-gray-700">Files:</span>
										<span class="ml-1 text-gray-500">{transformer.files}</span>
									</div>
									<div>
										<span class="font-medium text-gray-700">Example:</span>
										<span class="ml-1 text-gray-500">{transformer.example}</span>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Using Transformers -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Using Transformers</h3>

		<p class="mb-4 text-muted-foreground">
			Transformers are configured through profile files, not command-line flags. Enable or disable
			specific transformers in your profile configuration:
		</p>

		<div class="space-y-4">
			<div class="rounded-lg bg-muted p-4">
				<h4 class="mb-2 font-medium text-foreground">Profile Configuration</h4>
				<CodeBlock
					code={`# profile.yml
transformers:
  pdf:
    enabled: true
    options:
      maxPages: 50
  ai-summary:
    enabled: true
    options:
      maxFileSize: 102400
  markdown:
    enabled: false`}
					language="yaml"
				/>
			</div>

			<div class="rounded-lg bg-muted p-4">
				<h4 class="mb-2 font-medium text-foreground">Using Profile with Transformers</h4>
				<CodeBlock code="copytree --profile my-profile" language="bash" />
			</div>

			<div class="rounded-lg bg-muted p-4">
				<h4 class="mb-2 font-medium text-foreground">Disable AI Caching</h4>
				<CodeBlock code="copytree --no-cache" language="bash" />
				<p class="mt-2 text-sm text-muted-foreground">
					Useful when testing AI transformers with fresh results
				</p>
			</div>
		</div>
	</div>

	<!-- Transformer Examples -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Transformer Examples</h3>

		<TabGroup tabs={transformerExampleTabs} defaultTab="ai-summary" />
	</div>

	<!-- Creating Custom Transformers -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Creating Custom Transformers</h3>
		<p class="mb-4 text-muted-foreground">
			You can create custom transformers by adding JavaScript files to the transformers directory:
		</p>

		<CodeBlock
			code={`// .copytree/transformers/my-transformer.js
module.exports = {
  name: 'my-transformer',
  
  // File patterns this transformer handles
  patterns: ['*.myext', '*.custom'],
  
  // Priority (higher runs first)
  priority: 100,
  
  // Transform function
  async transform(file, content, options) {
    // Process the file content
    const processed = await myCustomProcessing(content);
    
    // Return transformed content
    return {
      content: processed,
      metadata: {
        transformer: 'my-transformer',
        processedAt: new Date().toISOString()
      }
    };
  },
  
  // Optional: Check if transformer should run
  shouldTransform(file, options) {
    // Custom logic to determine if transformer applies
    return file.size < 1000000; // Only files under 1MB
  }
};`}
			language="javascript"
			filename=".copytree/transformers/my-transformer.js"
		/>
	</div>

	<!-- Transformer Configuration -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Transformer Configuration</h3>
		<p class="mb-4 text-muted-foreground">
			Configure transformer behavior in your <code class="rounded bg-muted px-2 py-1 text-sm"
				>.copytreerc</code
			> file:
		</p>

		<CodeBlock
			code={`{
  "transforms": {
    "enabled": true,
    "preferredTransformers": [
      "ai-summary",
      "pdf",
      "image-description"
    ],
    "transformerOptions": {
      "ai-summary": {
        "maxLength": 500,
        "style": "technical"
      },
      "pdf": {
        "extractImages": false,
        "preserveFormatting": true
      },
      "first-lines": {
        "lineCount": 50
      }
    },
    "customTransformersPath": ".copytree/transformers"
  }
}`}
			language="json"
		/>
	</div>
</div>
