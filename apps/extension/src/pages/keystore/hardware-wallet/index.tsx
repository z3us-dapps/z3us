import React from 'react'

import { Box } from 'ui/src/components/box'
import { KeystoreType } from 'ui/src/store/types'

import { secretToData } from '@src/crypto/secret'
import type { Data } from '@src/types/vault'
import { DataType } from '@src/types/vault'

import KeystoreForm from '../components/keystore-form'

export const New: React.FC = () => {
	const handleSubmit = (): Data => secretToData(DataType.NONE)

	return (
		<Box padding="xxxlarge">
			<KeystoreForm keystoreType={KeystoreType.HARDWARE} onSubmit={handleSubmit} />
		</Box>
	)
}

export default New
