import React, { useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { Input } from 'ui/src/components/input'
import { SelectSimple } from 'ui/src/components/select'
import { KeystoreType } from 'ui/src/store/types'

import { secretToData } from '@src/crypto/secret'
import type { Data } from '@src/types/vault'
import { DataType } from '@src/types/vault'

import KeystoreForm from '../components/keystore-form'

const messages = defineMessages({
	ed25519: {
		id: 'keystore.seed.restore.ed25519',
		defaultMessage: 'New (Babylon wallet)',
	},
	secp256k1: {
		id: 'keystore.seed.restore.secp256k1',
		defaultMessage: 'Legacy (Olympia wallet)',
	},
})

export const New: React.FC = () => {
	const intl = useIntl()
	const [dataType, setDataTye] = useState<DataType>(DataType.EDDSA_ED25519)
	const [mnemonic, setMnemonic] = useState<string>('')

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const evt = event.nativeEvent as InputEvent
		if (evt.isComposing) {
			return
		}

		setMnemonic(event.target.value)
	}

	const handleDataTypeChange = (id: string) => {
		setDataTye(id as DataType)
	}

	const handleSubmit = (): Data => secretToData(dataType, mnemonic)

	return (
		<Box padding="xxxlarge">
			<SelectSimple
				value={dataType}
				onValueChange={handleDataTypeChange}
				data={[
					{ id: DataType.EDDSA_ED25519, title: intl.formatMessage(messages.ed25519) },
					{ id: DataType.ECDSA_SECP_256K1, title: intl.formatMessage(messages.secp256k1) },
				]}
			/>
			<Input value={mnemonic} elementType="textarea" type="textarea" onChange={handleChange} />
			{mnemonic && <KeystoreForm keystoreType={KeystoreType.LOCAL} onSubmit={handleSubmit} />}
		</Box>
	)
}

export default New
