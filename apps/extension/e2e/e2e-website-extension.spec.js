const { bootstrap } = require('./bootstrap')

const DELAY = 1000

describe('test text replacer extension with react app', () => {
	let extPage, appPage, browser

	beforeAll(async () => {
		const context = await bootstrap({ appUrl: 'http://localhost:4000/', slowMo: 50, devtools: true })

		extPage = context.extPage
		appPage = context.appPage
		browser = context.browser
	})

	it('should render Z3US home page and browser extenstion as expected', async () => {
		// User opens Z3US.com running on (http://localhost:4000/)
		appPage.bringToFront()

		// When extension loads `Pill` component is expected to say `BETA F`
		const websitePill = await appPage.$('[data-test-e2e="pill"]')
		await websitePill.type('BETA')

		// User clicks the Z3US browser extension
		await extPage.bringToFront()

		// When extension loads `Pill` component is expected to say `BETA`
		const extOnBoardingPill = await extPage.$('[data-test-e2e="pill"]')
		await extOnBoardingPill.type('BETA')
	})

	it('should be able to create new wallet', async () => {
		// User opens Z3US.com running on (http://localhost:4000/)
		appPage.bringToFront()

		// User clicks the Z3US browser extension
		await extPage.bringToFront()

		// When user clicks create new wallet
		const createNewWalletBtn = await extPage.$('[data-test-e2e="create-new-wallet"]')
		await createNewWalletBtn.click()
		await extPage.waitForTimeout(DELAY)

		const mnemonicWordsWrapper = await extPage.$('[data-test-e2e="create-new-wallet-mnemonic"]')
		const mnemonicWords = await mnemonicWordsWrapper.evaluate(e => e.innerText)
		// expect 24 words in the mnemonic box
		expect(mnemonicWords.match(/(\w+)/g).length).toEqual(24)

		// When user clicks the `Save` button
		const savedMnemonicBtn = await extPage.$('[data-test-e2e="create-new-wallet-save-btn"]')
		await savedMnemonicBtn.click()
		await extPage.waitForTimeout(DELAY)

		// User enters first matching password for `create wallet`
		await extPage.waitForSelector('[data-test-e2e="wallet-confirm-password-one"]')
		await extPage.type('[data-test-e2e="wallet-confirm-password-one"]', 'password')

		// User enters second matching password for `create wallet`
		await extPage.waitForSelector('[data-test-e2e="wallet-confirm-password-two"]')
		await extPage.type('[data-test-e2e="wallet-confirm-password-two"]', 'password')

		await extPage.waitForTimeout(DELAY)

		// user clicks `save` password
		const saveBtn = await extPage.$('[data-test-e2e="save-wallet-password-btn"]')
		await saveBtn.click()
		await extPage.waitForTimeout(DELAY)

		// user clicks `go to wallet`
		const goToWalletBtn = await extPage.$('[data-test-e2e="go-to-wallet-btn"]')
		await goToWalletBtn.click()

		// If wallet creation is successful we will see the `account total` card
		await extPage.waitForSelector('[data-test-e2e="accounts-total-card"]', { timeout: 3000 }).catch(error => {
			throw new Error('The accounts total card did not show as expected .', error)
		})
	})

	afterAll(async () => {
		await browser.close()
	})
})
