<script lang="ts">
  import PromptCodeViewer from './PromptCodeViewer.svelte';
  import CopyButton from './CopyButton.svelte';
  import type { PromptConfig } from '$lib/prompts/prompts-config';
  
  export let prompt: PromptConfig;
</script>

<div class="flex-1 min-w-0 flex flex-col h-full">
  <!-- Header -->
  <div class="bg-muted/50 border-b border-border px-6 py-3 sticky top-0 z-10">
    <div class="flex justify-between items-center gap-4">
      <div class="flex-1 min-w-0">
        <h1 class="text-xl font-semibold text-foreground">{prompt.title}</h1>
        <p class="text-sm text-muted-foreground mt-1">{prompt.description}</p>
      </div>
      <CopyButton content={prompt.content} />
    </div>
  </div>
  
  <!-- Code editor area -->
  <div class="flex-1 overflow-hidden">
    <PromptCodeViewer
      code={prompt.content}
      language="markdown"
    />
  </div>
</div>