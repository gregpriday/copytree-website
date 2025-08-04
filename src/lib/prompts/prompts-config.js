/**
 * @typedef {Object} PromptConfig
 * @property {string} id
 * @property {string} slug
 * @property {string} title
 * @property {string} description
 * @property {string} icon - Lucide icon name
 * @property {string} content
 * @property {string} file
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
		content: '' // Will be loaded dynamically
	},
	{
		id: 'design-architect',
		slug: 'design-architect',
		title: 'Design Architect',
		description:
			'System prompt for analyzing design systems and defining UI/UX design architecture and specifications.',
		icon: 'Palette',
		file: 'design-architect.md',
		content: '' // Will be loaded dynamically
	}
];
