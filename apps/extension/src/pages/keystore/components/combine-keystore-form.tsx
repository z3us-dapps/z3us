import React, { useEffect, useMemo, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import type { ZodError } from 'zod'
import { z } from 'zod'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { Form } from 'ui/src/components/form'
import PasswordField from 'ui/src/components/form/fields/password-field'
import SelectField from 'ui/src/components/form/fields/select-field'
import { SubmitButton } from 'ui/src/components/form/fields/submit-button'
import TextField from 'ui/src/components/form/fields/text-field'
import { useNoneSharedStore, useSharedStore } from 'ui/src/hooks/use-store'
import type { Keystore } from 'ui/src/store/types'
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
	key_source_placeholder: {
		defaultMessage: 'Key source',
		id: 'RlCZeE',
	},
	password_placeholder: {
		id: '5sg7KC',
		defaultMessage: 'Password',
	},
	form_button_title: {
		id: 'yWBWL6',
		defaultMessage: 'Add as key source',
	},
	validation_name: {
		id: 'XK/xhU',
		defaultMessage: 'Please insert name',
	},
	validation_key_source: {
		id: 'KmI7iF',
		defaultMessage: 'Please select wallet',
	},
})

const init = {
	name: '',
	keySourceId: '',
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

	const { keystore, keystores, addKeystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
		keystores: state.keystores,
		addKeystore: state.addKeystoreAction,
	}))
	const { accountIndexes, addAccountAction, personaIndexes, addPersonaAction } = useNoneSharedStore(state => ({
		accountIndexes: state.accountIndexes,
		addAccountAction: state.addAccountAction,
		personaIndexes: state.personaIndexes,
		addPersonaAction: state.addPersonaAction,
	}))

	const [initialValues, restFormValues] = useState<typeof init>({ name: '', keySourceId: keystore?.id, password: '' })
	const [validation, setValidation] = useState<ZodError>()

	useEffect(() => {
		if (!keystore || initialValues.keySourceId) return
		restFormValues({ name: '', keySourceId: keystore?.id, password: '' })
	}, [keystore])

	const selectItems = useMemo(
		() =>
			keystores.filter(({ type }) => type !== KeystoreType.RADIX_WALLET).map(({ id, name }) => ({ id, title: name })),
		[keystores],
	)

	const validationSchema = useMemo(() => {
		const keystoreIds = keystores.map(key => key.id)
		return z.object({
			name: z.string().min(1, intl.formatMessage(messages.validation_name)),
			keySourceId: z.custom<string>((val: string) => keystoreIds.includes(val)),
		})
	}, [keystores])

	const handleSubmit = async (values: typeof initialValues) => {
		setValidation(undefined)
		const result = validationSchema.safeParse(values)
		if (result.success === false) {
			setValidation(result.error)
			return
		}

		setValidation(undefined)

		const destination = keystores.find(({ id }) => id === values.keySourceId)

		await client.unlockVault(destination, values.password)

		const combinedKeystore: Keystore = {
			id: destination.id,
			name: destination.name,
			type: KeystoreType.COMBINED,
			keySources: {},
		}

		const currentData = await client.getData(destination, values.password)

		let combinedData = {}
		if (destination.type === KeystoreType.COMBINED) {
			combinedData = JSON.parse(currentData.secret)
			combinedKeystore.keySources = { ...destination.keySources }
		} else {
			combinedData[destination.id] = currentData
			combinedKeystore.keySources[destination.id] = destination

			Object.keys(accountIndexes).forEach(networkId => {
				Object.keys(accountIndexes[networkId] || {}).forEach(address => {
					addAccountAction(+networkId, address, {
						...accountIndexes[networkId][address],
						combinedKeystoreId: destination.id,
					})
				})
			})
			Object.keys(personaIndexes).forEach(networkId => {
				Object.keys(personaIndexes[networkId] || {}).forEach(address => {
					addPersonaAction(+networkId, address, {
						...personaIndexes[networkId][address],
						combinedKeystoreId: destination.id,
					})
				})
			})
		}

		const data = onSubmit()
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

		combinedData[keystoreId] = data

		addKeystore(combinedKeystore)

		await client.storeInVault(combinedKeystore, combineData(combinedData), values.password)
		await client.unlockVault(keystore, values.password)

		if (onNext) onNext()
		restFormValues(init)
	}

	if (!keystore || keystore.type === KeystoreType.RADIX_WALLET) return null

	return (
		<Form onSubmit={handleSubmit} initialValues={initialValues} errors={validation?.format()}>
			<Box display="flex" flexDirection="column" gap="medium">
				<SelectField
					name="keySourceId"
					fullWidth
					sizeVariant="xlarge"
					styleVariant="tertiary"
					placeholder={intl.formatMessage(messages.key_source_placeholder)}
					data={selectItems}
				/>
				<TextField name="name" placeholder={intl.formatMessage(messages.name_placeholder)} sizeVariant="large" />
				<PasswordField
					name="password"
					placeholder={intl.formatMessage(messages.password_placeholder)}
					sizeVariant="large"
				/>
				<SubmitButton>
					<Button sizeVariant="large">{intl.formatMessage(messages.form_button_title)}</Button>
				</SubmitButton>
			</Box>
		</Form>
	)
}

export default CombineKeystoreForm
