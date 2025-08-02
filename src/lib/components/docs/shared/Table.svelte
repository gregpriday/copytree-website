<script lang="ts">
  import type { ComponentType, Snippet } from 'svelte';

  type CellContent = string | ComponentType | Snippet;

  interface TableProps {
    headers: string[];
    rows: CellContent[][];
    class?: string;
    striped?: boolean;
    bordered?: boolean;
    compact?: boolean;
  }

  let {
    headers,
    rows,
    class: className = '',
    striped = false,
    bordered = true,
    compact = false
  }: TableProps = $props();

  // Helper function to determine if content is a string
  function isString(content: CellContent): content is string {
    return typeof content === 'string';
  }

  // Helper function to determine if content is a snippet
  function isSnippet(content: CellContent): content is Snippet {
    return typeof content === 'function' && content.length === 0;
  }
</script>

<div class="w-full overflow-hidden rounded-lg {bordered ? 'border border-border' : ''} bg-background/50 backdrop-blur-sm {className}">
  <div class="overflow-x-auto">
    <table class="w-full">
      <!-- Table Header -->
      <thead class="bg-muted/50 border-b border-border">
        <tr>
          {#each headers as header}
            <th class="px-{compact ? '3' : '6'} py-{compact ? '2' : '4'} text-left text-sm font-semibold text-foreground tracking-wider">
              {header}
            </th>
          {/each}
        </tr>
      </thead>
      
      <!-- Table Body -->
      <tbody class="divide-y divide-border">
        {#each rows as row, rowIndex}
          <tr class="transition-colors duration-200 hover:bg-muted/30 {striped && rowIndex % 2 === 1 ? 'bg-muted/20' : ''}">
            {#each row as cell, _cellIndex}
              <td class="px-{compact ? '3' : '6'} py-{compact ? '2' : '4'} text-sm text-muted-foreground align-top">
                {#if isString(cell)}
                  <span class="leading-relaxed">{cell}</span>
                {:else if isSnippet(cell)}
                  {@render cell()}
                {:else}
                  {#if cell}
                    <cell></cell>
                  {/if}
                {/if}
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  
  <!-- Empty state -->
  {#if rows.length === 0}
    <div class="px-6 py-12 text-center">
      <div class="text-muted-foreground mb-2">
        <svg class="w-12 h-12 mx-auto opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <p class="text-sm text-muted-foreground">No data available</p>
    </div>
  {/if}
</div>

