import type { LedgerDevice } from '@radixdlt/connector-extension/src/ledger/schemas'
import React, { useEffect, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { useSharedStore } from 'ui/src/hooks/use-store'
import { KeystoreType } from 'ui/src/store/types'

import { secretToData } from '@src/crypto/secret'
import { useLedgerClient } from '@src/hooks/use-ledger-client'
import type { Data } from '@src/types/vault'
import { DataType } from '@src/types/vault'

import KeystoreForm from '../components/keystore-form'

const messages = defineMessages({
	connect: {
		defaultMessage: 'Connect device',
	},
	info: {
		defaultMessage: 'Do not close this tab and continue with the device in another one, we will come back here later.',
	},
})

export const New: React.FC = () => {
	const intl = useIntl()
	const navigate = useNavigate()
	const client = useLedgerClient()

	const { keystore, changeKeystoreLedgerDevice } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
		changeKeystoreLedgerDevice: state.changeKeystoreLedgerDeviceAction,
	}))

	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [device, setDevice] = useState<LedgerDevice>()

	useEffect(() => {
		if (keystore?.type !== KeystoreType.HARDWARE) {
			navigate('/')
		}
	}, [keystore])

	const handleGetDeviceInfo = async () => {
		setIsLoading(true)
		try {
			setDevice(await client.getDeviceInfo())
		} finally {
			setIsLoading(false)
		}
	}

	const handleSubmit = (): Data => {
		changeKeystoreLedgerDevice(keystore.id, device)
		return secretToData(DataType.STRING, JSON.stringify(device))
	}

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
