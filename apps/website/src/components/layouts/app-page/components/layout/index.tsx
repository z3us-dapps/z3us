import React, { Suspense, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useOutlet } from 'react-router-dom'

import { FallbackLoading, FallbackRenderer } from 'ui/src/components/fallback-renderer'
import { Toasts } from 'ui/src/components/toasts'
import { BalancesProvider } from 'ui/src/context/balances/provider'
import TokensProvider from 'ui/src/context/tokens/provider'
import { useModals } from 'ui/src/hooks/use-modals'
import { useSharedStore } from 'ui/src/hooks/use-store'
import type { Keystore } from 'ui/src/store/types'
import { KeystoreType } from 'ui/src/store/types'

export const defaultKeystore: Keystore = { id: 'default', name: 'Default', type: KeystoreType.RADIX_WALLET }

const Content: React.FC = () => {
	const { modals } = useModals()
	const outlet = useOutlet()
	const { selectedKeystoreId, addKeystore } = useSharedStore(state => ({
		selectedKeystoreId: state.selectedKeystoreId,
		addKeystore: state.addKeystoreAction,
	}))

	useEffect(() => {
		if (!selectedKeystoreId) addKeystore(defaultKeystore)
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

const Layout: React.FC = () => (
	<TokensProvider>
		<BalancesProvider>
			<Content />
		</BalancesProvider>
	</TokensProvider>
)

export default Layout
