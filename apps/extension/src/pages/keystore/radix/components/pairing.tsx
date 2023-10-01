import { defaultConnectorExtensionOptions } from '@radixdlt/connector-extension/src/options'
import { ConnectorClient } from '@radixdlt/radix-connect-webrtc'
import { ResultAsync, ok } from 'neverthrow'
import { QRCodeSVG } from 'qrcode.react'
import React, { useEffect } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import browser from 'webextension-polyfill'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { Text } from 'ui/src/components/typography'
import { useTheme } from 'ui/src/hooks/use-theme'
import { Theme } from 'ui/src/types/types'

import {
	getConnectionPassword as getStorageConnectionPassword,
	setConnectionPassword as setStorageConnectionPassword,
} from '@src/browser/vault/storage'
import { config, radixConnectConfig } from '@src/config'

const messages = defineMessages({
	help: {
		id: 'keystore.radix.pairing.help',
		defaultMessage:
			'Scan the QR code with the Radix Wallet app on your mobile phone to start using it with dApps in this web browser',
	},
	link: {
		id: 'keystore.radix.pairing.link',
		defaultMessage: `Don't have Radix Wallet?`,
	},
})

interface IProps {
	pairingState: PairingState
	onPairingStateChange: (state: PairingState) => void
	connectionPassword: string
	onConnectionPasswordChange: (connectionPassword: string) => void
}

export enum PairingState {
	LOADING = 'loading',
	NOT_PAIRED = 'notPaired',
	PAIRED = 'paired',
}

export const PASSWORD_STORAGE_KEY = 'newConnectionPassword'

export const Pairing: React.FC<IProps> = ({
	connectionPassword,
	onConnectionPasswordChange,
	pairingState,
	onPairingStateChange,
}) => {
	const intl = useIntl()
	const { resolvedTheme } = useTheme()

	const handleOpenRadix = () => {
		window.open('https://radixdlt.com', '_blank', 'noreferrer')
	}

	useEffect(() => {
		const connectorClient = ConnectorClient({
			source: 'extension',
			target: 'wallet',
			isInitiator: config.webRTC.isInitiator,
		})

		const connect = () =>
			getStorageConnectionPassword().then(data => {
				const password = data[PASSWORD_STORAGE_KEY]
				if (password) {
					connectorClient.setConnectionPassword(Buffer.from(password, 'hex'))
					onPairingStateChange(PairingState.PAIRED)
					return ok(null)
				}
				connectorClient.connect()
				onPairingStateChange(PairingState.NOT_PAIRED)
				return connectorClient.generateConnectionPassword().andThen(buffer =>
					connectorClient
						.connected()
						.andThen(() => {
							connectorClient.disconnect()
							return ResultAsync.fromPromise(
								setStorageConnectionPassword(buffer.toString('hex')),
								error => error as Error,
							)
						})
						.map(() => onPairingStateChange(PairingState.PAIRED)),
				)
			})

		browser.storage.sync
			.get('options')
			.then(({ options }) => ({
				...defaultConnectorExtensionOptions,
				...options,
			}))
			.then(options => {
				connectorClient.setConnectionConfig(radixConnectConfig[options.radixConnectConfiguration])
			})

		browser.storage.onChanged.addListener((changes, area) => {
			if (changes.options) {
				if (changes.options.newValue.radixConnectConfiguration !== changes.options.oldValue.radixConnectConfiguration) {
					connectorClient.setConnectionConfig(radixConnectConfig[changes.options.newValue.radixConnectConfiguration])
				}
			}
			if (area === 'local' && changes[PASSWORD_STORAGE_KEY]) {
				const { newValue } = changes[PASSWORD_STORAGE_KEY]
				if (!newValue) connect()
			}
		})

		const subscription = connectorClient.connectionPassword$.subscribe(password => {
			onConnectionPasswordChange(password?.toString('hex'))
		})

		connect()

		return () => {
			connectorClient.destroy()
			subscription.unsubscribe()
		}
	}, [onConnectionPasswordChange, onPairingStateChange])

	if (pairingState !== PairingState.NOT_PAIRED) return null

	return (
		<Box display="flex" flexDirection="column">
			<Text>{intl.formatMessage(messages.help)}</Text>
			<Box display="flex" justifyContent="center">
				<QRCodeSVG
					value={connectionPassword}
					size={180}
					fgColor={resolvedTheme === Theme.DARK ? '#a6a6a6' : '#161718'}
					bgColor={resolvedTheme === Theme.DARK ? '#161718' : '#ffffff'}
				/>
			</Box>
			<Box display="flex" width="full">
				<Button styleVariant="ghost" onClick={handleOpenRadix}>
					{intl.formatMessage(messages.link)}
				</Button>
			</Box>
		</Box>
	)
}
