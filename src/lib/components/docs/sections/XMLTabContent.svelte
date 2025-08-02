<script lang="ts">
  import CodeBlock from '../shared/CodeBlock.svelte';
</script>

<div>
  <p class="text-muted-foreground mb-4">
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