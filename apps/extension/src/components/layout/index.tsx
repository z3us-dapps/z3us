import React, { Suspense, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useLocation, useOutlet } from 'react-router-dom'

import { FallbackLoading, FallbackRenderer } from 'ui/src/components/fallback-renderer'
import { useSharedStore } from 'ui/src/hooks/use-store'

import { useIsUnlocked } from '@src/hooks/use-is-unlocked'

import Unlock from './unlock'

const Layout: React.FC = () => {
	const location = useLocation()
	const outlet = useOutlet()
	const { isUnlocked, isLoading, reload } = useIsUnlocked()

	const { selectedKeystoreId } = useSharedStore(state => ({
		selectedKeystoreId: state.selectedKeystoreId,
	}))

	useEffect(() => {
		if (!isLoading && !selectedKeystoreId && !location.pathname.startsWith('/keystore/new')) {
			window.open(`${window.location.href}/keystore/new`, '_blank', 'noreferrer')
			window.close()
		}
	}, [selectedKeystoreId, isLoading])

	if (!location.pathname.startsWith('/keystore/new')) {
		if (isLoading) return <FallbackLoading />
		if (!isUnlocked) return <Unlock onUnlock={reload} />
	}

	return (
		<Suspense fallback={<FallbackLoading />}>
			<ErrorBoundary fallbackRender={FallbackRenderer}>{outlet}</ErrorBoundary>
		</Suspense>
	)
}

export default Layout
