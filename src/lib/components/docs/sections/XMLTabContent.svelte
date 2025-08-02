<script>
	import CodeBlock from '../shared/CodeBlock.svelte';
</script>

<div>
	<p class="mb-4 text-muted-foreground">
		XML format (default) provides structured, hierarchical output that's ideal for AI consumption
		with clear file boundaries.
	</p>

	<CodeBlock
		code={`<?xml version="1.0" encoding="UTF-8"?>
<project>
  <metadata>
    <timestamp>2024-01-15T10:30:00Z</timestamp>
    <source>/path/to/project</source>
    <profile>default</profile>
    <totalFiles>25</totalFiles>
    <totalSize>1024000</totalSize>
  </metadata>
  <files>
    <file path="src/index.js" size="2048" type="javascript">
      <content>
        // File content here...
      </content>
    </file>
  </files>
</project>`}
		language="xml"
		filename="output.xml"
	/>
</div>
