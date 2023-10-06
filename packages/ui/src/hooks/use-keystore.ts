import { useMemo } from 'react'

import type { Keystore } from '../store/types'
import { useSharedStore } from './use-store'

export const useKeystore = (): Keystore | null => {
	const { keystores, selectedKeystoreId } = useSharedStore(state => ({
		keystores: state.keystores,
		selectedKeystoreId: state.selectedKeystoreId,
	}))

	return useMemo(
		() => keystores.find(keystore => keystore.id === selectedKeystoreId) || null,
		[selectedKeystoreId, keystores],
	)
}
