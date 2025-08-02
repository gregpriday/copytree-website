import { prompts, type PromptConfig, type PromptSection } from './prompts-config';

export async function loadPrompts(fetch: typeof globalThis.fetch): Promise<{
  prompts: PromptConfig[];
  sections: PromptSection[];
}> {
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

  // Parse sections from the first prompt for backward compatibility
  const sections = promptsWithContent[0]?.content
    .split('## ')
    .slice(1)
    .map(section => {
      const lines = section.split('\n');
      const title = lines[0].replace(/\*\*/g, '').trim();
      const content = lines.slice(1).join('\n').trim();
      const id = title.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-');
      return { id, title, content };
    }) || [];

  return { prompts: promptsWithContent, sections };
}

export async function loadPromptBySlug(slug: string, fetch: typeof globalThis.fetch): Promise<PromptConfig | null> {
  const prompt = prompts.find(p => p.slug === slug);
  if (!prompt) return null;

  try {
    const response = await fetch(`/prompts/${prompt.file}`);
    const content = await response.text();
    return { ...prompt, content };
  } catch (error) {
    console.error(`Failed to load prompt ${prompt.file}:`, error);
    return null;
  }
}