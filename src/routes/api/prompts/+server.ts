import { json } from '@sveltejs/kit';
import { prompts, type PromptConfig } from '$lib/prompts/prompts-config';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  try {
    // Load content for all prompts from static files
    const promptsWithContent: PromptConfig[] = [];
    
    for (const prompt of prompts) {
      try {
        const response = await fetch(`/prompts/${prompt.file}`);
        const content = await response.text();
        promptsWithContent.push({ ...prompt, content });
      } catch (error) {
        console.error(`Failed to load prompt ${prompt.file}:`, error);
        promptsWithContent.push({ ...prompt, content: 'Failed to load content' });
      }
    }

    return json({ prompts: promptsWithContent });
  } catch (error) {
    console.error('Failed to load prompts:', error);
    return json({ error: 'Failed to load prompts' }, { status: 500 });
  }
};