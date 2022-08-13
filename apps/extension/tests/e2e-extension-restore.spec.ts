import { Buffer } from 'buffer'
import path from 'path'
import dotenv from 'dotenv'
import { Page, ChromiumBrowserContext } from 'playwright'
import { closePages, initBrowserWithExtension } from './util'

dotenv.config({ path: path.resolve(__dirname, '../../../', '.env') })

let page: Page
let browserContext: ChromiumBrowserContext
let extensionURL: string

const DELAY = 3000

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

	it('should be able to restore wallet from phrase', async () => {
		const PHRASE = Buffer.from(process.env.KEYSTORE_BASE64 || '', 'base64').toString('ascii')
		const PHRASETRIM = PHRASE.substring(0, PHRASE.length - 1) // remove final character whitespace
		const restoreWalletButtonSelector = '[data-test-e2e="restore-from-seed"]'
		const restoreWalletBtn = await page.$$(restoreWalletButtonSelector)
		expect(restoreWalletBtn).toHaveLength(1)

		// click `restore from seed button`
		const pageRestoreWalletBtn = await page.$(restoreWalletButtonSelector)
		await pageRestoreWalletBtn.click()
		await page.waitForTimeout(DELAY)

		// user enters seed phrase
		const seedPhraseInputSelector = '[data-test-e2e="secret-phrase-input"]'
		const seedPhaseInput = await page.$(seedPhraseInputSelector)
		await seedPhaseInput.fill(PHRASETRIM)

		// user clicks `import phrase`
		const importBtnSelector = '[data-test-e2e="secret-phrase-import"]'
		const importBtn = await page.$(importBtnSelector)
		await importBtn.click()
		await page.waitForTimeout(DELAY)

		// asset that import account button is visible
		const importAccountBtnSelector = '[data-test-e2e="import-accounts-btn"]'
		const importAccountBtn = await page.$$(importAccountBtnSelector)
		expect(importAccountBtn).toHaveLength(1)
	})
})
