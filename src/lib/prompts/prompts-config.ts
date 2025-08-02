export interface PromptConfig {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  content: string;
  file: string;
}

export interface PromptSection {
  id: string;
  title: string;
  content: string;
}

export const prompts: PromptConfig[] = [
  {
    id: 'implementation-architect',
    slug: 'implementation-architect',
    title: 'Implementation Architect',
    description: 'System prompt for planning and architecting code implementations across AI platforms.',
    icon: 'BrainCircuit',
    file: 'implementation-architect.md',
    content: '', // Will be loaded dynamically
  },
];