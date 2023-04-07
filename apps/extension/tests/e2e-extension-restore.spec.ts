import { Buffer } from 'buffer'
import dotenv from 'dotenv'
import path from 'path'
import { ChromiumBrowserContext, Page } from 'playwright'

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
		const importPhraseBtn = await page.$(importBtnSelector)
		await importPhraseBtn.click()
		await page.waitForTimeout(DELAY)

		// assert that import account button is visible
		const importAccountBtnSelector = '[data-test-e2e="import-accounts-btn"]'
		const importAccountBtn = await page.$$(importAccountBtnSelector)
		expect(importAccountBtn).toHaveLength(1)

		// user clicks the first account
		const firstAccountSelector =
			'ul[data-test-e2e="import-account-list"] li button[data-test-e2e="import-account-checkbox"]'
		const firstAccount = await page.$(firstAccountSelector)
		await firstAccount.click()

		// user clicks `import phrase`
		const importBtn = await page.$(importAccountBtnSelector)
		await importBtn.click()
		await page.waitForTimeout(DELAY)

		// user enters password for wallet
		const PASSWORD = 'password'
		const passwordOneSelector = '[data-test-e2e="wallet-confirm-password-one"]'
		const passwordTwoSelector = '[data-test-e2e="wallet-confirm-password-two"]'
		const passwordOne = await page.$(passwordOneSelector)
		const passwordTwo = await page.$(passwordTwoSelector)
		await passwordOne.fill(PASSWORD)
		await passwordTwo.fill(PASSWORD)

		// user clicks `save` password
		const savePasswordBtnSelector = '[data-test-e2e="save-wallet-password-btn"]'
		const savePasswordBtn = await page.$(savePasswordBtnSelector)
		await savePasswordBtn.click()
		await page.waitForTimeout(DELAY)

		// user clicks `go to wallet`
		const goToWalletBtnSelector = '[data-test-e2e="go-to-wallet-btn"]'
		const goToWalletBtn = await page.$(goToWalletBtnSelector)
		await goToWalletBtn.click()
		await page.waitForTimeout(DELAY)

		// user enters wallet password for login prompt
		const walletPasswordInputSelector = '[data-test-e2e="wallet-password-input"]'
		const walletPasswordInput = await page.$(walletPasswordInputSelector)
		await walletPasswordInput.fill(PASSWORD)
		await page.waitForTimeout(DELAY)

		// user clicks unlock
		const unlockBtnSelector = '[data-test-e2e="wallet-unlock-btn"]'
		const unlockBtn = await page.$(unlockBtnSelector)
		await unlockBtn.click()
		await page.waitForTimeout(DELAY)

		const totalCardSelector = '[data-test-e2e="accounts-total-card"]'
		const totalCard = await page.$(totalCardSelector)
		expect(totalCard.isVisible()).toBeTruthy()
		await page.waitForTimeout(DELAY)
	})
})
