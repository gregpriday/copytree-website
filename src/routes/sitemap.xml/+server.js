// src/routes/sitemap.xml/+server.js
// Dynamic XML sitemap generation

import { prompts } from '$lib/prompts/prompts-config.js';

const SITE_URL = 'https://copytree.dev';

/**
 * @typedef {Object} SitemapUrl
 * @property {string} loc - URL location
 * @property {string} lastmod - Last modification date
 * @property {string} changefreq - Change frequency
 * @property {string} priority - Priority (0.0 to 1.0)
 */

/**
 * Generate static pages for sitemap
 * @returns {SitemapUrl[]}
 */
function getStaticPages() {
	const currentDate = new Date().toISOString().split('T')[0];

	return [
		{
			loc: `${SITE_URL}/`,
			lastmod: currentDate,
			changefreq: 'weekly',
			priority: '1.0'
		},
		{
			loc: `${SITE_URL}/docs`,
			lastmod: currentDate,
			changefreq: 'weekly',
			priority: '0.9'
		},
		{
			loc: `${SITE_URL}/prompts`,
			lastmod: currentDate,
			changefreq: 'weekly',
			priority: '0.8'
		},
		{
			loc: `${SITE_URL}/privacy`,
			lastmod: currentDate,
			changefreq: 'yearly',
			priority: '0.3'
		},
		{
			loc: `${SITE_URL}/terms`,
			lastmod: currentDate,
			changefreq: 'yearly',
			priority: '0.3'
		}
	];
}

/**
 * Generate dynamic prompt pages for sitemap
 * @returns {SitemapUrl[]}
 */
function getPromptPages() {
	const currentDate = new Date().toISOString().split('T')[0];

	return prompts.map((prompt) => ({
		loc: `${SITE_URL}/prompts/${prompt.slug}`,
		lastmod: currentDate,
		changefreq: 'monthly',
		priority: '0.7'
	}));
}

/**
 * Generate XML sitemap content
 * @param {SitemapUrl[]} urls - Array of URLs to include
 * @returns {string} XML sitemap
 */
function generateSitemap(urls) {
	const urlEntries = urls
		.map(
			(url) => `
	<url>
		<loc>${url.loc}</loc>
		<lastmod>${url.lastmod}</lastmod>
		<changefreq>${url.changefreq}</changefreq>
		<priority>${url.priority}</priority>
	</url>`
		)
		.join('');

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	${urlEntries}
</urlset>`;
}

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	try {
		// Combine static and dynamic pages
		const staticPages = getStaticPages();
		const promptPages = getPromptPages();
		const allPages = [...staticPages, ...promptPages];

		// Generate XML sitemap
		const sitemap = generateSitemap(allPages);

		return new Response(sitemap, {
			headers: {
				'Content-Type': 'application/xml',
				'Cache-Control': 'max-age=3600' // Cache for 1 hour
			}
		});
	} catch (error) {
		console.error('Error generating sitemap:', error);
		return new Response('Error generating sitemap', {
			status: 500,
			headers: {
				'Content-Type': 'text/plain'
			}
		});
	}
}
