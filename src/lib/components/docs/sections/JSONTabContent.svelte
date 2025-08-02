<script>
	import CodeBlock from '../shared/CodeBlock.svelte';
</script>

<div>
	<p class="mb-4 text-muted-foreground">
		JSON format provides structured, machine-readable output perfect for programmatic processing.
	</p>

	<CodeBlock
		code={`{
  "metadata": {
    "timestamp": "2024-01-15T10:30:00Z",
    "source": "/path/to/project",
    "profile": "default",
    "totalFiles": 25,
    "totalSize": 1024000
  },
  "files": [
    {
      "path": "src/index.js",
      "size": 2048,
      "type": "javascript",
      "content": "// File content here..."
    }
  ]
}`}
		language="json"
		filename="output.json"
	/>
</div>
