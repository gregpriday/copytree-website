import { prompts } from '$lib/prompts/prompts-config.js';

export const prerender = true;

export async function load() {
	return {
		prompts
	};
}
