import browser, { Windows } from 'webextension-polyfill'

const NOTIFICATION_HEIGHT = 620
const NOTIFICATION_WIDTH = 360

export class BrowserService {
	private browser: typeof browser

	private currentPopupId: number | null

	constructor(b = browser) {
		this.browser = b
		this.currentPopupId = null
	}

	getCurrentTab = async () => {
		const queryOptions = { active: true, currentWindow: true }
		const [tab] = await this.browser.tabs.query(queryOptions)
		return tab
	}

	openWindow = async (createData: Windows.CreateCreateDataType): Promise<Windows.Window> =>
		this.browser.windows.create(createData)

	updateWindowPosition = async (windowId, options) => this.browser.windows.update(windowId, options)

	getLastFocusedWindow = async () => this.browser.windows.getLastFocused()

	getAllWindows = async () => this.browser.windows.getAll()

	closeCurrentPopup = async () => {
		const windows = await this.getAllWindows()
		const popup = windows ? windows.find(w => w && w.type === 'popup' && w.id === this.currentPopupId) : null
		if (popup) {
			this.browser.windows.remove(popup.id)
			this.currentPopupId = null
		}
	}

	showPopup = async (path: string = '/notification') => {
		await this.closeCurrentPopup()

		let left = 0
		let top = 0
		try {
			const lastFocused = await this.getLastFocusedWindow()
			top = lastFocused.top
			left = lastFocused.left + (lastFocused.width - NOTIFICATION_WIDTH)
		} catch (_) {
			const { screenX, screenY, outerWidth } = window
			top = Math.max(screenY, 0)
			left = Math.max(screenX + (outerWidth - NOTIFICATION_WIDTH), 0)
		}

		const popupWindow = await this.openWindow({
			url: browser.runtime.getURL(`index.html#${path}`),
			type: 'popup',
			width: NOTIFICATION_WIDTH,
			height: NOTIFICATION_HEIGHT,
			left,
			top,
		})
		this.currentPopupId = popupWindow.id

		if (popupWindow.left !== left && popupWindow.state !== 'fullscreen') {
			await this.updateWindowPosition(popupWindow.id, { left, top })
		}
	}
}
