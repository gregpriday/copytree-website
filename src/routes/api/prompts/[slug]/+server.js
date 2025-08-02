import { json } from '@sveltejs/kit';
import { prompts } from '$lib/prompts/prompts-config.js';

export const GET = async ({ params, fetch }) => {
	const { slug } = params;

	const prompt = prompts.find((p) => p.slug === slug);
	if (!prompt) {
		return json({ error: 'Prompt not found' }, { status: 404 });
	}

	try {
		const response = await fetch(`/prompts/${prompt.file}`);
		if (!response.ok) {
			throw new Error(`Failed to fetch: ${response.status}`);
		}
		const content = await response.text();

		return json({ ...prompt, content });
	} catch (error) {
		console.error(`Failed to load prompt ${prompt.file}:`, error);
		return json({ error: 'Failed to load prompt content' }, { status: 500 });
	}
};
