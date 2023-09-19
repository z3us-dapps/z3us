import { sharedStore } from 'ui/src/store'
import { KeystoreType } from 'ui/src/store/types'

export const isHandledByRadix = async (): Promise<boolean> => {
	await sharedStore.persist.rehydrate()
	const sharedState = sharedStore.getState()

	const keystore = sharedState.keystores.find(k => k.id === sharedState.selectedKeystoreId)
	if (!keystore) return false
	if (keystore.type !== KeystoreType.RADIX_WALLET) return false

	return true
}
