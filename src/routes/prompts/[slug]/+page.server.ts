import { error } from '@sveltejs/kit';
import { prompts } from '$lib/prompts/prompts-config';
import type { PageServerLoad } from './$types';

export const prerender = false; // Disable prerendering for dynamic routes

export const load: PageServerLoad = async ({ params, fetch }) => {
  const { slug } = params;
  
  // Find the prompt config
  const promptConfig = prompts.find(p => p.slug === slug);
  if (!promptConfig) {
    throw error(404, 'Prompt not found');
  }

  try {
    // Load the prompt content from static files
    const response = await fetch(`/prompts/${promptConfig.file}`);
    if (!response.ok) {
      throw error(404, 'Prompt file not found');
    }
    const content = await response.text();

    const promptWithContent = {
      ...promptConfig,
      content
    };
    
    return {
      prompt: promptWithContent,
      currentSlug: slug
    };
  } catch (err) {
    console.error('Failed to load prompt:', err);
    throw error(500, 'Failed to load prompt content');
  }
};