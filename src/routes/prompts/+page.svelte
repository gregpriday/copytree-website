<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  
  onMount(() => {
    // Redirect to the first prompt or a default prompt
    goto('/prompts/code-context', { replaceState: true });
  });
</script>

<div class="container mx-auto px-6 py-12">
  <h1 class="text-3xl font-bold mb-6">Prompts</h1>
  <p>Loading prompts...</p>
</div>