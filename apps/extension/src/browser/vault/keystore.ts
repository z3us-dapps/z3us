import { sharedStore } from 'packages/ui/src/store'
import type { Keystore } from 'packages/ui/src/store/types'

export const getSelectedKeystore = (): Keystore | null => {
	const { selectedKeystoreId, keystores } = sharedStore.getState()
	return keystores.find(({ id }) => id === selectedKeystoreId) || null
}
