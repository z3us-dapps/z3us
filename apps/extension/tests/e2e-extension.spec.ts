import { Page, ChromiumBrowserContext } from 'playwright'
import { CLOSE_PAGES, initBrowserWithExtension } from './util'

let page: Page
let browserContext: ChromiumBrowserContext
let extensionURL: string

describe('The Extension page should', () => {
	beforeAll(async () => {
		const init = await initBrowserWithExtension()
		browserContext = init.browserContext
		extensionURL = init.extensionURL
		page = init.page
	})

	afterAll(async () => {
		await browserContext?.close()
		browserContext = null
		page = null
		extensionURL = ''
	})

	beforeEach(async () => {
		if (!extensionURL) {
			// eslint-disable-next-line no-console
			console.error('Invalid extensionURL', { extensionURL })
		}
		await page.bringToFront()
		await page.goto(extensionURL)
		await page.waitForTimeout(1000)
		await CLOSE_PAGES(browserContext)
	})

	afterEach(async () => {
		await CLOSE_PAGES(browserContext)
	})

	it('see the Z3US onboading ui', async () => {
		const pillSelector = '[data-test-e2e="pill"]'
		const onboardingPill = await page.$$(pillSelector)
		expect(onboardingPill).toHaveLength(1)
	})
})
