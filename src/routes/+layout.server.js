// src/routes/+layout.server.js
import { generateMetadata, generateOrganizationSchema, generateBreadcrumbSchema } from '$lib/seo.js';

export const csr = true;
// Enable prerendering for the entire site
export const prerender = true;

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ url }) {
	const pathname = url.pathname;
	
	// Generate SEO metadata for the current page
	const seo = generateMetadata(pathname);
	
	// Generate structured data
	const organizationSchema = generateOrganizationSchema();
	const breadcrumbSchema = generateBreadcrumbSchema(pathname);
	
	return {
		seo,
		structuredData: {
			organization: organizationSchema,
			breadcrumb: breadcrumbSchema
		}
	};
}
