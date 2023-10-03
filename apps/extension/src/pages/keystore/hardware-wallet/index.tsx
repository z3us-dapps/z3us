import {
	type Message as RadixMessage,
	messageDiscriminator,
	messageSource as radixMessageSource,
} from '@radixdlt/connector-extension/src/chrome/messages/_types'
import { createMessage as createRadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import React, { useEffect, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import browser from 'webextension-polyfill'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { KeystoreType } from 'ui/src/store/types'

import { MessageClient } from '@src/browser/ledger/message-client'
import { getDeviceInfoPayload } from '@src/browser/ledger/messages'
import { secretToData } from '@src/crypto/secret'
import type { Data } from '@src/types/vault'
import { DataType } from '@src/types/vault'

import KeystoreForm from '../components/keystore-form'

const client = MessageClient()

const messages = defineMessages({
	connect: {
		id: 'keystore.hardware_wallet.connect',
		defaultMessage: 'Connect device',
	},
	info: {
		id: 'keystore.hardware_wallet.info',
		defaultMessage: 'Do not close this tab and continue with the device in another one, we will come back here later.',
	},
})

export const New: React.FC = () => {
	const intl = useIntl()

	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [device, setDevice] = useState<any>()

	useEffect(() => {
		browser.runtime.onMessage.addListener(client.onMessage)
		return () => {
			browser.runtime.onMessage.removeListener(client.onMessage)
		}
	}, [])

	const handleGetDeviceInfo = async () => {
		setIsLoading(true)
		try {
			const message: RadixMessage = await client.sendMessage(
				createRadixMessage.walletToLedger(radixMessageSource.offScreen, getDeviceInfoPayload()),
			)
			if (message?.discriminator === messageDiscriminator.ledgerResponse) {
				if (!message?.data) {
					return
				}
				const { success } = message.data
				if (success) {
					setDevice(success)
				}
			}
		} finally {
			setIsLoading(false)
		}
	}

	const handleSubmit = (): Data => secretToData(DataType.STRING, JSON.stringify(device))

	return (
		<Box padding="xxxlarge">
			<Button
				onClick={handleGetDeviceInfo}
				styleVariant="tertiary"
				sizeVariant="xlarge"
				fullWidth
				disabled={isLoading}
				loading={isLoading}
			>
				{intl.formatMessage(messages.connect)}
			</Button>
			{isLoading && intl.formatMessage(messages.info)}
			{device && <KeystoreForm keystoreType={KeystoreType.HARDWARE} onSubmit={handleSubmit} />}
		</Box>
	)
}

export default New
