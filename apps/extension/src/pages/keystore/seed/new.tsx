import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { Text } from 'ui/src/components/typography'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore, useSharedStore } from 'ui/src/hooks/use-store'
import { KeystoreType } from 'ui/src/store/types'

import { createMnemonic, secretToData } from '@src/crypto/secret'
import { useAddAccount } from '@src/hooks/use-add-account'
import { useIsUnlocked } from '@src/hooks/use-is-unlocked'
import type { Data } from '@src/types/vault'
import { DataType } from '@src/types/vault'

import KeystoreForm from '../components/keystore-form'

export const New: React.FC = () => {
	const navigate = useNavigate()
	const { isUnlocked, isLoading } = useIsUnlocked()
	const networkId = useNetworkId()
	const addAccount = useAddAccount()
	const { keystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))
	const { accountIndexes } = useNoneSharedStore(state => ({
		accountIndexes: state.accountIndexes[networkId] || {},
	}))

	const [mnemonic, setMnemonic] = useState<string>('')

	useEffect(() => {
		if (keystore?.type !== KeystoreType.LOCAL) navigate('/')
	}, [keystore])

	useEffect(() => {
		if (!isLoading && !isUnlocked) navigate('/')
	}, [isUnlocked, isLoading])

	useEffect(() => {
		if (!mnemonic) setMnemonic(createMnemonic())
	}, [])

	const handleSubmit = (): Data => {
		if (Object.keys(accountIndexes).length === 0) addAccount()
		return secretToData(DataType.MNEMONIC, mnemonic)
	}

	return (
		<Box padding="xxxlarge">
			<Text>{mnemonic}</Text>
			{mnemonic && <KeystoreForm keystoreType={KeystoreType.LOCAL} onSubmit={handleSubmit} />}
		</Box>
	)
}

export default New
