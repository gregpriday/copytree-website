import adapter from '@sveltejs/adapter-auto';
import { prompts } from './src/lib/prompts/prompts-config.js';

// Dynamically generate entry points for all defined prompts
const promptEntries = prompts.map((p) => `/prompts/${p.slug}`);

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		prerender: {
			// Combine static entries with the dynamic prompt entries
			entries: ['/', '/docs', '/prompts', ...promptEntries],
			handleHttpError: ({ path, referrer, message }) => {
				// Ignore missing privacy/terms pages during prerendering
				if (path === '/privacy' || path === '/terms') {
					return;
				}
				throw new Error(message);
			}
		}
	}
};

export default config;
