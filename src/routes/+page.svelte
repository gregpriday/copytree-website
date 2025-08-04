<!-- src/routes/+page.svelte -->
<script>
	import Hero from '$lib/components/home/Hero.svelte';
	import VideoSection from '$lib/components/home/VideoSection.svelte';
	import Features from '$lib/components/home/Features.svelte';
	import GettingStarted from '$lib/components/home/GettingStarted.svelte';
	import CallToAction from '$lib/components/home/CallToAction.svelte';
</script>

<!-- SEO handled by +layout.svelte -->

<!-- Structured homepage flow with subtle dividers for reduced cognitive load -->
<Hero />

<!-- Divider -->
<div
	class="h-px bg-gradient-to-r from-transparent via-border/60 to-transparent"
	role="separator"
	aria-hidden="true"
></div>

<VideoSection />

<!-- Divider -->
<div
	class="h-px bg-gradient-to-r from-transparent via-border/60 to-transparent"
	role="separator"
	aria-hidden="true"
></div>

<Features />

<!-- Divider -->
<div
	class="h-px bg-gradient-to-r from-transparent via-border/60 to-transparent"
	role="separator"
	aria-hidden="true"
></div>

<GettingStarted />

<!-- Divider -->
<div
	class="h-px bg-gradient-to-r from-transparent via-border/60 to-transparent"
	role="separator"
	aria-hidden="true"
></div>

<CallToAction />
