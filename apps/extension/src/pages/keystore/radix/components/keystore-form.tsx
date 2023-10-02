import React from 'react'

import { KeystoreType } from 'ui/src/store/types'

import type { Data } from '@src/types/vault'
import { DataType } from '@src/types/vault'

import KeystoreForm from '../../components/keystore-form'

interface IProps {
	connectionPassword: string
}

export const RadixKeystoreForm: React.FC<IProps> = ({ connectionPassword }) => {
	const handleSubmit = (): Data => ({
		type: DataType.STRING,
		secret: connectionPassword,
	})

	if (!connectionPassword) return null

	return <KeystoreForm keystoreType={KeystoreType.RADIX_WALLET} onSubmit={handleSubmit} />
}

export default RadixKeystoreForm
