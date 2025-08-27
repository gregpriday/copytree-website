// src/routes/docs/+layout.server.js
import { generateSoftwareApplicationSchema, generateFAQSchema, generateTechArticleSchema } from '$lib/seo.js';

// Prerendering disabled for simplified deployment
// export const prerender = true;

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
    // Generate docs-specific structured data
    const softwareSchema = generateSoftwareApplicationSchema();
    const faqSchema = generateFAQSchema();
    const techArticleSchema = generateTechArticleSchema({ url: 'https://copytree.dev/docs' });

    return {
        docsStructuredData: {
            software: softwareSchema,
            faq: faqSchema,
            techArticle: techArticleSchema
        }
    };
}
