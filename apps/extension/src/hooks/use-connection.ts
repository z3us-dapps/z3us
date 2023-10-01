import { ConnectorClient } from '@radixdlt/connector-extension/src/connector/connector-client'
import { logger } from '@radixdlt/connector-extension/src/utils/logger'
import { useEffect, useState } from 'react'

import { config } from '@src/config'

export const useInitiatorConnection = (address: string) => {
	const [connector, setConnector] = useState<ReturnType<typeof ConnectorClient>>()
	const [connectorStatus, setConnectorStatus] = useState<boolean>(false)
	const [responseMessage, setResponseMessage] = useState<string>('')
	const [error, setError] = useState<string>('')

	useEffect(() => {
		const connectorClient = ConnectorClient({
			source: 'wallet',
			target: 'extension',
			signalingServerBaseUrl: config.signalingServer.baseUrl,
			isInitiator: false,
			logger,
		})
		connectorClient.setConnectionPassword(Buffer.from(address, 'hex'))

		const connectedSubscription = connectorClient.connected$.subscribe(setConnectorStatus)
		const messageSubscription = connectorClient.onMessage$.subscribe(msg =>
			setResponseMessage(JSON.stringify(msg, null, 2)),
		)

		setConnector(connectorClient)

		return () => {
			connectorClient.destroy()
			connectedSubscription.unsubscribe()
			messageSubscription.unsubscribe()
		}
	}, [])

	const sendMessage = (message: string) => {
		try {
			connector?.sendMessage(JSON.parse(message || '{}'), {
				timeout: config.webRTC.confirmationTimeout,
			})
		} catch (e) {
			setError(String(e))
		}
	}

	const toggleConnection = () => (connectorStatus ? connector?.disconnect() : connector?.connect())

	return {
		connectorStatus,
		responseMessage,
		error,
		toggleConnection,
		sendMessage,
	}
}

export const useTargetConnection = (address: string) => {
	const [connector, setConnector] = useState<ReturnType<typeof ConnectorClient>>()
	const [connectorStatus, setConnectorStatus] = useState<boolean>(false)
	const [responseMessage, setResponseMessage] = useState<string>('')
	const [error, setError] = useState<string>('')

	useEffect(() => {
		const connectorClient = ConnectorClient({
			source: 'extension',
			target: 'wallet',
			signalingServerBaseUrl: config.signalingServer.baseUrl,
			isInitiator: false,
			logger,
		})
		connectorClient.setConnectionPassword(Buffer.from(address, 'hex'))

		const connectedSubscription = connectorClient.connected$.subscribe(setConnectorStatus)
		const messageSubscription = connectorClient.onMessage$.subscribe(msg =>
			setResponseMessage(JSON.stringify(msg, null, 2)),
		)

		connectorClient.connect()

		setConnector(connectorClient)

		return () => {
			connectorClient.disconnect()
			connectorClient.destroy()
			connectedSubscription.unsubscribe()
			messageSubscription.unsubscribe()
		}
	}, [])

	const sendMessage = (message: string) => {
		try {
			connector?.sendMessage(JSON.parse(message || '{}'), {
				timeout: config.webRTC.confirmationTimeout,
			})
		} catch (e) {
			setError(String(e))
		}
	}

	const toggleConnection = () => (connectorStatus ? connector?.disconnect() : connector?.connect())

	return {
		connectorStatus,
		responseMessage,
		error,
		toggleConnection,
		sendMessage,
	}
}
