import { json } from '@sveltejs/kit';
import { prompts } from '$lib/prompts/prompts-config.js';

export const GET = async () => {
  try {
    // Load content for all prompts from static files
    const promptsWithContent = [];
    
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