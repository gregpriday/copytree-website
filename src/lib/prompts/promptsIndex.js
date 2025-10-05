import Fuse from 'fuse.js';

let searchIndex = null;
let indexedPrompts = null;

/**
 * Build or retrieve the search index for prompts
 * @returns {Promise<{index: Fuse, prompts: Array}>}
 */
export async function getPromptsIndex() {
	// Return cached index if available
	if (searchIndex && indexedPrompts) {
		return { index: searchIndex, prompts: indexedPrompts };
	}
	
	try {
		// Fetch all prompts data from the API
		const response = await fetch('/api/prompts');
		if (!response.ok) {
			throw new Error('Failed to fetch prompts');
		}
		
		const prompts = await response.json();
		
		// Configure Fuse options (similar to docs search)
		const fuseOptions = {
			keys: [
				{ name: 'title', weight: 0.6 },
				{ name: 'description', weight: 0.2 },
				{ name: 'tags', weight: 0.1 },
				{ name: 'content', weight: 0.1 }
			],
			threshold: 0.3,
			includeScore: true,
			minMatchCharLength: 2,
			ignoreLocation: true,
			shouldSort: true
		};
		
		// Create the Fuse index
		searchIndex = new Fuse(prompts, fuseOptions);
		indexedPrompts = prompts;
		
		return { index: searchIndex, prompts: indexedPrompts };
	} catch (error) {
		console.error('Error building prompts index:', error);
		// Return empty index on error
		return { 
			index: new Fuse([], {}), 
			prompts: [] 
		};
	}
}

/**
 * Search prompts using the Fuse index
 * @param {string} query - Search query
 * @param {number} limit - Maximum number of results
 * @returns {Promise<Array>} Search results
 */
export async function searchPrompts(query, limit = 10) {
	if (!query || query.trim().length < 2) {
		return [];
	}
	
	const { index } = await getPromptsIndex();
	const results = index.search(query, { limit });
	
	// Map results to include the item and score
	return results.map(result => ({
		...result.item,
		score: result.score
	}));
}

/**
 * Get all prompts without searching
 * @returns {Promise<Array>}
 */
export async function getAllPrompts() {
	const { prompts } = await getPromptsIndex();
	return prompts;
}

/**
 * Clear the cached index (useful for development)
 */
export function clearPromptsIndex() {
	searchIndex = null;
	indexedPrompts = null;
}