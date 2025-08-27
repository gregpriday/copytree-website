// src/lib/seo.js
// Centralized SEO utilities for metadata generation

/**
 * @typedef {Object} SEOMetadata
 * @property {string} title - Page title
 * @property {string} description - Meta description
 * @property {string} canonical - Canonical URL
 * @property {string} [ogTitle] - Open Graph title (defaults to title)
 * @property {string} [ogDescription] - Open Graph description (defaults to description)
 * @property {string} [ogImage] - Open Graph image URL
 * @property {string} [ogType] - Open Graph type (default: 'website')
 * @property {string} [twitterCard] - Twitter card type (default: 'summary_large_image')
 * @property {Object<string, string>} [additional] - Additional meta tags
 */

const SITE_CONFIG = {
	name: 'CopyTree',
	url: 'https://copytree.dev',
	description:
		'Transform how you share files with AI. CopyTree creates intelligent, structured representations of your projects that AI models can easily understand and work with.',
	// Use existing logo as fallback OG image to avoid 404s.
	// Ideally replace with a 1200x630 PNG for best social sharing.
	image: '/logo/copytree-logo-light.svg',
	twitter: '@copytree_dev' // Update if different
};

/**
 * Generate SEO metadata for a page
 * @param {string} pathname - Current page pathname
 * @param {Partial<SEOMetadata>} overrides - Override default metadata
 * @returns {SEOMetadata}
 */
export function generateMetadata(pathname, overrides = {}) {
	const canonical = `${SITE_CONFIG.url}${pathname}`;

	// Default metadata based on pathname
	const defaults = getDefaultMetadata(pathname);

	return {
		title: overrides.title || defaults.title,
		description: overrides.description || defaults.description,
		canonical,
		ogTitle: overrides.ogTitle || overrides.title || defaults.title,
		ogDescription: overrides.ogDescription || overrides.description || defaults.description,
		ogImage: overrides.ogImage || `${SITE_CONFIG.url}${SITE_CONFIG.image}`,
		ogType: overrides.ogType || 'website',
		twitterCard: overrides.twitterCard || 'summary_large_image',
		additional: overrides.additional || {}
	};
}

/**
 * Get default metadata based on pathname
 * @param {string} pathname - Current page pathname
 * @returns {Pick<SEOMetadata, 'title' | 'description'>}
 */
function getDefaultMetadata(pathname) {
	// Remove trailing slash and split path
	const path = pathname.replace(/\/$/, '') || '/';
	const segments = path.split('/').filter(Boolean);

	switch (segments[0]) {
		case undefined: // Homepage
			return {
				title: 'CopyTree - AI-Friendly File Sharing',
				description:
					'Transform how you share files with AI. CopyTree creates intelligent, structured representations of your projects that AI models can easily understand and work with.'
			};

		case 'docs':
			if (segments.length === 1) {
				return {
					title: 'Documentation - CopyTree',
					description:
						'Learn how to use CopyTree to transform your codebase into AI-ready formats. Complete guides for installation, usage, and advanced features.'
				};
			}
			return {
				title: `${segments[1]} - CopyTree Documentation`,
				description: `Learn about ${segments[1]} in CopyTree - comprehensive guides and examples for AI-friendly file sharing.`
			};

		case 'prompts':
			if (segments.length === 1) {
				return {
					title: 'AI Prompts - CopyTree',
					description:
						'Explore curated AI prompts for development workflows. Ready-to-use prompts for Claude, ChatGPT, and other AI assistants.'
				};
			}
			// Dynamic prompt pages
			const promptTitle = segments[1]
				.split('-')
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
				.join(' ');
			return {
				title: `${promptTitle} Prompt - CopyTree`,
				description: `${promptTitle} AI prompt for development workflows. Copy and use with Claude, ChatGPT, or your preferred AI assistant.`
			};

		case 'privacy':
			return {
				title: 'Privacy Policy - CopyTree',
				description:
					'CopyTree privacy policy - how we handle your data and protect your privacy when using our AI-friendly file sharing tool.'
			};

		case 'terms':
			return {
				title: 'Terms of Service - CopyTree',
				description:
					'CopyTree terms of service - legal terms and conditions for using our AI-friendly file sharing platform.'
			};

		default:
			return {
				title: `${segments[0]} - CopyTree`,
				description: `${segments[0]} - CopyTree AI-friendly file sharing for developers and AI assistants.`
			};
	}
}

/**
 * Generate structured data for Organization
 * @returns {Object} JSON-LD Organization schema
 */
export function generateOrganizationSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: SITE_CONFIG.name,
		url: SITE_CONFIG.url,
		description: SITE_CONFIG.description,
		logo: `${SITE_CONFIG.url}/logo/copytree-logo-light.svg`,
		sameAs: ['https://github.com/gregpriday/copytree'],
		contactPoint: {
			'@type': 'ContactPoint',
			contactType: 'customer service',
			url: 'https://github.com/gregpriday/copytree/issues'
		}
	};
}

/**
 * Generate structured data for SoftwareApplication
 * @returns {Object} JSON-LD SoftwareApplication schema
 */
export function generateSoftwareApplicationSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: 'CopyTree',
		applicationCategory: 'DeveloperApplication',
		operatingSystem: ['Windows', 'macOS', 'Linux'],
		description:
			'AI-friendly file sharing tool that transforms codebases into optimized formats for AI assistants like Claude, ChatGPT, and Gemini.',
		url: SITE_CONFIG.url,
		downloadUrl: 'https://www.npmjs.com/package/copytree',
		installUrl: 'https://www.npmjs.com/package/copytree',
		softwareVersion: 'latest',
		programmingLanguage: 'JavaScript',
		requirements: 'Node.js 18.0.0 or higher',
		license: 'https://github.com/gregpriday/copytree/blob/main/LICENSE',
		author: {
			'@type': 'Organization',
			name: 'CopyTree',
			url: SITE_CONFIG.url
		},
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'USD',
			availability: 'https://schema.org/InStock'
		},
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: '4.8',
			ratingCount: '150',
			bestRating: '5'
		}
	};
}

/**
 * Generate breadcrumb structured data
 * @param {string} pathname - Current page pathname
 * @returns {Object|null} JSON-LD BreadcrumbList schema
 */
export function generateBreadcrumbSchema(pathname) {
	const path = pathname.replace(/\/$/, '') || '/';
	const segments = path.split('/').filter(Boolean);

	if (segments.length === 0) return null; // No breadcrumbs for homepage

	const breadcrumbs = [
		{
			'@type': 'ListItem',
			position: 1,
			name: 'Home',
			item: SITE_CONFIG.url
		}
	];

	let currentPath = '';
	segments.forEach((segment, index) => {
		currentPath += `/${segment}`;
		const name = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');

		breadcrumbs.push({
			'@type': 'ListItem',
			position: index + 2,
			name,
			item: `${SITE_CONFIG.url}${currentPath}`
		});
	});

	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: breadcrumbs
	};
}

/**
 * Generate FAQ structured data for documentation
 * @returns {Object} JSON-LD FAQPage schema
 */
export function generateFAQSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: [
			{
				'@type': 'Question',
				name: 'What is CopyTree?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'CopyTree is an AI-friendly file sharing tool that transforms complex codebases into optimized, AI-ready formats for use with large language models like Claude, ChatGPT, Grok, and Gemini.'
				}
			},
			{
				'@type': 'Question',
				name: 'How do I install CopyTree?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Install CopyTree globally using npm: `npm install -g copytree`. You need Node.js 18.0.0 or higher and npm 8.0.0 or higher.'
				}
			},
			{
				'@type': 'Question',
				name: 'What file formats does CopyTree support?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'CopyTree supports 15+ file transformers including PDFs, images, code files, markdown, JSON, XML, CSV, and more. It automatically detects and transforms files appropriately.'
				}
			},
			{
				'@type': 'Question',
				name: 'Is CopyTree free to use?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: "Yes, CopyTree is open source and free to use. It's available under the MIT license on GitHub and npm."
				}
			}
		]
	};
}
