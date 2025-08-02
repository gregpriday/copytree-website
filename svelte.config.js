import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import adapter from '@sveltejs/adapter-vercel';

export default defineConfig({
	plugins: [sveltekit()],
	kit: {
		adapter: adapter({
			runtime: 'nodejs20.x',
			split: true  // Split into multiple functions to avoid bundling hangs
		}),
		prerender: {
			entries: []  // No pages to prerender - completely disabled
		}
	}
});