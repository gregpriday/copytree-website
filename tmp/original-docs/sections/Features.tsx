import Table from '../shared/Table';
import FeatureCard from '../shared/FeatureCard';

export default function Features() {
  const coreCapabilities = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'Intelligent File Selection',
      description: 'CopyTree intelligently selects and formats files, ensuring your AI gets exactly what it needs.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'AI-Optimized Output',
      description: 'Generates XML/JSON specifically formatted for LLMs, maximizing AI comprehension and context usage.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      title: 'Memory Efficient',
      description: 'Streaming support for large files handles multi-GB codebases smoothly.',
    },
  ];

  const transformersData = [
    ['file-loader', 'Core', 'Default file reading', 'All text files'],
    ['ai-summary', 'AI-Powered', 'Generates intelligent code summaries', '.js, .py, .java, etc.'],
    ['pdf', 'Document', 'Extracts text from PDFs', '.pdf'],
    ['image-description', 'AI-Powered', 'Describes images using vision models', '.jpg, .png, .gif'],
    ['image', 'OCR', 'Extracts text via OCR', 'Image formats'],
    ['csv', 'Data', 'Formats as readable tables', '.csv, .tsv'],
    ['markdown', 'Text', 'Strips or converts markdown', '.md'],
    ['first-lines', 'Text', 'Extracts first N lines', 'Large text files'],
    ['document-to-text', 'Document', 'Converts docs to plain text', '.docx, .odt'],
    ['html-stripper', 'Text', 'Removes HTML tags', '.html'],
    ['markdown-link-stripper', 'Text', 'Removes markdown links', '.md'],
    ['file-summary', 'Basic', 'Creates summaries without AI', 'All files'],
    ['svg-description', 'AI-Powered', 'Describes SVG graphics', '.svg'],
    ['unit-test-summary', 'AI-Powered', 'Analyzes test files', '*test.js, *.spec.ts'],
    ['binary', 'Core', 'Handles binary files', 'Binary formats'],
  ];

  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <h2 className="text-3xl font-bold text-foreground mb-4">Features</h2>
      
      {/* Core Functionality */}
      <div className="my-8 not-prose">
        <h3 className="text-xl font-semibold text-foreground mb-6">Core Functionality</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {coreCapabilities.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              highlight={index === 0}
            />
          ))}
        </div>
      </div>

      {/* File Transformers Table */}
      <div className="my-8 not-prose">
        <h3 className="text-xl font-semibold text-foreground mb-4">File Transformers</h3>
        <p className="text-muted-foreground mb-4">
          CopyTree includes 15+ specialized transformers to handle different file types intelligently:
        </p>
        <Table
          headers={['Transformer', 'Category', 'Description', 'Supported Files']}
          rows={transformersData}
        />
      </div>

      {/* Technical Architecture */}
      <div className="my-8 not-prose">
        <h3 className="text-xl font-semibold text-foreground mb-4">Technical Architecture</h3>
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-400 mb-2">Scalable Architecture</div>
              <div className="text-sm text-muted-foreground">Handles projects of any size</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-400 mb-2">Memory-Efficient Design</div>
              <div className="text-sm text-muted-foreground">Optimized for large codebases</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-400 mb-2">Configurable Limits</div>
              <div className="text-sm text-muted-foreground">Adjustable file size thresholds</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-400 mb-2">Intelligent Streaming</div>
              <div className="text-sm text-muted-foreground">Processes large files efficiently</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-400 mb-2">Smart Caching</div>
              <div className="text-sm text-muted-foreground">Reduces AI API costs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-400 mb-2">Parallel Processing</div>
              <div className="text-sm text-muted-foreground">Multi-threaded file analysis</div>
            </div>
          </div>
          <div className="mt-6 text-xs text-gray-400 text-center">
            Built with performance and scalability in mind. Architecture adapts to your project size and hardware capabilities.
          </div>
        </div>
      </div>
    </div>
  );
}