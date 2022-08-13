import { Page, ChromiumBrowserContext } from 'playwright'
import { closePages, initBrowserWithExtension } from './util'

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
		const restoreWalletButtonSelector = '[data-test-e2e="restore-from-seed"]'
		const restoreWalletBtn = await page.$$(restoreWalletButtonSelector)
		expect(restoreWalletBtn).toHaveLength(1)

		// click `restore from seed button`
		const pageRestoreWalletBtn = await page.$(restoreWalletButtonSelector)
		await pageRestoreWalletBtn.click()
		await page.waitForTimeout(DELAY)

		// user enters seed phrase
		const SEED_PHRASE = 'phrase'
		const seedPhraseInputSelector = '[data-test-e2e="secret-phrase-input"]'
		const seedPhaseInput = await page.$(seedPhraseInputSelector)
		await seedPhaseInput.fill(SEED_PHRASE)

		// user clicks `import phrase`
		const importBtnSelector = '[data-test-e2e="secret-phrase-import"]'
		const importBtn = await page.$(importBtnSelector)
		await importBtn.click()
		await page.waitForTimeout(DELAY)
	})

	// @TODO: need to properly tear down after previous test to remove localstorag to get this test to work
	it.skip('should show error if user enters incorrect seed', async () => {
		const restoreWalletButtonSelector = '[data-test-e2e="restore-from-seed"]'
		const restoreWalletBtn = await page.$$(restoreWalletButtonSelector)
		expect(restoreWalletBtn).toHaveLength(1)

		// click `restore from seed button`
		const pageRestoreWalletBtn = await page.$(restoreWalletButtonSelector)
		await pageRestoreWalletBtn.click()
		await page.waitForTimeout(DELAY)

		// user enters invalid seed phrase
		const INVALID_SEED_PHRASE = 'invalid phrase'
		const seedPhraseInputSelector = '[data-test-e2e="secret-phrase-input"]'
		const seedPhaseInput = await page.$(seedPhraseInputSelector)
		await seedPhaseInput.fill(INVALID_SEED_PHRASE)

		// user clicks `import phrase`
		const importBtnSelector = '[data-test-e2e="secret-phrase-import"]'
		const importBtn = await page.$(importBtnSelector)
		await importBtn.click()
		await page.waitForTimeout(DELAY)

		// expect error to be visible // height of element indicates it `is` visible
		const inputErrorSelector = '[data-test-e2e="secret-phrase-import-error"]'
		const inputError = await page.$(inputErrorSelector)
		const inputErrorHeight = await inputError.evaluate(e => window.getComputedStyle(e).getPropertyValue('height'))
		expect(inputErrorHeight).toEqual('31px')
	})
})
