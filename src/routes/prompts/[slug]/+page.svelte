<script lang="ts">
  import PromptExplorer from '$lib/components/prompts/PromptExplorer.svelte';
  import PromptViewer from '$lib/components/prompts/PromptViewer.svelte';
  import type { PageData } from './$types';
  
  export let data: PageData;
</script>

<div class="flex border border-border rounded-lg overflow-hidden h-[calc(100vh-310px)]">
  <PromptExplorer currentSlug={data.currentSlug} />
  <PromptViewer prompt={data.prompt} />
</div>