import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { Input } from 'ui/src/components/input'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore, useSharedStore } from 'ui/src/hooks/use-store'
import { KeystoreType } from 'ui/src/store/types'

import { secretToData } from '@src/crypto/secret'
import { useAddAccount } from '@src/hooks/use-add-account'
import type { Data } from '@src/types/vault'
import { DataType } from '@src/types/vault'

import KeystoreForm from '../components/keystore-form'

export const New: React.FC = () => {
	const navigate = useNavigate()
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
		if (keystore?.type !== KeystoreType.LOCAL) {
			navigate('/')
		}
	}, [keystore])

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const evt = event.nativeEvent as InputEvent
		if (evt.isComposing) {
			return
		}

		setMnemonic(event.target.value)
	}

	const handleSubmit = (): Data => {
		if (Object.keys(accountIndexes).length === 0) addAccount()
		return secretToData(DataType.MNEMONIC, mnemonic)
	}

	return (
		<Box padding="xxxlarge">
			<Input value={mnemonic} elementType="textarea" type="textarea" onChange={handleChange} />
			{mnemonic && <KeystoreForm keystoreType={KeystoreType.LOCAL} onSubmit={handleSubmit} />}
		</Box>
	)
}

export default New
