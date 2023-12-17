import browser from 'webextension-polyfill'

import { getNoneSharedStore } from 'ui/src/services/state'
import { sharedStore } from 'ui/src/store'
import { KeystoreType } from 'ui/src/store/types'

const popupURL = new URL(browser.runtime.getURL(''))

export const isHandledByRadix = async (): Promise<boolean> => {
	// We do not rehydrate here as it makes page reload and forms are loosing loading state
	// await sharedStore.persist.rehydrate()
	const sharedState = sharedStore.getState()

	const keystore = sharedState.keystores.find(k => k.id === sharedState.selectedKeystoreId)
	if (!keystore) return false
	if (keystore.type !== KeystoreType.RADIX_WALLET) return false

	const noneSharedStore = await getNoneSharedStore(keystore.id)
	await noneSharedStore.persist.rehydrate()

	const noneSharedState = noneSharedStore.getState()
	return noneSharedState.radixConnectorEnabled || new URL(window.location.href).hostname === popupURL.hostname
}
