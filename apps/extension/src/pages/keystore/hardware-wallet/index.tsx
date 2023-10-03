import {
	type Message as RadixMessage,
	messageDiscriminator,
} from '@radixdlt/connector-extension/src/chrome/messages/_types'
import React, { useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { KeystoreType } from 'ui/src/store/types'

import { secretToData } from '@src/crypto/secret'
import { useLedgerClient } from '@src/hooks/use-ledger-client'
import type { Data } from '@src/types/vault'
import { DataType } from '@src/types/vault'

import KeystoreForm from '../components/keystore-form'

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
	const client = useLedgerClient()

	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [device, setDevice] = useState<any>()

	const handleGetDeviceInfo = async () => {
		setIsLoading(true)
		try {
			const message: RadixMessage = await client.getDeviceInfo()
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
