import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		prerender: {
			entries: ['/', '/docs', '/prompts', '/prompts/implementation-architect'],
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
