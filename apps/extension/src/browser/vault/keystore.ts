import { sharedStore } from 'packages/ui/src/store'
import type { Keystore } from 'packages/ui/src/store/types'

export const getSelectedKeystore = async (): Promise<Keystore | null> => {
	await sharedStore.persist.rehydrate()
	const { selectedKeystoreId, keystores } = sharedStore.getState()
	return keystores.find(({ id }) => id === selectedKeystoreId) || null
}
