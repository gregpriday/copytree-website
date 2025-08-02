import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		prerender: {
			crawl: true,
			entries: ['*'],
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
