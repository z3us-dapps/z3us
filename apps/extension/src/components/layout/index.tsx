import React, { Suspense, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useLocation, useOutlet } from 'react-router-dom'
import browser from 'webextension-polyfill'

import { FallbackLoading, FallbackRenderer } from 'ui/src/components/fallback-renderer'
import { useSharedStore } from 'ui/src/hooks/use-store'

import { openTabWithURL } from '@src/browser/tabs'
import { config } from '@src/config'
import { useIsUnlocked } from '@src/hooks/use-is-unlocked'
import { getTheme } from '@src/styles/theme'

import Unlock from './unlock'

const Layout: React.FC = () => {
	const location = useLocation()
	const outlet = useOutlet()
	const { isUnlocked, isLoading, reload } = useIsUnlocked()

	const { selectedKeystoreId } = useSharedStore(state => ({
		selectedKeystoreId: state.selectedKeystoreId,
	}))

	useEffect(() => {
		if (isLoading) return
		if (isUnlocked) return
		if (location.pathname.startsWith('/keystore/new')) return
		if (!selectedKeystoreId) {
			getTheme().then(theme => {
				openTabWithURL(`${browser.runtime.getURL('')}${config.popup.dir}/${theme}.html#/keystore/new`).then(() =>
					window.close(),
				)
			})
		}
	}, [selectedKeystoreId, isLoading, isUnlocked, location.pathname])

	if (!location.pathname.startsWith('/keystore/new')) {
		if (isLoading || !selectedKeystoreId) return <FallbackLoading />
		if (!isUnlocked) return <Unlock onUnlock={reload} />
	}

	return (
		<Suspense fallback={<FallbackLoading />}>
			<ErrorBoundary fallbackRender={FallbackRenderer}>{outlet}</ErrorBoundary>
		</Suspense>
	)
}

export default Layout
