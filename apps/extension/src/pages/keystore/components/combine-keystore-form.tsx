import React, { useMemo, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import type { ZodError } from 'zod'
import { z } from 'zod'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { Form } from 'ui/src/components/form'
import { SubmitButton } from 'ui/src/components/form/fields/submit-button'
import TextField from 'ui/src/components/form/fields/text-field'
import { SelectSimple } from 'ui/src/components/select'
import { useNoneSharedStore, useSharedStore } from 'ui/src/hooks/use-store'
import type { Account, Keystore, Persona } from 'ui/src/store/types'
import { KeystoreType } from 'ui/src/store/types'
import { generateId } from 'ui/src/utils/generate-id'

import { combineData, getSecret } from '@src/crypto/secret'
import { useMessageClient } from '@src/hooks/use-message-client'
import { type Data } from '@src/types/vault'

const messages = defineMessages({
	name_placeholder: {
		id: 'HAlOn1',
		defaultMessage: 'Name',
	},
	password_placeholder: {
		id: '5sg7KC',
		defaultMessage: 'Password',
	},
	form_button_title: {
		id: 'gpEcOb',
		defaultMessage: 'Add as key source to {name} wallet',
	},
	validation_name: {
		id: 'XK/xhU',
		defaultMessage: 'Please insert name',
	},
})

const initialValues = {
	name: '',
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

	const { keystore, keystores, addKeystore, selectKeystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
		keystores: state.keystores,
		addKeystore: state.addKeystoreAction,
		selectKeystore: state.selectKeystoreAction,
	}))
	const { accountIndexes, addAccountAction, personaIndexes, addPersonaAction } = useNoneSharedStore(state => ({
		accountIndexes: state.accountIndexes,
		addAccountAction: state.addAccountAction,
		personaIndexes: state.personaIndexes,
		addPersonaAction: state.addPersonaAction,
	}))

	const [validation, setValidation] = useState<ZodError>()

	const validationSchema = useMemo(
		() =>
			z.object({
				name: z.string().min(1, intl.formatMessage(messages.validation_name)),
			}),
		[],
	)

	const selectItems = useMemo(
		() =>
			keystores
				.filter(({ type }) => type === KeystoreType.LOCAL || type === KeystoreType.HARDWARE)
				.map(({ id, name }) => ({ id, title: name })),
		[keystores],
	)

	const handleSelect = (id: string) => {
		selectKeystore(id)
	}

	const handleSubmit = async (values: typeof initialValues) => {
		setValidation(undefined)
		const result = validationSchema.safeParse(values)
		if (result.success === false) {
			setValidation(result.error)
			return
		}

		setValidation(undefined)

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
					id: keystore.id,
					name: keystore.name,
					type: keystore.type,
					ledgerDevice: keystore.ledgerDevice,
				}
			} else {
				combinedKeystore.keySources[keystore.id] = {
					id: keystore.id,
					name: keystore.name,
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

		const keystoreId = generateId()
		if (keystoreType === KeystoreType.HARDWARE) {
			combinedKeystore.keySources[keystoreId] = {
				id: keystoreId,
				name: values.name,
				type: keystoreType,
				ledgerDevice: JSON.parse(getSecret(data)),
			}
		} else {
			combinedKeystore.keySources[keystoreId] = {
				id: keystoreId,
				name: values.name,
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
			<hr />
			<Form onSubmit={handleSubmit} initialValues={initialValues} errors={validation?.format()}>
				<Box display="flex" flexDirection="column" gap="medium" paddingBottom="large">
					<TextField name="name" placeholder={intl.formatMessage(messages.name_placeholder)} sizeVariant="large" />
					<SelectSimple
						fullWidth
						value={keystore?.id}
						onValueChange={handleSelect}
						data={selectItems}
						sizeVariant="xlarge"
					/>
					<TextField
						isPassword
						name="password"
						placeholder={intl.formatMessage(messages.password_placeholder)}
						sizeVariant="large"
					/>
					<SubmitButton>
						<Button sizeVariant="large">
							{intl.formatMessage(messages.form_button_title, { name: keystore.name })}
						</Button>
					</SubmitButton>
				</Box>
			</Form>
		</>
	)
}

export default CombineKeystoreForm
