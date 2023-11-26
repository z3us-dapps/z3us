import React from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { Form } from 'ui/src/components/form'
import { SubmitButton } from 'ui/src/components/form/fields/submit-button'
import TextField from 'ui/src/components/form/fields/text-field'
import { useNoneSharedStore, useSharedStore } from 'ui/src/hooks/use-store'
import type { Account, Keystore, Persona } from 'ui/src/store/types'
import { KeystoreType } from 'ui/src/store/types'
import { generateId } from 'ui/src/utils/generate-id'

import { combineData, getSecret } from '@src/crypto/secret'
import { useMessageClient } from '@src/hooks/use-message-client'
import { type Data } from '@src/types/vault'

const messages = defineMessages({
	password_placeholder: {
		id: '5sg7KC',
		defaultMessage: 'Password',
	},
	form_button_title: {
		id: 'gpEcOb',
		defaultMessage: 'Add key source',
	},
})

const initialValues = {
	password: '',
}

interface IProps {
	keystoreType: Exclude<KeystoreType, KeystoreType.COMBINED>
	onSubmit: () => Data
	onNext?: () => void
}

export const CombineKeystoreForm: React.FC<IProps> = ({ keystoreType, onSubmit, onNext }) => {
	const intl = useIntl()
	const client = useMessageClient()
	const { keystore, addKeystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
		addKeystore: state.addKeystoreAction,
	}))

	const { accountIndexes, addAccountAction, personaIndexes, addPersonaAction } = useNoneSharedStore(state => ({
		accountIndexes: state.accountIndexes,
		addAccountAction: state.addAccountAction,
		personaIndexes: state.personaIndexes,
		addPersonaAction: state.addPersonaAction,
	}))

	const handleSubmit = async (values: typeof initialValues) => {
		const combinedKeystore: Keystore = {
			id: keystore.id,
			name: keystore.name,
			type: KeystoreType.COMBINED,
			keySources: {},
		}

		const combinedData = []
		if (keystore.type !== KeystoreType.COMBINED) {
			if (keystore.type === KeystoreType.HARDWARE) {
				combinedKeystore.keySources[keystore.id] = {
					type: keystore.type,
					ledgerDevice: keystore.ledgerDevice,
				}
			} else {
				combinedKeystore.keySources[keystore.id] = {
					type: keystore.type,
				}
			}
			const currentData = await client.getData(values.password)
			combinedData.push(currentData)

			Object.keys(accountIndexes).forEach(networkId => {
				Object.keys(accountIndexes[networkId] || {}).forEach(address => {
					const account: Account = accountIndexes[networkId][address]
					account.combinedKeystoreId = keystore.id
					addAccountAction(+networkId, address, account)
				})
			})
			Object.keys(personaIndexes).forEach(networkId => {
				Object.keys(personaIndexes[networkId] || {}).forEach(address => {
					const persona: Persona = personaIndexes[networkId][address]
					persona.combinedKeystoreId = keystore.id
					addPersonaAction(+networkId, address, persona)
				})
			})
		}

		const data = onSubmit()
		combinedData.push(data)

		if (keystoreType === KeystoreType.HARDWARE) {
			combinedKeystore.keySources[generateId()] = {
				type: keystoreType,
				ledgerDevice: JSON.parse(getSecret(data)),
			}
		} else {
			combinedKeystore.keySources[generateId()] = {
				type: keystoreType,
			}
		}

		addKeystore(combinedKeystore)

		await client.storeInVault(combinedKeystore, combineData(...combinedData), values.password)
		await client.unlockVault(values.password)

		if (onNext) onNext()
	}

	if (!keystore || keystore.type === KeystoreType.RADIX_WALLET) return null

	return (
		<>
			<Form onSubmit={handleSubmit} initialValues={initialValues}>
				<Box display="flex" flexDirection="column" gap="medium" paddingBottom="large">
					<TextField
						isPassword
						name="password"
						placeholder={intl.formatMessage(messages.password_placeholder)}
						sizeVariant="large"
					/>
					<SubmitButton>
						<Button sizeVariant="large">{intl.formatMessage(messages.form_button_title)}</Button>
					</SubmitButton>
				</Box>
			</Form>
			<hr />
		</>
	)
}

export default CombineKeystoreForm
