import React from 'react'

import { Box } from 'ui/src/components/box'
import type { KeystoreType } from 'ui/src/store/types'

import type { Data } from '@src/types/vault'

import CombineKeystoreForm from './combine-keystore-form'
import NewKeystoreForm from './new-keystore-form'

interface IProps {
	keystoreType: Exclude<KeystoreType, KeystoreType.COMBINED>
	onSubmit: () => Data
	onNext?: () => void
}

export const KeystoreForm: React.FC<IProps> = ({ keystoreType, onSubmit, onNext }) => (
	<Box display="flex" flexDirection="column" gap="medium" paddingBottom="large">
		<CombineKeystoreForm onSubmit={onSubmit} keystoreType={keystoreType} onNext={onNext} />
		<NewKeystoreForm onSubmit={onSubmit} keystoreType={keystoreType} onNext={onNext} />
	</Box>
)

export default KeystoreForm
