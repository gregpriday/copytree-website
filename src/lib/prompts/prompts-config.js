/**
 * @typedef {Object} PromptConfig
 * @property {string} id
 * @property {string} slug
 * @property {string} title
 * @property {string} description
 * @property {string} icon - Lucide icon name
 * @property {string} content
 * @property {string} file
 */

/**
 * @typedef {Object} PromptSection
 * @property {string} id
 * @property {string} title
 * @property {string} content
 */

/** @type {PromptConfig[]} */
export const prompts = [
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