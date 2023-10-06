import dotenv from 'dotenv'
import path from 'path'
import type { ChromiumBrowserContext, Page } from 'playwright'

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

	// eslint-disable-next-line
	it.skip('should be able to send tokens (if phrase present in environment)', async () => {
		const PHRASE = process.env.TEST_TRANSFER_PHRASE
		const hasTestPhrase = !!PHRASE

		expect(hasTestPhrase).toBeTruthy()

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
		await seedPhaseInput.fill(PHRASE)

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

		// user clicks last account button (1)
		const lastBreadcrumbBtnSelector = '[data-test-e2e="account-breadcrumb-last-btn"]'
		const lastBreadcrumbBtn = await page.$(lastBreadcrumbBtnSelector)
		await lastBreadcrumbBtn.click()
		await page.waitForTimeout(DELAY)

		// user clicks last account button (1)
		const newAccountBtnSelector = '[data-test-e2e="account-add-new-account"]'
		const newAccountBtn = await page.$(newAccountBtnSelector)
		await newAccountBtn.click()
		await page.waitForTimeout(DELAY)

		// user clicks last account button (2)
		await lastBreadcrumbBtn.click()
		await page.waitForTimeout(DELAY)
		await newAccountBtn.click()

		// user clicks the first account breadcrumb
		const accountBreadcrumbBtnsSelector = '[data-test-e2e="account-breadcrumb"] button >> nth=1'
		const accountBreadcrumbBtnFirst = await page.$(accountBreadcrumbBtnsSelector)
		expect(accountBreadcrumbBtnFirst.isVisible()).toBeTruthy()
		await accountBreadcrumbBtnFirst.click()
		await page.waitForTimeout(DELAY)

		// user clicks the send account button
		const accountSendBtnSelector = '[data-test-e2e="account-send-btn"]'
		const accountSendBtn = await page.$(accountSendBtnSelector)
		await accountSendBtn.click()
		await page.waitForTimeout(DELAY)

		// user enters amount to send
		const inputAmountSelector = '[data-test-e2e="accounts-send-input-amount"]'
		const inputAmount = await page.$(inputAmountSelector)
		await inputAmount.fill('0.00000001')
		await page.waitForTimeout(DELAY)

		// user clicks select account
		const selectAccountSelector = '[data-test-e2e="accounts-send-select-dropdown"]'
		const selectAccount = await page.$(selectAccountSelector)
		await selectAccount.click()
		await page.waitForTimeout(DELAY)
		await page.keyboard.press('Enter')
		await page.waitForTimeout(DELAY)

		// user enters amount to send
		const inputTransactionMessageSelector = '[data-test-e2e="accounts-send-transaction-message"]'
		const inputTransactionMessage = await page.$(inputTransactionMessageSelector)
		await inputTransactionMessage.fill((Math.random() + 1).toString(36).substring(7))
		await page.waitForTimeout(DELAY)

		// user clicks review send
		const reviewTransactionBtnSelector = '[data-test-e2e="accounts-send-review-btn"]'
		const reviewTransactionBtn = await page.$(reviewTransactionBtnSelector)
		await reviewTransactionBtn.click()
		await page.waitForTimeout(DELAY)

		// user clicks confirm send
		const confirmSendTransactionBtnSelector = '[data-test-e2e="accounts-send-confirm-btn"]'
		const confirmSendTransactionBtn = await page.$(confirmSendTransactionBtnSelector)
		await confirmSendTransactionBtn.click()
		await page.waitForTimeout(DELAY)
	})
})
