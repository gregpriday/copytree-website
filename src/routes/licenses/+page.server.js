/**
 * License & Attribution loader (CopyTree project focus)
 * - Fetch package.json for the CopyTree project from the develop branch
 * - Combine dependencies and devDependencies into a single list
 * - Fetch license + homepage for each dependency from npm registry
 */
const COPYTREE_PKG_URL =
	'https://raw.githubusercontent.com/gregpriday/copytree/refs/heads/develop/package.json';

async function fetchCopyTreePackageJson() {
	const res = await fetch(COPYTREE_PKG_URL, { redirect: 'follow' });
	if (!res.ok) {
		throw new Error(`Failed to fetch CopyTree package.json: ${res.status} ${res.statusText}`);
	}
	return res.json();
}

async function getPackageDetails(packageName) {
	try {
		const response = await fetch(`https://registry.npmjs.org/${packageName}/latest`);
		if (!response.ok) throw new Error('Not found');
		const data = await response.json();
		return {
			name: data.name,
			version: data.version,
			license: data.license || 'N/A',
			url: data.homepage || `https://www.npmjs.com/package/${data.name}`
		};
	} catch (error) {
		console.warn(`Could not fetch details for ${packageName}: ${error.message}`);
		return {
			name: packageName,
			version: 'N/A',
			license: 'N/A',
			url: `https://www.npmjs.com/package/${packageName}`
		};
	}
}

export async function load() {
	// Load package.json for the CopyTree project (develop branch)
	const packageJson = await fetchCopyTreePackageJson();

	// Combine prod and dev dependencies into one attribution list
	const prodDeps = Object.keys(packageJson.dependencies || {});
	const devDeps = Object.keys(packageJson.devDependencies || {});
	const allNames = Array.from(new Set([...prodDeps, ...devDeps])).sort((a, b) =>
		a.localeCompare(b)
	);

	const resolved = await Promise.all(allNames.map((name) => getPackageDetails(name)));

	return {
		// Attribution list for the CopyTree project (combined + alphabetized)
		attributions: resolved,
		// Keep simple metadata about the upstream project
		project: {
			name: packageJson.name || 'copytree',
			version: packageJson.version || 'N/A',
			license: packageJson.license || 'MIT'
		}
	};
}