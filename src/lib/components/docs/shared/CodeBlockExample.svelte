<script>
  import CodeBlock from './CodeBlock.svelte';

  /** @type {{ code: string, language?: string, filename?: string, title?: string, description?: string, class?: string }} */
  let {
    code,
    language = 'text',
    filename,
    title,
    description,
    class: className = ''
  } = $props();
</script>

<div class="my-6 not-prose {className}">
  {#if title || description}
    <div class="mb-4">
      {#if title}
        <h3 class="text-lg font-semibold text-foreground mb-2">{title}</h3>
      {/if}
      {#if description}
        <p class="text-sm text-muted-foreground">{description}</p>
      {/if}
    </div>
  {/if}
  
  <CodeBlock 
    {code}
    {language}
    {filename}
  />
</div>