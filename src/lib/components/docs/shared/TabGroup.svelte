<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Tab {
    id: string;
    label: string;
    content: Snippet;
  }

  interface TabGroupProps {
    tabs: Tab[];
    defaultTab?: string;
  }

  let { tabs, defaultTab }: TabGroupProps = $props();
  let activeTab = $state(defaultTab || tabs[0]?.id || '');
</script>

<div class="my-6 not-prose">
  <!-- Tab Headers -->
  <div class="flex border-b border-border">
    {#each tabs as tab}
      <button
        onclick={() => (activeTab = tab.id)}
        class="px-6 py-3 text-sm font-medium transition-colors duration-200 hover:text-foreground !rounded-none shadow-none hover:shadow-none focus:ring-2 focus:ring-primary focus:outline-none {
          activeTab === tab.id
            ? 'text-primary border-b-2 border-primary bg-primary/5'
            : 'text-muted-foreground hover:bg-muted/50'
        }"
        style="box-shadow: none"
      >
        {tab.label}
      </button>
    {/each}
  </div>
  
  <!-- Tab Content -->
  <div class="pt-6">
    {#each tabs as tab}
      {#if activeTab === tab.id}
        {@render tab.content()}
      {/if}
    {/each}
  </div>
</div>

