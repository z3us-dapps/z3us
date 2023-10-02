import React, { useState } from 'react'

import { Box } from 'ui/src/components/box'
import { Input } from 'ui/src/components/input'
import { KeystoreType } from 'ui/src/store/types'

import { secretToData } from '@src/crypto/secret'
import type { Data } from '@src/types/vault'
import { DataType } from '@src/types/vault'

import KeystoreForm from '../components/keystore-form'

export const New: React.FC = () => {
	const [key, setKey] = useState<string>('')

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const evt = event.nativeEvent as InputEvent
		if (evt.isComposing) {
			return
		}

		setKey(event.target.value)
	}

	const handleSubmit = (): Data => secretToData(DataType.PRIVATE_KEY, key)

	return (
		<Box padding="xxxlarge">
			<Input value={key} elementType="textarea" type="textarea" onChange={handleChange} />
			{key && <KeystoreForm keystoreType={KeystoreType.LOCAL} onSubmit={handleSubmit} />}
		</Box>
	)
}

export default New
