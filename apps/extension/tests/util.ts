/* eslint-disable */
import { join } from 'path'
import { ChromiumBrowserContext, chromium } from 'playwright'

export const EXTENSION_PATH = join(__dirname, '../dist/chrome')

export const isExtensionURL = (url: string) => url.startsWith('chrome-extension://')

export const closePages = async (browserContext: ChromiumBrowserContext) => {
	const pages = (await browserContext?.pages()) || []
	for (const page of pages) {
		const url = await page.url()
		if (!isExtensionURL(url)) {
			await page.close()
		}
	}
}

export const initBrowserWithExtension = async () => {
	const userDataDir = `/tmp/z3us-test-data-${Math.random()}`
	const browserContext = (await chromium.launchPersistentContext(userDataDir, {
		headless: false,
		args: [
			'--disable-dev-shm-usage',
			'--ipc=host',
			`--disable-extensions-except=${EXTENSION_PATH}`,
			`--load-extension=${EXTENSION_PATH}`,
		],
	})) as ChromiumBrowserContext
	let page = await browserContext.pages()[0]
	await page.bringToFront()
	await page.goto('chrome://inspect/#extensions')
	await page.goto('chrome://inspect/#service-workers')
	const url = await page.locator('#service-workers-list div[class="url"]').textContent()
	const [, , extensionId] = url.split('/')
	const extensionURL = `chrome-extension://${extensionId}/popup-theme-light.html`
	await page.waitForTimeout(500)
	const pages = browserContext.pages()
	page = pages.find(x => x.url() === extensionURL)
	if (!page) {
		page = pages[0]
	}

	return { browserContext, extensionURL, page }
}

export const openPages = async (browserContext: ChromiumBrowserContext, urls: string[]) => {
	return await Promise.all(
		urls.map(async url => {
			const newPage = await browserContext.newPage()
			await newPage.goto(url)
			await newPage.waitForLoadState('load')
		}),
	)
}
