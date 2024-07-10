import type {
	CancelWalletInteractionExtensionInteractionOptionalOrigin,
	WalletInteractionWithOptionalOrigin,
} from '@radixdlt/connector-extension/src/chrome/dapp/schemas'
import type { CancelWalletInteractionExtensionInteraction, WalletInteraction } from '@radixdlt/radix-dapp-toolkit'
import browser from 'webextension-polyfill'

import { DAPP_ORIGIN } from 'ui/src/constants/dapp'

const popupURL = new URL(browser.runtime.getURL(''))

export const addOriginToWalletInteraction = (
	message: WalletInteractionWithOptionalOrigin | WalletInteraction,
): WalletInteraction => ({
	...message,
	metadata: {
		...(message.metadata || {}),
		origin: window.location.origin === popupURL.origin ? DAPP_ORIGIN : window.location.origin,
		original_origin: window.location.origin,
	} as any,
})

export const addOriginToCancelInteraction = (
	interaction: CancelWalletInteractionExtensionInteractionOptionalOrigin | CancelWalletInteractionExtensionInteraction,
): CancelWalletInteractionExtensionInteraction => ({
	...interaction,
	metadata: {
		...(interaction.metadata || {}),
		origin: window.location.origin === popupURL.origin ? DAPP_ORIGIN : window.location.origin,
		original_origin: window.location.origin,
	} as any,
})
