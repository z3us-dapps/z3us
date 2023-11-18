import React, { Suspense, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useOutlet } from 'react-router-dom'

import { FallbackLoading, FallbackRenderer } from 'ui/src/components/fallback-renderer'
import { Toasts } from 'ui/src/components/toasts'
import { useModals } from 'ui/src/hooks/use-modals'
import { useSharedStore } from 'ui/src/hooks/use-store'
import { KeystoreType } from 'ui/src/store/types'

export const defaultKeystore = { id: 'default', name: 'Default', type: KeystoreType.RADIX_WALLET }

const Layout: React.FC = () => {
	const { modals } = useModals()
	const outlet = useOutlet()
	const { selectedKeystoreId, addKeystore } = useSharedStore(state => ({
		selectedKeystoreId: state.selectedKeystoreId,
		addKeystore: state.addKeystoreAction,
	}))

	useEffect(() => {
		if (!selectedKeystoreId) addKeystore(defaultKeystore.id, defaultKeystore.name, defaultKeystore.type)
	}, [selectedKeystoreId])

	return (
		<>
			<Suspense fallback={<FallbackLoading />}>
				<ErrorBoundary fallbackRender={FallbackRenderer}>{outlet}</ErrorBoundary>
			</Suspense>
			{Object.keys(modals).map(id => (
				<Suspense key={id} fallback={<FallbackLoading />}>
					<ErrorBoundary fallbackRender={FallbackRenderer}>{modals[id]}</ErrorBoundary>
				</Suspense>
			))}
			<Toasts />
		</>
	)
}

export default Layout
