import type { LedgerDevice } from '@radixdlt/connector-extension/src/ledger/schemas'
import React, { useEffect, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore, useSharedStore } from 'ui/src/hooks/use-store'
import { KeystoreType } from 'ui/src/store/types'

import { secretToData } from '@src/crypto/secret'
import { useAddAccount } from '@src/hooks/use-add-account'
import { useIsUnlocked } from '@src/hooks/use-is-unlocked'
import { useLedgerClient } from '@src/hooks/use-ledger-client'
import type { Data } from '@src/types/vault'
import { DataType } from '@src/types/vault'

import KeystoreForm from '../components/keystore-form'

const messages = defineMessages({
	connect: {
		id: 'cotGK8',
		defaultMessage: 'Connect device',
	},
	info: {
		id: 'AsESAY',
		defaultMessage: 'Do not close this tab and continue with the device in another one, we will come back here later.',
	},
})

export const New: React.FC = () => {
	const intl = useIntl()
	const navigate = useNavigate()
	const client = useLedgerClient()
	const networkId = useNetworkId()
	const addAccount = useAddAccount()
	const { isUnlocked, isLoading: isLoadingUnlocked } = useIsUnlocked()
	const { keystore, changeKeystoreLedgerDevice } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
		changeKeystoreLedgerDevice: state.changeKeystoreLedgerDeviceAction,
	}))
	const { accountIndexes } = useNoneSharedStore(state => ({
		accountIndexes: state.accountIndexes[networkId] || {},
	}))

	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [device, setDevice] = useState<LedgerDevice>()

	useEffect(() => {
		if (keystore?.type !== KeystoreType.HARDWARE) {
			navigate('/')
		}
	}, [keystore])

	useEffect(() => {
		if (!isLoadingUnlocked && !isUnlocked) navigate('/')
	}, [isUnlocked, isLoadingUnlocked])

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
		if (Object.keys(accountIndexes).length === 0) addAccount()
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
