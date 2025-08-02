<script lang="ts">
  import { Copy, Check } from 'lucide-svelte';
  
  export let content: string;
  
  let copied = false;

  const handleCopy = async () => {
    if (content) {
      await navigator.clipboard.writeText(content);
      copied = true;
      setTimeout(() => copied = false, 2000);
    }
  };
</script>

<button
  on:click={handleCopy}
  class="flex-shrink-0 flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer shadow-sm
    dark:bg-muted dark:hover:bg-background dark:text-foreground dark:border dark:border-border
    bg-zinc-800 hover:bg-zinc-700 text-white"
>
  {#if copied}
    <Check class="w-4 h-4" />
    <span>Copied!</span>
  {:else}
    <Copy class="w-4 h-4" />
    <span>Copy Prompt</span>
  {/if}
</button>