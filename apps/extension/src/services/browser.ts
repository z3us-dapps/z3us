import { popupHtmlMap } from '@src/config'
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

	checkForError = () => {
		const { lastError } = this.browser.runtime
		if (!lastError) {
			return undefined
		}
		return new Error(lastError.message)
	}

	openWindow = async (createData: Windows.CreateCreateDataType): Promise<Windows.Window> => {
		const window = this.browser.windows.create(createData)

		const error = this.checkForError()
		if (error) {
			throw error
		}

		return window
	}

	updateWindowPosition = async (windowId, options): Promise<Windows.Window> => {
		const window = this.browser.windows.update(windowId, options)

		const error = this.checkForError()
		if (error) {
			throw error
		}

		return window
	}

	getLastFocusedWindow = async (): Promise<Windows.Window> => {
		const window = this.browser.windows.getLastFocused()

		const error = this.checkForError()
		if (error) {
			throw error
		}

		return window
	}

	getAllWindows = async (): Promise<Windows.Window[]> => {
		const windows = this.browser.windows.getAll()

		const error = this.checkForError()
		if (error) {
			throw error
		}

		return windows
	}

	closeCurrentPopup = async () => {
		if (this.currentPopupId === null) {
			return
		}

		const windows = await this.getAllWindows()
		const popup = windows ? windows.find(w => w && w.type === 'popup' && w.id === this.currentPopupId) : null

		this.currentPopupId = null
		if (popup) {
			this.browser.windows.remove(popup.id)
			const error = this.checkForError()
			if (error) {
				throw error
			}
		}
	}

	showPopup = async (theme: string, path: string = '/notification') => {
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

		const popup = popupHtmlMap[theme]

		const popupWindow = await this.openWindow({
			url: browser.runtime.getURL(`${popup}#${path}`),
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
