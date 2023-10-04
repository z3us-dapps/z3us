import React, { useEffect, useState } from 'react'

import { Box } from 'ui/src/components/box'
import { Text } from 'ui/src/components/typography'
import { KeystoreType } from 'ui/src/store/types'

import { createMnemonic, secretToData } from '@src/crypto/secret'
import type { Data } from '@src/types/vault'
import { DataType } from '@src/types/vault'

import KeystoreForm from '../components/keystore-form'

export const New: React.FC = () => {
	const [mnemonic, setMnemonic] = useState<string>('')

	useEffect(() => {
		if (!mnemonic) setMnemonic(createMnemonic())
	}, [])

	const handleSubmit = (): Data => secretToData(DataType.MNEMONIC, mnemonic)

	return (
		<Box padding="xxxlarge">
			<Text>{mnemonic}</Text>
			{mnemonic && <KeystoreForm keystoreType={KeystoreType.LOCAL} onSubmit={handleSubmit} />}
		</Box>
	)
}

export default New
