import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import adapter from '@sveltejs/adapter-vercel';

export default defineConfig({
	plugins: [sveltekit()],
	kit: {
		adapter: adapter({
			runtime: 'nodejs20.x'
		}),
		prerender: {
			crawl: true,
			entries: ['*'],
			handleHttpError: ({ path, referrer, message }) => {
				// Ignore expected 404 errors during prerendering
				const ignoredPaths = ['/favicon.png', '/privacy', '/terms', '/videos/prompts-demo.mp4'];
				if (ignoredPaths.includes(path)) {
					return;
				}
				// Throw other errors to be caught during development
				throw new Error(message);
			}
		}
	}
});