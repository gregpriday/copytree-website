import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');
const templatePath = path.resolve(projectRoot, 'tools/og/template.html');
const outputPath = path.resolve(projectRoot, 'static/og-image.png');

async function generate() {
	const browser = await chromium.launch();
	const page = await browser.newPage({ viewport: { width: 1200, height: 630, deviceScaleFactor: 1 } });
	const fileUrl = pathToFileURL(templatePath).toString();
	await page.goto(fileUrl, { waitUntil: 'networkidle' });

	await page.evaluate(async () => {
		if (document.fonts && document.fonts.ready) {
			try {
				await document.fonts.ready;
			} catch (error) {
				console.warn('Font loading warning:', error);
			}
		}
	});
	await page.waitForTimeout(250);

	await mkdir(path.dirname(outputPath), { recursive: true });
	await page.screenshot({ path: outputPath, type: 'png' });

	await browser.close();
	console.log(`OG image generated at ${outputPath}`);
}

generate().catch((error) => {
	console.error('Failed to generate OG image:', error);
	process.exitCode = 1;
});
