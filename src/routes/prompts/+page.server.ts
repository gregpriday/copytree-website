import { redirect } from '@sveltejs/kit';
import { prompts } from '$lib/prompts/prompts-config';
import type { PageServerLoad } from './$types';

export const prerender = false; // Disable prerendering for dynamic routes

export const load: PageServerLoad = async () => {
  // Redirect to the first prompt (maintaining current behavior)
  throw redirect(302, `/prompts/${prompts[0].slug}`);
};