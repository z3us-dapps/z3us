import type { WalletInteraction, WalletInteractionWithOrigin } from '@radixdlt/radix-connect-schemas'
import browser from 'webextension-polyfill'

import { DAPP_ORIGIN } from 'ui/src/constants/dapp'

const popupURL = new URL(browser.runtime.getURL(''))

export const addOriginToWalletInteraction = (message: WalletInteraction): WalletInteractionWithOrigin => ({
	...message,
	metadata: {
		...((message.metadata || {}) as WalletInteraction['metadata']),
		origin: window.location.origin === popupURL.origin ? DAPP_ORIGIN : window.location.origin,
	},
})
