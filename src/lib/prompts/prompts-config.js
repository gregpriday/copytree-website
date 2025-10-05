/**
 * @typedef {Object} PromptConfig
 * @property {string} id
 * @property {string} slug
 * @property {string} title
 * @property {string} description
 * @property {string} icon - Lucide icon name
 * @property {string} content
 * @property {string} file
 * @property {string[]} tags
 * @property {string} category
 * @property {string} updated
 * @property {string[]} [modelHints]
 * @property {string} version
 */

/**
 * @typedef {Object} PromptSection
 * @property {string} id
 * @property {string} title
 * @property {string} content
 */

export const prompts = [
	{
		id: 'implementation-architect',
		slug: 'implementation-architect',
		title: 'Implementation Architect',
		description:
			'System prompt for planning and architecting code implementations across AI platforms.',
		icon: 'Building2',
		file: 'implementation-architect.md',
		content: '', // Will be loaded dynamically
		tags: ['architecture', 'planning', 'implementation', 'analysis'],
		category: 'Architecture',
		updated: '2025-01-08',
		modelHints: ['Claude', 'ChatGPT', 'Gemini'],
		version: '1.0'
	},
	{
		id: 'design-architect',
		slug: 'design-architect',
		title: 'Design Architect',
		description:
			'System prompt for analyzing design systems and defining UI/UX design architecture and specifications.',
		icon: 'Palette',
		file: 'design-architect.md',
		content: '', // Will be loaded dynamically
		tags: ['design', 'ui/ux', 'architecture', 'systems'],
		category: 'Design',
		updated: '2025-01-08',
		modelHints: ['Claude', 'ChatGPT'],
		version: '1.0'
	}
];

// Extract unique categories and tags for filtering
export const categories = [...new Set(prompts.map(p => p.category))];
export const allTags = [...new Set(prompts.flatMap(p => p.tags))];
