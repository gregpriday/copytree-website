<script lang="ts">
  import { Copy, Check } from 'lucide-svelte';
  
  interface Props {
    content: string;
  }
  
  let { content }: Props = $props();
  
  let copied = $state(false);

  const handleCopy = async () => {
    if (content) {
      await navigator.clipboard.writeText(content);
      copied = true;
      setTimeout(() => copied = false, 2000);
    }
  };
</script>

<button
  onclick={handleCopy}
  class="flex-shrink-0 flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer shadow-sm
    bg-muted hover:bg-accent text-foreground border border-border"
>
  {#if copied}
    <Check class="w-4 h-4" />
    <span>Copied!</span>
  {:else}
    <Copy class="w-4 h-4" />
    <span>Copy Prompt</span>
  {/if}
</button>