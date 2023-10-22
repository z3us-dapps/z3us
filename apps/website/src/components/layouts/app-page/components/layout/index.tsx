import type React from 'react'
import { useEffect } from 'react'
import { useOutlet } from 'react-router-dom'

import { useSharedStore } from 'ui/src/hooks/use-store'
import { KeystoreType } from 'ui/src/store/types'

export const defaultKeystore = { id: 'default', name: 'Default', type: KeystoreType.RADIX_WALLET }

const Layout: React.FC = () => {
	const outlet = useOutlet()
	const { selectedKeystoreId, addKeystore } = useSharedStore(state => ({
		selectedKeystoreId: state.selectedKeystoreId,
		addKeystore: state.addKeystoreAction,
	}))

	useEffect(() => {
		if (!selectedKeystoreId) addKeystore(defaultKeystore.id, defaultKeystore.name, defaultKeystore.type)
	}, [selectedKeystoreId])

	return outlet
}

export default Layout
