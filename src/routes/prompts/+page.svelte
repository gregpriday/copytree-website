<script>
	import { PromptLibrary } from '$lib/components/prompts';
	
	/** @type {import('./$types').PageData} */
	let { data } = $props();
</script>

<PromptLibrary prompts={data.prompts} categories={data.categories} tags={data.tags} />