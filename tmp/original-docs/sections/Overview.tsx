import FeatureCard from '../shared/FeatureCard';

export default function Overview() {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <h2 className="text-3xl font-bold text-foreground mb-4">Overview</h2>
      
      <p className="text-lg text-muted-foreground opacity-80 leading-relaxed mb-8">
        CopyTree revolutionizes how developers share codebases with AI, turning complex projects into optimized, AI-ready formats effortlessly. Compatible with Claude, ChatGPT, Grok, and Gemini 
        through standardized output formats, with built-in AI features exclusively powered by Gemini integration. 
        CopyTree solves the fundamental challenge of sharing complete code context with AI assistants.
      </p>

      {/* Core Purpose */}
      <div className="my-8">
        <h3 className="text-xl font-semibold text-foreground mb-4">Core Purpose</h3>
        <p className="text-muted-foreground opacity-80 leading-relaxed mb-4">
          CopyTree addresses a critical workflow gap in AI-assisted development: how to efficiently share 
          an entire codebase with an AI that has a limited context window. Rather than manually copying 
          and pasting files, CopyTree automates this process with intelligent file selection, transformation, 
          and formatting.
        </p>
      </div>

      {/* Architecture Diagram */}
      <div className="my-8 not-prose">
        <h3 className="text-xl font-semibold text-foreground mb-4">Architecture</h3>
        <p className="text-muted-foreground opacity-80 leading-relaxed mb-4">
          CopyTree employs a sophisticated pipeline architecture that processes files through 16 distinct stages:
        </p>
        
        <div className="bg-gray-100 dark:bg-gray-900 rounded-xl p-6 my-6">
          <div className="font-mono text-sm text-primary-600 dark:text-primary-400 text-center">
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <span>FileDiscovery</span>
              <span className="text-gray-400 dark:text-gray-500">→</span>
              <span>ExternalSource</span>
              <span className="text-gray-400 dark:text-gray-500">→</span>
              <span>ProfileFilter</span>
              <span className="text-gray-400 dark:text-gray-500">→</span>
              <span>GitFilter</span>
              <span className="text-gray-400 dark:text-gray-500">→</span>
              <span>AlwaysInclude</span>
            </div>
            <div className="text-gray-400 dark:text-gray-500 my-2">↓</div>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <span>NPM/Composer</span>
              <span className="text-gray-400 dark:text-gray-500">→</span>
              <span>Deduplicate</span>
              <span className="text-gray-400 dark:text-gray-500">→</span>
              <span>Sort</span>
              <span className="text-gray-400 dark:text-gray-500">→</span>
              <span>FileLoading</span>
              <span className="text-gray-400 dark:text-gray-500">→</span>
              <span>Transform</span>
            </div>
            <div className="text-gray-400 dark:text-gray-500 my-2">↓</div>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <span>CharLimit</span>
              <span className="text-gray-400 dark:text-gray-500">→</span>
              <span>Limit</span>
              <span className="text-gray-400 dark:text-gray-500">→</span>
              <span>OutputFormatting</span>
              <span className="text-gray-400 dark:text-gray-500">→</span>
              <span>StreamingOutput</span>
            </div>
            <div className="text-gray-400 dark:text-gray-500 my-2">↓</div>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <span>ComposerStage</span>
              <span className="text-gray-400 dark:text-gray-500">→</span>
              <span>Result</span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Components */}
      <div className="my-8 not-prose">
        <h3 className="text-xl font-semibold text-foreground mb-4">Key Architectural Components</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FeatureCard
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            }
            title="Pipeline System"
            description="Event-driven, sequential processing with error recovery"
          />
          <FeatureCard
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            }
            title="Service Layer"
            description="AI integration (Gemini), caching, git operations"
          />
          <FeatureCard
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            }
            title="Transformer System"
            description="16+ pluggable file transformers"
          />
          <FeatureCard
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            }
            title="Profile Engine"
            description="YAML-based configuration templates"
          />
        </div>
      </div>

    </div>
  );
}