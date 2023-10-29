import React, { useMemo, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import type { ZodError } from 'zod'
import { z } from 'zod'

import { Box } from 'ui/src/components/box'
import { Form } from 'ui/src/components/form'
import TextField from 'ui/src/components/form/fields/text-field'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore, useSharedStore } from 'ui/src/hooks/use-store'
import type { Keystore } from 'ui/src/store/types'
import { KeystoreType } from 'ui/src/store/types'

import { useAddAccount } from '@src/hooks/use-add-account'
import { useMessageClient } from '@src/hooks/use-message-client'
import type { Data } from '@src/types/vault'

const messages = defineMessages({
	name_placeholder: {
		id: 'HAlOn1',
		defaultMessage: 'Name',
	},
	password_placeholder: {
		id: '5sg7KC',
		defaultMessage: 'Password',
	},
	confirm_password_placeholder: {
		id: 'w/ArXE',
		defaultMessage: 'Confirm your password',
	},
	form_button_title: {
		id: 'VzzYJk',
		defaultMessage: 'Create',
	},
	validation_name: {
		id: 'XK/xhU',
		defaultMessage: 'Please insert name',
	},
	validation_password: {
		id: '+N/BAb',
		defaultMessage: 'Insert password (at least 8 characters)',
	},
	validation_confirm_password: {
		id: 'yy3BXQ',
		defaultMessage: 'Password does not match',
	},
})

const initialValues = {
	name: '',
	password: '',
	confirmPassword: '',
}

interface IProps {
	keystoreType: KeystoreType
	onSubmit: () => Data
	onNext?: () => void
}

export const KeystoreForm: React.FC<IProps> = ({ keystoreType, onSubmit, onNext }) => {
	const intl = useIntl()
	const client = useMessageClient()
	const networkId = useNetworkId()
	const { keystoreId, addKeystore } = useSharedStore(state => ({
		keystoreId: state.selectedKeystoreId,
		addKeystore: state.addKeystoreAction,
	}))
	const addAccount = useAddAccount()
	const { accountIndexes } = useNoneSharedStore(state => ({
		accountIndexes: state.accountIndexes[networkId] || {},
	}))

	const [validation, setValidation] = useState<ZodError>()

	const validationSchema = useMemo(
		() =>
			z
				.object({
					name: z.string().min(1, intl.formatMessage(messages.validation_name)),
					password: z.string().min(8, intl.formatMessage(messages.validation_password)),
					confirmPassword: z.string(),
				})
				.superRefine(({ confirmPassword, password }, ctx) => {
					if (confirmPassword !== password) {
						ctx.addIssue({
							code: 'custom',
							path: ['confirmPassword'],
							message: intl.formatMessage(messages.validation_confirm_password),
						})
					}
				}),
		[],
	)

	const handleSubmit = async (values: typeof initialValues) => {
		const result = validationSchema.safeParse(values)
		if (result.success === false) {
			setValidation(result.error)
			return
		}

		setValidation(undefined)

		const keystore: Keystore = {
			id: keystoreId,
			name: values.name,
			type: keystoreType,
		}
		const data = onSubmit()

		addKeystore(keystore.id, keystore.name, keystore.type)
		await client.storeInVault(keystore, data, values.password)
		await client.unlockVault(values.password)
		if (keystoreType !== KeystoreType.RADIX_WALLET && Object.keys(accountIndexes).length === 0) addAccount()

		if (onNext) onNext()
	}

	return (
		<Form
			onSubmit={handleSubmit}
			initialValues={initialValues}
			errors={validation?.format()}
			submitButtonTitle={intl.formatMessage(messages.form_button_title)}
			submitButtonTitleSizeVariant="xlarge"
		>
			<Box display="flex" flexDirection="column" gap="medium" paddingBottom="large">
				<TextField name="name" placeholder={intl.formatMessage(messages.name_placeholder)} sizeVariant="large" />
				<TextField
					isPassword
					name="password"
					placeholder={intl.formatMessage(messages.password_placeholder)}
					sizeVariant="large"
				/>
				<TextField
					isPassword
					name="confirmPassword"
					placeholder={intl.formatMessage(messages.confirm_password_placeholder)}
					sizeVariant="large"
				/>
			</Box>
		</Form>
	)
}

export default KeystoreForm
