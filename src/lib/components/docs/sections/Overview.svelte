<script>
	import FeatureCard from '../shared/FeatureCard.svelte';
	import PipelineIcon from '../shared/icons/PipelineIcon.svelte';
	import ServiceIcon from '../shared/icons/ServiceIcon.svelte';
	import TransformerIcon from '../shared/icons/TransformerIcon.svelte';
	import ProfileIcon from '../shared/icons/ProfileIcon.svelte';
</script>

<div class="prose max-w-none prose-neutral dark:prose-invert">
	<h2 class="mb-4 text-3xl font-bold text-foreground">Overview</h2>

	<p class="mb-8 text-lg leading-relaxed text-muted-foreground opacity-80">
		CopyTree revolutionizes how developers share codebases with AI, turning complex projects into
		optimized, AI-ready formats effortlessly. Compatible with Claude, ChatGPT, Grok, and Gemini
		through standardized output formats, with built-in AI features exclusively powered by Gemini
		integration. CopyTree solves the fundamental challenge of sharing complete code context with AI
		assistants.
	</p>

	<!-- Core Purpose -->
	<div class="my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Core Purpose</h3>
		<p class="mb-4 leading-relaxed text-muted-foreground opacity-80">
			CopyTree addresses a critical workflow gap in AI-assisted development: how to efficiently
			share an entire codebase with an AI that has a limited context window. Rather than manually
			copying and pasting files, CopyTree automates this process with intelligent file selection,
			transformation, and formatting.
		</p>
	</div>

	<!-- Architecture Diagram -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Architecture</h3>
		<p class="mb-4 leading-relaxed text-muted-foreground opacity-80">
			CopyTree employs a sophisticated pipeline architecture that processes files through 16
			distinct stages:
		</p>

		<div class="my-6 rounded-xl bg-gray-100 p-6 dark:bg-gray-900">
			<div class="text-primary-600 dark:text-primary-400 text-center font-mono text-sm">
				<div class="flex flex-wrap items-center justify-center gap-2">
					<span>FileDiscovery</span>
					<span class="text-gray-400 dark:text-gray-500">→</span>
					<span>ExternalSource</span>
					<span class="text-gray-400 dark:text-gray-500">→</span>
					<span>ProfileFilter</span>
					<span class="text-gray-400 dark:text-gray-500">→</span>
					<span>GitFilter</span>
					<span class="text-gray-400 dark:text-gray-500">→</span>
					<span>AlwaysInclude</span>
				</div>
				<div class="my-2 text-gray-400 dark:text-gray-500">↓</div>
				<div class="flex flex-wrap items-center justify-center gap-2">
					<span>NPM/Composer</span>
					<span class="text-gray-400 dark:text-gray-500">→</span>
					<span>Deduplicate</span>
					<span class="text-gray-400 dark:text-gray-500">→</span>
					<span>Sort</span>
					<span class="text-gray-400 dark:text-gray-500">→</span>
					<span>FileLoading</span>
					<span class="text-gray-400 dark:text-gray-500">→</span>
					<span>Transform</span>
				</div>
				<div class="my-2 text-gray-400 dark:text-gray-500">↓</div>
				<div class="flex flex-wrap items-center justify-center gap-2">
					<span>CharLimit</span>
					<span class="text-gray-400 dark:text-gray-500">→</span>
					<span>Limit</span>
					<span class="text-gray-400 dark:text-gray-500">→</span>
					<span>OutputFormatting</span>
					<span class="text-gray-400 dark:text-gray-500">→</span>
					<span>StreamingOutput</span>
				</div>
				<div class="my-2 text-gray-400 dark:text-gray-500">↓</div>
				<div class="flex flex-wrap items-center justify-center gap-2">
					<span>ComposerStage</span>
					<span class="text-gray-400 dark:text-gray-500">→</span>
					<span>Result</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Key Components -->
	<div class="not-prose my-8">
		<h3 class="mb-4 text-xl font-semibold text-foreground">Key Architectural Components</h3>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<FeatureCard
				icon={PipelineIcon}
				title="Pipeline System"
				description="Event-driven, sequential processing with error recovery"
			/>
			<FeatureCard
				icon={ServiceIcon}
				title="Service Layer"
				description="AI integration (Gemini), caching, git operations"
			/>
			<FeatureCard
				icon={TransformerIcon}
				title="Transformer System"
				description="16+ pluggable file transformers"
			/>
			<FeatureCard
				icon={ProfileIcon}
				title="Profile Engine"
				description="YAML-based configuration templates"
			/>
		</div>
	</div>
</div>
