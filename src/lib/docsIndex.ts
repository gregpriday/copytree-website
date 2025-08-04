// Documentation search index for CopyTree
// This creates a searchable index of all documentation content

/**
 * @typedef {Object} DocSection
 * @property {string} id - Unique identifier for the section
 * @property {string} title - Display title for the section
 * @property {string} content - Searchable content text
 * @property {string} path - URL path or anchor for navigation
 */

// Extracted content from each documentation section
/** @type {DocSection[]} */
export const docsIndex = [
	{
		id: 'overview',
		title: 'Overview',
		content: `CopyTree revolutionizes how developers share codebases with AI, turning complex projects into optimized, AI-ready formats effortlessly. Compatible with Claude, ChatGPT, Grok, and Gemini through standardized output formats, with built-in AI features exclusively powered by Gemini integration. CopyTree solves the fundamental challenge of sharing complete code context with AI assistants.

    Core Purpose:
    CopyTree addresses a critical workflow gap in AI-assisted development: how to efficiently share an entire codebase with an AI that has a limited context window. Rather than manually copying and pasting files, CopyTree automates this process with intelligent file selection, transformation, and formatting.

    Architecture:
    CopyTree employs a sophisticated pipeline architecture that processes files through 16 distinct stages: FileDiscovery, ExternalSource, ProfileFilter, GitFilter, AlwaysInclude, NPM/Composer, Deduplicate, Sort, FileLoading, Transform, CharLimit, Limit, OutputFormatting, StreamingOutput, ComposerStage, Result.

    Key Architectural Components:
    Pipeline System - Event-driven, sequential processing with error recovery
    Service Layer - AI integration (Gemini), caching, git operations  
    Transformer System - 16+ pluggable file transformers
    Profile Engine - YAML-based configuration templates`,
		path: '#overview'
	},
	{
		id: 'installation',
		title: 'Installation',
		content: `Prerequisites:
    Node.js Version 20.0.0 or higher, npm Version 8.0.0 or higher, Git for repository operations (optional), Pandoc for advanced document transformers (optional).

    Installation Methods:
    Global Installation: npm install -g copytree - Install globally for system-wide access. This is the recommended approach for most users.
    Local Installation: npm install --save-dev copytree - Install as project dependency for team consistency.
    Using Yarn: yarn global add copytree for global, yarn add --dev copytree for local.

    Environment Setup:
    Create a .env file in your home directory or project root with GEMINI_API_KEY, COPYTREE_MAX_FILE_SIZE, COPYTREE_MAX_TOTAL_SIZE, COPYTREE_MAX_CONCURRENCY, CACHE_ENABLED, CACHE_FILE_PATH.

    Getting a Gemini API Key:
    Visit Google AI Studio, Sign in with your Google account, Click "Create API Key", Copy the key and add it to your .env file.

    Verification:
    copytree install:copytree - Run setup wizard
    copytree config:validate - Validate configuration  
    copytree profile:list - List available profiles

    Common Installation Issues:
    Permission denied error - Use npm's global directory or sudo
    Node version too old - Update Node.js using nvm`,
		path: '#installation'
	},
	{
		id: 'quick-start',
		title: 'Quick Start',
		content: `Getting Started:
    Step 1: Install CopyTree - npm install -g copytree
    Step 2: Copy Your Codebase - Run copytree in your project directory to copy it to your clipboard
    Step 3: Paste & Plan - Your codebase is now copied to clipboard in AI-ready format. Simply paste it into Claude, ChatGPT, Grok, or any AI assistant.

    More Examples:
    Copy specific directory: copytree /path/to/my-project
    Copy GitHub repository: copytree https://github.com/facebook/react  
    Use custom profile: copytree --profile mycustom
    Focus on modified files: copytree --modified

    Common Workflows:
    Debugging recent changes: copytree --modified --format xml
    Code review preparation: copytree --changed main --output review.xml
    Documentation generation: copytree --profile docs-custom --as-reference
    Project overview: copytree --only-tree --with-git-status

    What Happens Next:
    1. CopyTree analyzes your project - Detects framework, identifies relevant files, respects .gitignore
    2. Files are processed and transformed - Applies appropriate transformers for PDFs, images, and code files  
    3. Output is formatted and copied - XML/JSON output is automatically copied to your clipboard
    4. Paste into your AI assistant - Share with Claude, ChatGPT, or any LLM for instant context

    Pro Tips:
    Use --dry-run to preview what will be copied before execution
    Combine filters for precise control: --filter "src/**" "!**/*.test.js"
    Save frequently used commands as shell aliases for easy access
    Use --output to save results for team sharing or documentation`,
		path: '#quick-start'
	},
	{
		id: 'usage',
		title: 'Usage',
		content: `Basic Usage:
    The simplest form copies the current directory: copytree
    Output is automatically copied to your clipboard, ready to paste into your AI assistant.

    Command Syntax:
    copytree [path] [options]
    [path] - Optional path to directory or GitHub URL (defaults to current directory)
    [options] - Command-line options to customize behavior

    Key Options:
    --profile (-p) - Use custom profile (overrides default)
    --filter (-f) - Additional patterns  
    --output (-o) - Save to file
    --format - Output format (xml, json, tree)
    --modified (-m) - Git modified files only
    --changed (-c) - Files changed since ref
    --dry-run - Preview without copying
    --head (-l) - Limit file count
    --char-limit (-C) - Character limit
    --only-tree - Directory tree only
    --no-cache - Disable AI caching

    Output Formats:
    XML (Default) - Structured format ideal for AI consumption with clear hierarchy
    JSON - Machine-readable format for programmatic processing  
    Tree - Visual directory structure for project overview

    Filtering Examples:
    Include only JavaScript files: copytree --filter "**/*.js"
    Exclude test files: copytree --filter "!**/*.test.js"
    Multiple filters: copytree --filter "src/**" "!**/*.spec.js"
    Always include specific files: copytree --always "README.md" "package.json"

    Git Integration Examples:
    Only modified files: copytree --modified
    Files changed since last commit: copytree --changed HEAD~1
    Files changed between branches: copytree --changed main..feature-branch
    Modified files with context: copytree --modified --with-git-status

    Advanced Usage Patterns:
    Combine multiple options: copytree --filter "src/**/*.ts" --modified --char-limit 100000 --format json
    Create comprehensive project snapshot: copytree --profile docs-custom --as-reference --output project-snapshot.xml --with-stats
    Debug production issues: copytree --filter "src/api/**" "src/services/**" --modified --format json`,
		path: '#usage'
	},
	{
		id: 'configuration',
		title: 'Configuration',
		content: `Configuration system settings profiles environment variables custom profiles YAML configuration file patterns include exclude transformers git integration AI settings caching performance tuning`,
		path: '#configuration'
	},
	{
		id: 'profiles',
		title: 'Profiles',
		content: `Profiles system default profiles custom profiles YAML templates profile creation profile management profile inheritance project-specific profiles framework profiles language profiles`,
		path: '#profiles'
	},
	{
		id: 'transformers',
		title: 'Transformers',
		content: `File transformers system 16+ transformers PDF transformer image transformer code transformer markdown transformer JSON transformer XML transformer CSV transformer binary file handling custom transformers transformer configuration`,
		path: '#transformers'
	},
	{
		id: 'features',
		title: 'Features',
		content: `Core features intelligent file selection AI-optimized output 15+ file transformers profile system git integration GitHub repo support clipboard automation XML JSON output formats filtering system character limits performance optimization`,
		path: '#features'
	},
	{
		id: 'advanced-features',
		title: 'Advanced Features',
		content: `Advanced features AI integration Gemini API caching system performance optimization git hooks custom transformers plugin system batch processing streaming output advanced filtering custom profiles enterprise features`,
		path: '#advanced-features'
	},
	{
		id: 'commands-reference',
		title: 'Commands Reference',
		content: `Commands reference CLI options command line interface all available commands detailed parameters examples usage patterns advanced options configuration commands profile commands git commands utility commands troubleshooting commands`,
		path: '#commands-reference'
	},
	{
		id: 'troubleshooting',
		title: 'Troubleshooting',
		content: `Troubleshooting common issues installation problems permission errors node version issues memory errors large files performance issues git integration problems API key issues configuration errors profile errors transformer errors output format issues`,
		path: '#troubleshooting'
	}
];
