import { getExtensionOptions } from '@radixdlt/connector-extension/src/options'
import { logger as utilsLogger } from '@radixdlt/connector-extension/src/utils/logger'
import { ConnectorClient } from '@radixdlt/radix-connect-webrtc'
import React, { useEffect } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'
import browser from 'webextension-polyfill'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { ArrowLeftIcon } from 'ui/src/components/icons'
import { QrStyled } from 'ui/src/components/qr-styled'
import { Link, Text } from 'ui/src/components/typography'

import { config, radixConnectConfig } from '@src/config'
import { chromeLocalStore } from '@src/radix/storage-local'

import * as styles from '../styles.css'

const logger = utilsLogger.getSubLogger({ name: 'pairing' })

const messages = defineMessages({
	help_title: {
		id: '0StBkT',
		defaultMessage: 'Connect Radix mobile app',
	},
	help_sub_title: {
		id: 'nHaknJ',
		defaultMessage:
			'Scan the QR code with the Radix Wallet app on your mobile phone to start using it with dApps in this web browser',
	},
	link: {
		id: 'SbtqG3',
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
	const navigate = useNavigate()

	useEffect(() => {
		const connectorClient = ConnectorClient({
			source: 'extension',
			target: 'wallet',
			isInitiator: config.webRTC.isInitiator,
			logger,
		})

		const connect = () => {
			onPairingStateChange(PairingState.LOADING)
			return chromeLocalStore
				.getItem('connectionPassword')
				.andThen(({ connectionPassword: password }) => {
					if (password) {
						connectorClient.setConnectionPassword(Buffer.from(password, 'hex'))
						return chromeLocalStore.setItem({
							[PASSWORD_STORAGE_KEY]: password,
						})
					}
					connectorClient.connect()
					onPairingStateChange(PairingState.NOT_PAIRED)
					return connectorClient.generateConnectionPassword().andThen(buffer =>
						connectorClient.connected().andThen(() => {
							connectorClient.disconnect()
							return chromeLocalStore.setItem({
								[PASSWORD_STORAGE_KEY]: buffer.toString('hex'),
							})
						}),
					)
				})
				.map(() => onPairingStateChange(PairingState.PAIRED))
		}

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

		getExtensionOptions().map(options =>
			connectorClient.setConnectionConfig(radixConnectConfig[options.radixConnectConfiguration]),
		)

		connect()

		return () => {
			connectorClient.destroy()
			subscription.unsubscribe()
		}
	}, [onConnectionPasswordChange, onPairingStateChange])

	if (pairingState !== PairingState.NOT_PAIRED) return null

	return (
		<Box className={styles.pairingWrapper}>
			<Button onClick={() => navigate(-1)} styleVariant="ghost" sizeVariant="small" iconOnly>
				<ArrowLeftIcon />
			</Button>
			<Box className={styles.pairingTextWrapper}>
				<Text color="strong" size="xxlarge" weight="strong">
					{intl.formatMessage(messages.help_title)}
				</Text>
				<Text>{intl.formatMessage(messages.help_sub_title)}</Text>
			</Box>
			<Box className={styles.pairingQrWrapper}>
				<QrStyled value={connectionPassword} size={200} />
			</Box>
			<Box className={styles.pairingLinkWrapper}>
				<Link href="https://radixdlt.com" size="small" target="_blank">
					{intl.formatMessage(messages.link)}
				</Link>
			</Box>
		</Box>
	)
}
