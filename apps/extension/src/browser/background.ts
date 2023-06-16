import '@src/helpers/polyfills'
import '@src/browser/background/index'

declare global {
	const APP_DEV_TOOLS: string
	const APP_RADIX: string
}

export {}
