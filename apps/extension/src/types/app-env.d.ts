import type { Browser } from 'webextension-polyfill'

declare global {
	interface Window {
		browser: Browser
	}
	const APP_DEV_TOOLS: string
	const APP_RADIX: string
}
