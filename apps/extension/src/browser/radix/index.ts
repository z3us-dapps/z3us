import { getNoneSharedStore } from 'packages/ui/src/services/state'
import { sharedStore } from 'packages/ui/src/store'

export const isConnectorEnabled = async (): Promise<boolean> => {
	await sharedStore.persist.rehydrate()
	const sharedState = sharedStore.getState()

	const keystore = sharedState.keystores.find(k => k.id === sharedState.selectedKeystoreId)
	if (!keystore) return false

	const noneSharedStore = await getNoneSharedStore(keystore.id)
	await noneSharedStore.persist.rehydrate()

	const noneSharedState = noneSharedStore.getState()
	return noneSharedState.radixConnectorEnabled || false
}
