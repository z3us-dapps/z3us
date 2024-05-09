import React, { Suspense, useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { defineMessages, useIntl } from 'react-intl'
import { Outlet, useLocation } from 'react-router-dom'
import type { Management } from 'webextension-polyfill'
import browser from 'webextension-polyfill'

import { Box } from 'ui/src/components/box'
import { DialogAlert } from 'ui/src/components/dialog-alert'
import { FallbackLoading, FallbackRenderer } from 'ui/src/components/fallback-renderer'
import { Toasts } from 'ui/src/components/toasts'
import { Text } from 'ui/src/components/typography'
import { useModals } from 'ui/src/hooks/use-modals'
import { useSharedStore } from 'ui/src/hooks/use-store'

import { openTabWithURL } from '@src/browser/tabs'
import { config } from '@src/config'
import { useIsUnlocked } from '@src/hooks/use-is-unlocked'
import { getTheme } from '@src/styles/theme'

import Unlock from './unlock'

const popupUrl = browser.runtime.getURL('')

const messages = defineMessages({
	title: {
		id: 'gRjgWW',
		defaultMessage: 'Radix Connector Extension detected',
	},
	description: {
		id: '/APLYY',
		defaultMessage:
			'If you wish to use Z3US with the Radix connect button, please disable the Radix Connector Extension. Having both enabled at the same time will cause issues with Dapp interactions.',
	},
	button_text: {
		id: 'jwimQJ',
		defaultMessage: 'Ok',
	},
	cancel_button_text: {
		id: 'rbrahO',
		defaultMessage: 'Close',
	},
})

const radixConnectorExtensionId = 'bfeplaecgkoeckiidkgkmlllfbaeplgm'

const Layout: React.FC = () => {
	const intl = useIntl()
	const { modals } = useModals()
	const location = useLocation()
	const { isUnlocked, isLoading, reload } = useIsUnlocked()

	const { keystoreId } = useSharedStore(state => ({
		keystoreId: state.selectedKeystoreId,
	}))

	const [hasConnector, setHasConnector] = useState<boolean>(false)

	useEffect(() => {
		const rootElement = document.getElementById('root')
		if (rootElement) {
			rootElement.classList.add('z3-extension-mounted')
		}
	}, [])

	useEffect(() => {
		browser.management.get(radixConnectorExtensionId).then((result: Management.ExtensionInfo) => {
			setHasConnector(result.enabled)
		})
	}, [])

	useEffect(() => {
		if (isLoading || isUnlocked || location.pathname.startsWith('/keystore/new')) return
		if (!keystoreId) {
			getTheme().then(theme => {
				const newKeystoreUrl = `${popupUrl}${config.popup.dir}/${theme}.html#/keystore/new`
				openTabWithURL(newKeystoreUrl).then(() => window.close())
			})
		}
	}, [keystoreId, isLoading, isUnlocked, location.pathname])

	if (!location.pathname.startsWith('/keystore/new')) {
		if (!(isLoading || !keystoreId) && !isUnlocked) return <Unlock onUnlock={reload} />
	}

	const handleConfirm = () => {
		setHasConnector(false)
	}

	return (
		<>
			<DialogAlert
				open={hasConnector}
				title={intl.formatMessage(messages.title)}
				description={
					<Box component="span">
						<Text>{intl.formatMessage(messages.description)}</Text>
					</Box>
				}
				confirmButtonText={intl.formatMessage(messages.button_text)}
				cancelButtonText={intl.formatMessage(messages.cancel_button_text)}
				onConfirm={handleConfirm}
				onCancel={handleConfirm}
				confirmButtonStyleVariant="primary"
			/>
			<Suspense fallback={<FallbackLoading />}>
				<ErrorBoundary fallbackRender={FallbackRenderer}>
					<Outlet />
				</ErrorBoundary>
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
