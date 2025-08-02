<script lang="ts">
  import { prompts } from '$lib/prompts/prompts-config';
  import * as LucideIcons from 'lucide-svelte';
  import PromptsVideo from './PromptsVideo.svelte';
  
  export let currentSlug: string;
  
  const getIconComponent = (iconName: string) => {
    return (LucideIcons as any)[iconName] || LucideIcons.FileText;
  };
</script>

<div class="flex flex-col w-80 bg-background border-r border-border h-full">
  <div class="flex-1 overflow-y-auto p-2 space-y-4">
    <div class="space-y-2">
      <div class="px-2 py-1">
        <h2 class="text-sm font-semibold text-foreground">System Prompts</h2>
      </div>
      <nav class="space-y-1">
        {#each prompts as prompt (prompt.id)}
          {@const isActive = currentSlug === prompt.slug}
          {@const IconComponent = getIconComponent(prompt.icon)}
          <a
            href="/prompts/{prompt.slug}"
            class="flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 text-sm {isActive
              ? 'bg-primary/10 text-primary font-medium'
              : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'}"
          >
            <svelte:component 
              this={IconComponent} 
              class="w-4 h-4 flex-shrink-0 {isActive ? 'text-primary' : ''}" 
            />
            <span class="truncate">{prompt.title}</span>
          </a>
        {/each}
      </nav>
    </div>
  </div>
  <div class="p-4 border-t border-border bg-background">
    <PromptsVideo />
  </div>
</div>