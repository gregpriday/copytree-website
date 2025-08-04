<!-- src/routes/+page.svelte -->
<script>
	import Hero from '$lib/components/home/Hero.svelte';
	import VideoSection from '$lib/components/home/VideoSection.svelte';
	import Features from '$lib/components/home/Features.svelte';
	import GettingStarted from '$lib/components/home/GettingStarted.svelte';
	import CallToAction from '$lib/components/home/CallToAction.svelte';
</script>

<svelte:head>
	<title>CopyTree - AI-Friendly File Sharing</title>
	<meta
		name="description"
		content="Transform how you share files with AI. CopyTree creates intelligent, structured representations of your projects that AI models can easily understand and work with."
	/>
</svelte:head>

<!-- Structured homepage flow with subtle dividers for reduced cognitive load -->
<Hero />

<!-- Divider -->
<div class="h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" role="separator" aria-hidden="true"></div>

<VideoSection />

<!-- Divider -->
<div class="h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" role="separator" aria-hidden="true"></div>

<Features />

<!-- Divider -->
<div class="h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" role="separator" aria-hidden="true"></div>

<GettingStarted />

<!-- Divider -->
<div class="h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" role="separator" aria-hidden="true"></div>

<CallToAction />
