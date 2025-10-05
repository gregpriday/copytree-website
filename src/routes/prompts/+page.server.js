import { prompts, categories, allTags } from '$lib/prompts/prompts-config.js';

export const prerender = true;

export const load = async () => {
	// Return prompts data for the library view
	return {
		prompts,
		categories,
		tags: allTags
	};
};
