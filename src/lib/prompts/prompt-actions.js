import { prompts } from './prompts-config.js';

/**
 * Load prompts with their content from static files
 * @param {any} fetch - Fetch function
 * @returns {Promise<{prompts: PromptConfig[], sections: PromptSection[]}>}
 */
export async function loadPrompts(fetch) {
	// Load content for all prompts from static files
	const promptsWithContent = [];

	for (const prompt of prompts) {
		try {
			const response = await fetch(`/prompts/${prompt.file}`);
			const content = await response.text();
			promptsWithContent.push({ ...prompt, content });
		} catch (error) {
			console.error(`Failed to load prompt ${prompt.file}:`, error);
			promptsWithContent.push({ ...prompt, content: 'Failed to load content' });
		}
	}

	// Parse sections from the first prompt for backward compatibility
	const sections =
		promptsWithContent[0]?.content
			.split('## ')
			.slice(1)
			.map((section) => {
				const lines = section.split('\n');
				const title = lines[0].replace(/\*\*/g, '').trim();
				const content = lines.slice(1).join('\n').trim();
				const id = title
					.toLowerCase()
					.replace(/[^a-z0-9\s]/g, '')
					.replace(/\s+/g, '-');
				return { id, title, content };
			}) || [];

	return { prompts: promptsWithContent, sections };
}

/**
 * Load a specific prompt by slug
 * @param {string} slug - The prompt slug
 * @param {any} fetch - Fetch function
 * @returns {Promise<PromptConfig | null>}
 */
export async function loadPromptBySlug(slug, fetch) {
	const prompt = prompts.find((p) => p.slug === slug);
	if (!prompt) return null;

	try {
		const response = await fetch(`/prompts/${prompt.file}`);
		const content = await response.text();
		return { ...prompt, content };
	} catch (error) {
		console.error(`Failed to load prompt ${prompt.file}:`, error);
		return null;
	}
}
