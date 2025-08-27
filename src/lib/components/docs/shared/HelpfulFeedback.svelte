<script>
  import { ThumbsUp, ThumbsDown, Send } from 'lucide-svelte';
  import { page } from '$app/stores';

  let { sectionId = undefined } = $props();

  let submitted = $state(false);
  let submitting = $state(false);
  let voted = $state(null); // 'up' | 'down' | null
  let comment = $state('');

  async function submitFeedback(helpful) {
    try {
      submitting = true;
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: $page.url.pathname,
          section: sectionId,
          helpful,
          comment: helpful ? undefined : comment || undefined
        })
      });
      submitted = true;
    } catch (e) {
      // Non-fatal; avoid noisy UI
      console.warn('Feedback submission failed', e);
      submitted = true;
    } finally {
      submitting = false;
    }
  }

  function onUp() {
    voted = 'up';
    submitFeedback(true);
  }
  function onDown() {
    voted = 'down';
  }
  async function onSubmitComment() {
    await submitFeedback(false);
  }
</script>

<div class="mt-10 rounded-lg border border-border bg-background/50 p-4 shadow-sm backdrop-blur-sm">
  {#if submitted}
    <p class="text-sm text-foreground">Thanks for the feedback!</p>
  {:else}
    <div class="flex items-center justify-between gap-3">
      <p class="text-sm text-foreground">Was this page helpful?</p>
      <div class="flex items-center gap-2">
        <button class="inline-flex items-center gap-1 rounded-md border border-border bg-background/70 px-2 py-1 text-xs text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary" onclick={onUp} aria-label="Yes, this was helpful">
          <ThumbsUp class="h-4 w-4" />
          <span>Yes</span>
        </button>
        <button class="inline-flex items-center gap-1 rounded-md border border-border bg-background/70 px-2 py-1 text-xs text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary" onclick={onDown} aria-label="No, this wasn’t helpful">
          <ThumbsDown class="h-4 w-4" />
          <span>No</span>
        </button>
      </div>
    </div>

    {#if voted === 'down'}
      <div class="mt-4">
        <label for="feedback-comment" class="mb-2 block text-xs font-medium text-muted-foreground">What could be improved? (optional)</label>
        <textarea id="feedback-comment" class="h-24 w-full resize-y rounded-md border border-border bg-background/70 p-2 text-sm text-foreground placeholder:text-muted-foreground/80 focus:outline-none focus:ring-2 focus:ring-primary" bind:value={comment} placeholder="Tell us what’s missing or confusing…"></textarea>
        <div class="mt-2 flex items-center justify-end">
          <button class="inline-flex items-center gap-1 rounded-md border border-border bg-background/70 px-3 py-1.5 text-xs text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50" disabled={submitting} onclick={onSubmitComment} aria-label="Send feedback">
            <Send class="h-4 w-4" />
            <span>{submitting ? 'Sending…' : 'Send'}</span>
          </button>
        </div>
      </div>
    {/if}
  {/if}
</div>
