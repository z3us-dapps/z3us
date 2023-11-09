import dotenv from 'dotenv'
import path from 'path'
import type { ChromiumBrowserContext, Page } from 'playwright'

import { closePages, initBrowserWithExtension } from './util'

dotenv.config({ path: path.resolve(__dirname, '../../../', '.env') })

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
})
