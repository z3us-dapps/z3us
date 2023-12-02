import React, { useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { Switch } from 'ui/src/components/switch'
import { Text } from 'ui/src/components/typography'
import { useNoneSharedStore, useSharedStore } from 'ui/src/hooks/use-store'
import { KeystoreType } from 'ui/src/store/types'

import type { Data } from '@src/types/vault'

import CombineKeystoreForm from './combine-keystore-form'
import NewKeystoreForm from './new-keystore-form'

const messages = defineMessages({
	switch_title: {
		defaultMessage: 'Add to existing wallet',
		id: 'dJBcj5',
	},
})

interface IProps {
	keystoreType: Exclude<KeystoreType, KeystoreType.COMBINED>
	onSubmit: () => Data
	onNext?: () => void
}

export const KeystoreForm: React.FC<IProps> = ({ keystoreType, onSubmit, onNext }) => {
	const intl = useIntl()
	const [isCombineFormVisible, setIsCombineFormVisible] = useState<boolean>(false)

	const { keystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))

	const handleToggleCombine = (isChecked: boolean) => {
		setIsCombineFormVisible(isChecked)
	}

	return (
		<Box display="flex" flexDirection="column" gap="medium">
			{keystore && keystore.type !== KeystoreType.RADIX_WALLET && (
				<Box display="flex" alignItems="center" gap="small">
					<Switch sizeVariant="medium" defaultChecked={false} onCheckedChange={handleToggleCombine} />
					<Text size="xsmall">{intl.formatMessage(messages.switch_title)}</Text>
				</Box>
			)}
			{isCombineFormVisible ? (
				<CombineKeystoreForm onSubmit={onSubmit} keystoreType={keystoreType} onNext={onNext} />
			) : (
				<NewKeystoreForm onSubmit={onSubmit} keystoreType={keystoreType} onNext={onNext} />
			)}
		</Box>
	)
}

export default KeystoreForm
