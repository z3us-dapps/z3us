import { ed25519 } from '@noble/curves/ed25519'
import { getLinkingSignatureMessage } from '@radixdlt/connector-extension/src/crypto/get-linking-message'
import type { LinkClientInteraction } from '@radixdlt/connector-extension/src/ledger/schemas'
import { useConnectionsClient } from '@radixdlt/connector-extension/src/pairing/state/connections'
import { useConnectorOptions } from '@radixdlt/connector-extension/src/pairing/state/options'
import { logger as utilsLogger } from '@radixdlt/connector-extension/src/utils/logger'
import { ConnectorClient } from '@radixdlt/radix-connect-webrtc'
import React, { useEffect, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'
import { Subscription, combineLatest, filter, map, switchMap, tap } from 'rxjs'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { ArrowLeftIcon } from 'ui/src/components/icons'
import { QrStyled } from 'ui/src/components/qr-styled'
import { Link } from 'ui/src/components/typography'

import { config, radixConnectConfig } from '@src/config'
import { chromeLocalStore } from '@src/radix/storage-local'

import { Title } from '../../components/title'
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
	onPair: (publicKey: string, isKnownConnection: boolean) => void
}

export const Pairing: React.FC<IProps> = ({ onPair }) => {
	const intl = useIntl()
	const navigate = useNavigate()

	const connectionsClient = useConnectionsClient()
	const connectorOptions = useConnectorOptions()

	const [connectionPassword, setConnectionPassword] = useState<string | undefined>()
	const [publicKey, setPublicKey] = useState<string>()
	const [signature, setSignature] = useState<string>()

	useEffect(() => {
		if (!connectorOptions) return () => {}

		setPublicKey(connectorOptions.publicKey)

		const connectorClient = ConnectorClient({
			source: 'extension',
			target: 'wallet',
			isInitiator: config.webRTC.isInitiator,
			logger: logger.getSubLogger({ name: 'pairing' }),
			negotiationTimeout: 10_000,
		})

		connectorClient.setConnectionConfig(radixConnectConfig[connectorOptions.radixConnectConfiguration])

		connectorClient.generateConnectionPassword().andThen(buffer => connectorClient.setConnectionPassword(buffer))

		const subscription = new Subscription()

		const linkClientInteraction$ = connectorClient.onMessage$.pipe(
			filter((message): message is LinkClientInteraction => message.discriminator === 'linkClient'),
		)

		const hexConnectionPassword$ = connectorClient.connectionPassword$.pipe(
			filter(Boolean),
			tap(passwordBuffer => {
				const message = getLinkingSignatureMessage(passwordBuffer)
				setSignature(Buffer.from(ed25519.sign(message, connectorOptions.privateKey)).toString('hex'))
			}),
			map(buffer => buffer.toString('hex')),
		)

		subscription.add(
			hexConnectionPassword$.subscribe(password => {
				setConnectionPassword(password)
			}),
		)

		subscription.add(
			connectorClient.connected$
				.pipe(
					filter(Boolean),
					switchMap(() => combineLatest([hexConnectionPassword$, linkClientInteraction$])),
				)
				.subscribe(([password, interaction]) => {
					connectionsClient.addOrUpdate(password, interaction).map(({ isKnownConnection }) => {
						chromeLocalStore.removeItem('connectionPassword')
						connectorClient.disconnect()

						onPair(interaction.publicKey, isKnownConnection)

						return isKnownConnection
					})
				}),
		)

		connectorClient.connect()

		return () => {
			connectorClient.destroy()
			subscription.unsubscribe()
		}
	}, [setConnectionPassword, connectorOptions, connectionsClient])

	return (
		<Box className={styles.pairingWrapper}>
			<Button onClick={() => navigate(-1)} styleVariant="ghost" sizeVariant="small" iconOnly>
				<ArrowLeftIcon />
			</Button>
			<Title title={intl.formatMessage(messages.help_title)} subTitle={intl.formatMessage(messages.help_sub_title)} />
			<Box className={styles.pairingQrWrapper}>
				<QrStyled
					value={JSON.stringify({
						password: connectionPassword,
						publicKey,
						signature,
						purpose: 'general',
					})}
					size={200}
				/>
			</Box>
			<Box className={styles.pairingLinkWrapper}>
				<Link href="https://wallet.radixdlt.com/" size="small" target="_blank">
					{intl.formatMessage(messages.link)}
				</Link>
			</Box>
		</Box>
	)
}
