<!-- src/routes/+page.svelte -->
<script lang="ts">
	import Hero from '$lib/components/home/Hero.svelte';
	import VideoSection from '$lib/components/home/VideoSection.svelte';
	import Features from '$lib/components/home/Features.svelte';
	import GettingStarted from '$lib/components/home/GettingStarted.svelte';
	import CallToAction from '$lib/components/home/CallToAction.svelte';
</script>

<svelte:head>
	<title>CopyTree - AI-Friendly File Sharing</title>
	<meta name="description" content="Transform how you share files with AI. CopyTree creates intelligent, structured representations of your projects that AI models can easily understand and work with." />
</svelte:head>

<Hero />
<VideoSection />
<Features />
<GettingStarted />
<CallToAction />