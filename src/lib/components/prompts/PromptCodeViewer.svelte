<script lang="ts">
  export let code: string;
  export let language: string = 'markdown';
</script>

<div class="h-full bg-[#0d1117] overflow-y-auto p-4 text-sm">
  <pre class="font-mono whitespace-pre-wrap break-words text-white">{code}</pre>
</div>