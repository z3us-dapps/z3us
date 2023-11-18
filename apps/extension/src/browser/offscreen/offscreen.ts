import { createOffscreen as createRadixOffscreen } from '@radixdlt/connector-extension/src/chrome/offscreen/create-offscreen'

export const createOffscreen = () => {
	if (!APP_RADIX) return
	if (!globalThis.chrome?.offscreen) return

	createRadixOffscreen()
}
