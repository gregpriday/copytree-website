import { prompts } from '$lib/prompts/prompts-config.js';
import { error } from '@sveltejs/kit';

export const prerender = true;

export async function entries() {
	return prompts.map((prompt) => ({ slug: prompt.slug }));
}

export async function load({ params, fetch }) {
	const { slug } = params;

	// Find the prompt config
	const prompt = prompts.find((p) => p.slug === slug);
	if (!prompt) {
		throw error(404, 'Prompt not found');
	}

	try {
		// Load the prompt content from static files during prerendering
		const response = await fetch(`/prompts/${prompt.file}`);
		if (!response.ok) {
			throw error(404, 'Prompt file not found');
		}
		const content = await response.text();

		return {
			prompt: { ...prompt, content },
			currentSlug: slug
		};
	} catch (err) {
		console.error('Failed to load prompt:', err);
		throw error(500, 'Failed to load prompt content');
	}
}
