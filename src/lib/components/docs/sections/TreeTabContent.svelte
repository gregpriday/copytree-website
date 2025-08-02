<script>
	import CodeBlock from '../shared/CodeBlock.svelte';
</script>

<div>
	<p class="mb-4 text-muted-foreground">
		Tree format provides a visual directory structure, perfect for project overviews and navigation.
	</p>

	<CodeBlock
		code={`my-project/
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   └── Footer.js
│   ├── utils/
│   │   └── helpers.js
│   └── index.js
├── tests/
│   └── app.test.js
├── package.json
└── README.md`}
		language="text"
		filename="project-tree.txt"
	/>
</div>
