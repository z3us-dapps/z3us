import { config } from '@src/config'

let creating // A global promise to avoid concurrency issues

async function setupOffscreenDocument(path) {
	const offscreenUrl = globalThis.chrome.runtime.getURL(path)
	const existingContexts = await globalThis.chrome.runtime.getContexts({
		contextTypes: [chrome.runtime.ContextType.OFFSCREEN_DOCUMENT],
		documentUrls: [offscreenUrl],
	})
	if (existingContexts.length > 0) {
		return
	}

	// create offscreen document
	if (creating) {
		await creating
	} else {
		creating = globalThis.chrome.offscreen.createDocument({
			url: path,
			reasons: [chrome.offscreen.Reason.WEB_RTC],
			justification: 'Keep WebRTC connection with mobile wallet',
		})
		await creating
		creating = null
	}
}

export const createOffscreen = async () => {
	if (!APP_RADIX) return
	if (!globalThis.chrome?.offscreen) return

	await setupOffscreenDocument(config.offscreen.url)
}
