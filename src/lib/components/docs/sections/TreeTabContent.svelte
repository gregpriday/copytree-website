<script lang="ts">
  import CodeBlock from '../shared/CodeBlock.svelte';
</script>

<div>
  <p class="text-muted-foreground mb-4">
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