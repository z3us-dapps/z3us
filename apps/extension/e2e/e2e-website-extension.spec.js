const { bootstrap } = require('./bootstrap')

describe('test text replacer extension with react app', () => {
	let extPage, appPage, browser

	beforeAll(async () => {
		const context = await bootstrap({ appUrl: 'http://localhost:4000/', slowMo: 50, devtools: true })

		extPage = context.extPage
		appPage = context.appPage
		browser = context.browser
	})

	it('should render Z3US home page and browser extenstion as expected', async () => {
		// When a user opens Z3US.com running on (http://localhost:4000/)
		appPage.bringToFront()

		// When extension loads `Pill` component is expected to say `BETA F`
		const websitePill = await appPage.$('[data-test-e2e="pill"]')
		await websitePill.type('BETA')

		// 3. When the user goes to the chrome extension
		await extPage.bringToFront()

		// When extension loads `Pill` component is expected to say `BETA`
		const extOnBoardingPill = await extPage.$('[data-test-e2e="pill"]')
		await extOnBoardingPill.type('BETA')
	})

	afterAll(async () => {
		await browser.close()
	})
})
