<script lang="ts">
  interface Props {
    code: string;
    language?: string;
  }
  
  let { code, language = 'markdown' }: Props = $props();
</script>

<div class="h-full bg-secondary overflow-y-auto p-4 text-sm">
  <pre class="font-mono whitespace-pre-wrap break-words text-secondary-foreground">{code}</pre>
</div>