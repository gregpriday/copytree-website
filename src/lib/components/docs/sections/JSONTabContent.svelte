<script lang="ts">
  import CodeBlock from '../shared/CodeBlock.svelte';
</script>

<div>
  <p class="text-muted-foreground mb-4">
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