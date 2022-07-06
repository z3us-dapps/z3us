import { Page, ChromiumBrowserContext } from 'playwright'
import { closePages, initBrowserWithExtension } from './util'

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
		await closePages(browserContext)
	})

	afterEach(async () => {
		await closePages(browserContext)
	})

	it('see the Z3US onboading ui with `BETA` pill', async () => {
		const pillSelector = '[data-test-e2e="pill"]'
		const extOnBoardingPill = await page.$$(pillSelector)
		expect(extOnBoardingPill).toHaveLength(1)
		const pillText = await page.$eval(pillSelector, el => el.innerHTML)
		expect(pillText).toEqual('BETA')
	})
})
